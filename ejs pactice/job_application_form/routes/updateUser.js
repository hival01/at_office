const express = require("express");
const router = express.Router();
const db = require("../config/database");

/** Single value or array → array */
function ensureArray(v) {
  if (v === undefined || v === null) return [];
  return Array.isArray(v) ? v : [v];
}

/** Express body: languages[1][lang_name] → object; htmlform may send array */
function normalizeIndexedRows(obj) {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  return Object.keys(obj)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => obj[k]);
}

async function getOrCreateLanguageId(languageName) {
  const name = String(languageName).toLowerCase().trim();
  const [existing] = await db.execute(
    "SELECT language_id FROM languages WHERE language_name = ?",
    [name]
  );
  if (existing.length) return existing[0].language_id;
  const [ins] = await db.execute(
    "INSERT INTO languages (language_name) VALUES (?)",
    [name]
  );
  return ins.insertId;
}

async function getOrCreateTechId(techName) {
  const name = String(techName).toLowerCase().trim();
  const [existing] = await db.execute(
    "SELECT tech_id FROM technologies WHERE tech_name = ?",
    [name]
  );
  if (existing.length) return existing[0].tech_id;
  const [ins] = await db.execute(
    "INSERT INTO technologies (tech_name) VALUES (?)",
    [name]
  );
  return ins.insertId;
}

/** Compare DB row to submitted body; skip UPDATE when nothing changed */
function basicDetailsUnchanged(cur, b) {
  const s = (v) =>
    v === undefined || v === null ? "" : String(v).trim();

  const d = (v) => {
    if (v === undefined || v === null) return "";
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    return String(v).slice(0, 10);
  };
  
  return (
    s(cur.first_name) === s(b.first_name) &&
    s(cur.last_name) === s(b.last_name) &&
    s(cur.Designation) === s(b.designation) &&
    s(cur.email) === s(b.email) &&
    s(cur.phone_no) === s(b.ph_no) &&
    cur.gender === b.gender &&
    cur.relationship_status === b.maritalstatus &&
    s(cur.address1) === s(b.address1) &&
    s(cur.address2) === s(b.address2) &&
    s(cur.city) === s(b.city) &&
    s(cur.state) === s(b.state) &&
    s(cur.zipcode) === s(b.zip) &&
    d(cur.dob) === d(b.dob)
  );
}

const CHILD_TABLES = {
  education: { table: "education", idCol: "education_id" },
  work_experience: { table: "work_experience", idCol: "work_exp_id" },
  applicant_language: {
    table: "applicant_language",
    idCol: "applicant_language_id",
  },
  applicant_technologies: {
    table: "applicant_technologies",
    idCol: "applicant_tech",
  },
};

async function deleteChildRowsNotInList(key, applicant_id, keptIds) {
  const { table, idCol } = CHILD_TABLES[key];
  if (keptIds.length) {
    const ph = keptIds.map(() => "?").join(",");
    await db.execute(
      `DELETE FROM \`${table}\` WHERE applicant_id = ? AND \`${idCol}\` NOT IN (${ph})`,
      [applicant_id, ...keptIds]
    );
  } else {
    await db.execute(
      `DELETE FROM \`${table}\` WHERE applicant_id = ?`,
      [applicant_id]
    );
  }
}

router.get("/:id", async (req, res) => {
  const applicant_id = req.params.id;
  const updated = req.query.updated === "1";

  try {
    const [basic_details] = await db.execute(
      "select * from basic_details where applicant_id=(?)",
      [applicant_id]
    );
    if (!basic_details.length) {
      return res
        .status(404)
        .send(
          `Applicant not found (id: ${applicant_id}). Submit the form at /user/ first or use a valid id.`
        );
    }

    const [education] = await db.execute(
      `select * from education where applicant_id=?`,
      [applicant_id]
    );
    const [work_exp] = await db.execute(
      `select * from work_experience where applicant_id=?`,
      [applicant_id]
    );
    const [languages] = await db.execute(
      `select * from applicant_language where applicant_id=?`,
      [applicant_id]
    );
    const [langs] = await db.execute(`select * from languages`);
    const [technologies] = await db.execute(
      `select * from applicant_technologies where applicant_id=?`,
      [applicant_id]
    );
    const [techs] = await db.execute(`select * from technologies`);
    const [preferences] = await db.execute(
      `select * from preferences where applicant_id=?`,
      [applicant_id]
    );
    const [prefered_location] = await db.execute(
      `select a.location_name from locations a join preferences b on a.location_id = b.location_id where b.applicant_id=?`,
      [applicant_id]
    );
    const [prefered_department] = await db.execute(
      `select a.department_name from departments a join preferences b on a.department_id=b.department_id where b.applicant_id=?`,
      [applicant_id]
    );

    const langMap = langs.reduce((accumulator, currentValue) => {
      accumulator[currentValue.language_id] = currentValue.language_name;
      return accumulator;
    }, {});

    const techMap = techs.reduce((acc, current) => {
      acc[current.tech_id] = current.tech_name;
      return acc;
    }, {});

    const data = {
      applicant_id,
      basic_details,
      education,
      work_exp,
      languages,
      langMap,
      technologies,
      techMap,
      preferences,
      prefered_location,
      prefered_department,
    };

    return res.render("updateForm", { data, updated });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      return res.status(500).send(
        "Database login failed. Set user, password, host, and database in .env."
      );
    }
    return res.status(500).send("Server error while loading applicant.");
  }
});

/** Delete entire applicant (child rows without ON DELETE CASCADE first, then basic_details).
 *  Path is /delete/:id (not /:id/delete) so Express 5 matches reliably. */
router.post("/delete/:id", async (req, res) => {
  const applicant_id = req.params.id;

  try {
    const [rows] = await db.execute(
      "SELECT applicant_id FROM basic_details WHERE applicant_id = ?",
      [applicant_id]
    );
    if (!rows.length) {
      return res.status(404).send("Applicant not found.");
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute(
        "DELETE FROM applicant_language WHERE applicant_id = ?",
        [applicant_id]
      );
      await conn.execute(
        "DELETE FROM applicant_technologies WHERE applicant_id = ?",
        [applicant_id]
      );
      await conn.execute(
        "DELETE FROM basic_details WHERE applicant_id = ?",
        [applicant_id]
      );
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }

    return res.redirect("/user");
  } catch (err) {
    console.error(err);
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      return res.status(500).send("Database login failed. Check .env.");
    }
    return res.status(500).send("Could not delete applicant.");
  }
});

router.post("/:id", async (req, res) => {
  const applicant_id = req.params.id;

  try {
    const [exists] = await db.execute(
      "SELECT * FROM basic_details WHERE applicant_id = ?",
      [applicant_id]
    );
    if (!exists.length) {
      return res.status(404).send("Applicant not found.");
    }

    const {
      first_name,
      last_name,
      designation,
      email,
      ph_no,
      gender,
      maritalstatus,
      address1,
      address2,
      city,
      state,
      zip,
      dob,
      course,
      passingyear,
      uni,
      result,
      education_id,
      comp_name,
      from_date,
      to_date,
      package,
      reason_to_leave,
      contact_no,
      name,
      relation,
      work_exp_id,
      languages,
      tech_names,
      preferred_location,
      notice_period,
      expected_ctc,
      current_ctc,
      department,
    } = req.body;

    if (!basicDetailsUnchanged(exists[0], req.body)) {
      await db.execute(
        `UPDATE basic_details SET
        first_name = ?, last_name = ?, Designation = ?, email = ?, phone_no = ?,
        gender = ?, relationship_status = ?, address1 = ?, address2 = ?,
        city = ?, state = ?, zipcode = ?, dob = ?
      WHERE applicant_id = ?`,
        [
          first_name,
          last_name,
          designation,
          email,
          ph_no,
          gender,
          maritalstatus,
          address1,
          address2,
          city,
          state,
          zip,
          dob,
          applicant_id,
        ]
      );
    }

    const educationIds = ensureArray(education_id);
    const courses = ensureArray(course);
    const passingyears = ensureArray(passingyear);
    const unis = ensureArray(uni);
    const results = ensureArray(result);

    const keptEduIds = [];
    for (let i = 0; i < educationIds.length; i++) {
      const id = educationIds[i];
      if (
        id !== undefined &&
        id !== null &&
        String(id).trim() !== "" &&
        !Number.isNaN(Number(id))
      ) {
        keptEduIds.push(Number(id));
      }
    }
    await deleteChildRowsNotInList("education", applicant_id, keptEduIds);

    for (let i = 0; i < courses.length; i++) {
      if (!courses[i] || String(courses[i]).trim() === "") continue;
      const eid = educationIds[i];
      if (
        eid !== undefined &&
        eid !== null &&
        String(eid).trim() !== "" &&
        !Number.isNaN(Number(eid))
      ) {
        await db.execute(
          `UPDATE education SET courseName=?, passingYear=?, universityORboard=?, result=?
           WHERE education_id=? AND applicant_id=?`,
          [
            courses[i],
            passingyears[i],
            unis[i],
            results[i],
            Number(eid),
            applicant_id,
          ]
        );
      } else {
        await db.execute(
          `INSERT INTO education (applicant_id, courseName, passingYear, universityORboard, result)
           VALUES (?, ?, ?, ?, ?)`,
          [
            applicant_id,
            courses[i],
            passingyears[i],
            unis[i],
            results[i],
          ]
        );
      }
    }

    const cn = ensureArray(comp_name);
    const fd = ensureArray(from_date);
    const td = ensureArray(to_date);
    const pkg = ensureArray(package);
    const rtl = ensureArray(reason_to_leave);
    const cno = ensureArray(contact_no);
    const nm = ensureArray(name);
    const rel = ensureArray(relation);
    const workExpIds = ensureArray(work_exp_id);

    const keptWorkIds = [];
    for (let i = 0; i < workExpIds.length; i++) {
      const id = workExpIds[i];
      if (
        id !== undefined &&
        id !== null &&
        String(id).trim() !== "" &&
        !Number.isNaN(Number(id))
      ) {
        keptWorkIds.push(Number(id));
      }
    }
    //keptid sivay nu badhu delete kari devanu
    await deleteChildRowsNotInList("work_experience", applicant_id, keptWorkIds);


    //Je kept id ma chhe aene update karvanu (if not any changes are there still it will update)
    //and jo keptid ma na hoy to navi row insert thase
    for (let i = 0; i < cn.length; i++) {
      if (!cn[i] || String(cn[i]).trim() === "") continue;
      const wid = workExpIds[i];
      if (
        wid !== undefined &&
        wid !== null &&
        String(wid).trim() !== "" &&
        !Number.isNaN(Number(wid))
      ) {
        await db.execute(
          `UPDATE work_experience SET
          companyName=?, from_date=?, to_date=?, annual_package=?, reasonToLeave=?,
          ref_contact_no=?, ref_contact_name=?, ref_contact_relation=?
          WHERE work_exp_id=? AND applicant_id=?`,
          [
            cn[i],
            fd[i],
            td[i],
            pkg[i],
            rtl[i],
            cno[i],
            nm[i],
            rel[i],
            Number(wid),
            applicant_id,
          ]
        );
      } else {
        await db.execute(
          `INSERT INTO work_experience
          (applicant_id, companyName, from_date, to_date, annual_package, reasonToLeave, ref_contact_no, ref_contact_name, ref_contact_relation)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            applicant_id,
            cn[i],
            fd[i],
            td[i],
            pkg[i],
            rtl[i],
            cno[i],
            nm[i],
            rel[i],
          ]
        );
      }
    }

    const langRows = normalizeIndexedRows(languages);
    const keptLangRowIds = langRows
      .map((r) => r.applicant_language_id)
      .filter(
        (id) =>
          id !== undefined &&
          id !== null &&
          String(id).trim() !== "" &&
          !Number.isNaN(Number(id))
      )
      .map(Number);

    await deleteChildRowsNotInList(
      "applicant_language",
      applicant_id,
      keptLangRowIds
    );

    for (const row of langRows) {
      if (!row || !row.lang_name || String(row.lang_name).trim() === "") continue;
      const language_id = await getOrCreateLanguageId(row.lang_name);
      const can_read = row.read ? 1 : 0;
      const can_write = row.write ? 1 : 0;
      const can_speak = row.speak ? 1 : 0;
      if (!can_read && !can_write && !can_speak) continue;

      if (
        row.applicant_language_id &&
        String(row.applicant_language_id).trim() !== "" &&
        !Number.isNaN(Number(row.applicant_language_id))
      ) {
        await db.execute(
          `UPDATE applicant_language SET language_id=?, can_read=?, can_write=?, can_speak=?
           WHERE applicant_language_id=? AND applicant_id=?`,
          [
            language_id,
            can_read,
            can_write,
            can_speak,
            Number(row.applicant_language_id),
            applicant_id,
          ]
        );
      } else {
        await db.execute(
          `INSERT INTO applicant_language (applicant_id, language_id, can_read, can_write, can_speak)
           VALUES (?, ?, ?, ?, ?)`,
          [applicant_id, language_id, can_read, can_write, can_speak]
        );
      }
    }

    const techRows = normalizeIndexedRows(tech_names);
    const keptApplicantTechIds = techRows
      .map((r) => r.applicant_tech)
      .filter(
        (id) =>
          id !== undefined &&
          id !== null &&
          String(id).trim() !== "" &&
          !Number.isNaN(Number(id))
      )
      .map(Number);

    await deleteChildRowsNotInList(
      "applicant_technologies",
      applicant_id,
      keptApplicantTechIds
    );

    for (const row of techRows) {
      if (!row || !row.tech_name || String(row.tech_name).trim() === "") continue;
      if (!row.level) continue;
      const tech_id = await getOrCreateTechId(row.tech_name);
      if (
        row.applicant_tech &&
        String(row.applicant_tech).trim() !== "" &&
        !Number.isNaN(Number(row.applicant_tech))
      ) {
        await db.execute(
          `UPDATE applicant_technologies SET tech_id=?, level=?
           WHERE applicant_tech=? AND applicant_id=?`,
          [tech_id, row.level, Number(row.applicant_tech), applicant_id]
        );
      } else {
        await db.execute(
          `INSERT INTO applicant_technologies (applicant_id, tech_id, level) VALUES (?, ?, ?)`,
          [applicant_id, tech_id, row.level]
        );
      }
    }

    const [locRows] = await db.execute(
      "SELECT location_id FROM locations WHERE location_name = ?",
      [preferred_location]
    );
    const [depRows] = await db.execute(
      "SELECT department_id FROM departments WHERE department_name = ?",
      [department]
    );
    if (!locRows.length || !depRows.length) {
      return res
        .status(400)
        .send(
          "Invalid preferred location or department. Pick values from the lists."
        );
    }

    const location_id = locRows[0].location_id;
    const department_id = depRows[0].department_id;
    const expCtc = Number(expected_ctc);
    const curCtc =
      current_ctc === "" || current_ctc === undefined
        ? null
        : Number(current_ctc);

    const [prefRows] = await db.execute(
      "SELECT * FROM preferences WHERE applicant_id = ? ORDER BY preference_id ASC LIMIT 1",
      [applicant_id]
    );

    const prefsUnchanged = (pr) =>
      pr &&
      pr.location_id === location_id &&
      pr.department_id === department_id &&
      String(pr.notice_period ?? "") === String(notice_period ?? "") &&
      Number(pr.expected_ctc) === expCtc &&
      (pr.current_ctc === null || pr.current_ctc === undefined
        ? curCtc === null || curCtc === undefined
        : Number(pr.current_ctc) === Number(curCtc));

    if (prefRows.length) {
      if (!prefsUnchanged(prefRows[0])) {
        await db.execute(
          `UPDATE preferences SET location_id=?, department_id=?, notice_period=?, expected_ctc=?, current_ctc=?
           WHERE preference_id=? AND applicant_id=?`,
          [
            location_id,
            department_id,
            notice_period,
            expCtc,
            curCtc,
            prefRows[0].preference_id,
            applicant_id,
          ]
        );
      }
    } else {
      await db.execute(
        `INSERT INTO preferences (applicant_id, location_id, department_id, notice_period, expected_ctc, current_ctc)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          applicant_id,
          location_id,
          department_id,
          notice_period,
          expCtc,
          curCtc,
        ]
      );
    }

    return res.redirect(`/user/update/${applicant_id}?updated=1`);
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .send(
          "Update failed: email must be unique, or duplicate language/technology rows."
        );
    }
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      return res.status(500).send("Database login failed. Check .env.");
    }
    return res.status(500).send("Update failed.");
  }
});

module.exports = router;
