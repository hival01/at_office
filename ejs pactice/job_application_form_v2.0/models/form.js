const db = require("../config/database");

async function getSelectOptions(selectName) {
  const [selectRows] = await db.execute(
    "SELECT selectId FROM selectMaster WHERE selectName = ?",
    [selectName],
  );
  if (!selectRows.length) return [];

  const [options] = await db.execute(
    "SELECT optionId, optionName, parentId FROM optionMaster WHERE selectId = ?",
    [selectRows[0].selectId],
  );
  return options;
}

async function getCityOptions(stateName) {
  const [selectRows] = await db.execute(
    "SELECT selectId FROM selectMaster WHERE selectName = ?",
    ["city"],
  );
  if (!selectRows.length) return [];

  const [cities] = await db.execute(
    `SELECT optionId, optionName, parentId
     FROM optionMaster
     WHERE selectId = ?
       AND parentId = (SELECT optionId FROM optionMaster WHERE optionName = ? LIMIT 1)`,
    [selectRows[0].selectId, stateName],
  );
  return cities;
}

async function getApplicants() {
  const [rows] = await db.execute(
    "SELECT applicantId, firstName, lastName, email, phoneNo, designation FROM basic_details ORDER BY applicantId DESC",
  );
  return rows;
}

async function getApplicantById(applicantId) {
  const [basicRows] = await db.execute(
    "SELECT * FROM basic_details WHERE applicantId = ?",
    [applicantId],
  );
  const [preferenceRows] = await db.execute(
    "SELECT * FROM preference WHERE applicantId = ? LIMIT 1",
    [applicantId],
  );
  const [educationRows] = await db.execute(
    "SELECT educationId, courseName, passingYear, uniBoard, result FROM education WHERE applicantId = ? ORDER BY educationId ASC",
    [applicantId],
  );
  const [workRows] = await db.execute(
    "SELECT compName, fromDate, toDate, annualPackage, reasonToLeave, refContactNo, refContactName, refContactRelation FROM workExperience WHERE applicantId = ? ORDER BY createdAt ASC",
    [applicantId],
  );
  const [languageRows] = await db.execute(
    "SELECT languageId, languageName, canRead, canWrite, canSpeak FROM languages WHERE applicantId = ? ORDER BY languageId ASC",
    [applicantId],
  );
  const [technologyRows] = await db.execute(
    "SELECT technologyId, techName, expLevel FROM technologies WHERE applicantId = ? ORDER BY technologyId ASC",
    [applicantId],
  );

  return {
    basic: basicRows[0] || null,
    preference: preferenceRows[0] || null,
    education: educationRows,
    workExperience: workRows,
    languages: languageRows,
    technologies: technologyRows,
  };
}

async function saveDynamicSections(applicantId, payload) {
  const education = Array.isArray(payload.education)
    ? payload.education
    : payload.education
      ? [payload.education]
      : [];
  const workExperience = Array.isArray(payload.workExperience)
    ? payload.workExperience
    : payload.workExperience
      ? [payload.workExperience]
      : [];
  const languages = Array.isArray(payload.languages)
    ? payload.languages
    : payload.languages
      ? [payload.languages]
      : [];
  const technologies = Array.isArray(payload.technologies)
    ? payload.technologies
    : payload.technologies
      ? [payload.technologies]
      : [];

  for (const edu of education) {
    if (!edu.courseName || !edu.passingYear || !edu.uniBoard || !edu.result) continue;
    await db.execute(
      "INSERT INTO education (courseName, passingYear, uniBoard, result, applicantId) VALUES (?, ?, ?, ?, ?)",
      [edu.courseName, edu.passingYear, edu.uniBoard, edu.result, applicantId],
    );
  }

  for (const work of workExperience) {
    if (
      !work.compName ||
      !work.fromDate ||
      !work.toDate ||
      !work.annualPackage ||
      !work.reasonToLeave ||
      !work.refContactNo ||
      !work.refContactName ||
      !work.refContactRelation
    ) {
      continue;
    }
    await db.execute(
      `INSERT INTO workExperience
      (compName, fromDate, toDate, annualPackage, reasonToLeave, refContactNo, refContactName, refContactRelation, applicantId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        work.compName,
        work.fromDate,
        work.toDate,
        work.annualPackage,
        work.reasonToLeave,
        work.refContactNo,
        work.refContactName,
        work.refContactRelation,
        applicantId,
      ],
    );
  }

  for (const language of languages) {
    if (!language.languageName) continue;
    await db.execute(
      "INSERT INTO languages (applicantId, languageName, canRead, canWrite, canSpeak) VALUES (?, ?, ?, ?, ?)",
      [
        applicantId,
        language.languageName,
        language.canRead ? 1 : 0,
        language.canWrite ? 1 : 0,
        language.canSpeak ? 1 : 0,
      ],
    );
  }

  for (const tech of technologies) {
    if (!tech.techName || !tech.expLevel) continue;
    await db.execute(
      "INSERT INTO technologies (applicantId, techName, expLevel) VALUES (?, ?, ?)",
      [applicantId, tech.techName, tech.expLevel],
    );
  }
}

async function updateApplicantById(applicantId, payload) {
  const basicQuery = `
    UPDATE basic_details
    SET firstName = ?, lastName = ?, designation = ?, email = ?, phoneNo = ?,
        address1 = ?, address2 = ?, zipcode = ?, dob = ?, gender = ?, relationship = ?, state = ?, city = ?
    WHERE applicantId = ?
  `;

  await db.execute(basicQuery, [
    payload.firstName,
    payload.lastName,
    payload.designation,
    payload.email,
    payload.phoneNo,
    payload.address1,
    payload.address2,
    payload.zip,
    payload.dob,
    payload.gender,
    payload.relationship,
    payload.state,
    payload.city,
    applicantId,
  ]);

  const [preferenceRows] = await db.execute(
    "SELECT applicantId FROM preference WHERE applicantId = ? LIMIT 1",
    [applicantId],
  );

  if (preferenceRows.length) {
    await db.execute(
      `UPDATE preference
       SET noticePeriod = ?, expectedCTC = ?, currentCTC = ?, location1 = ?, location2 = ?, department = ?
       WHERE applicantId = ?`,
      [
        payload.noticePeriod,
        payload.expectedCtc,
        payload.currentCtc,
        payload.location1,
        payload.location2,
        payload.department,
        applicantId,
      ],
    );
  } else {
    await db.execute(
      `INSERT INTO preference (noticePeriod, expectedCTC, currentCTC, applicantId, location1, location2, department)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.noticePeriod,
        payload.expectedCtc,
        payload.currentCtc,
        applicantId,
        payload.location1,
        payload.location2,
        payload.department,
      ],
    );
  }

  await db.execute("DELETE FROM education WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM workExperience WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM languages WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM technologies WHERE applicantId = ?", [applicantId]);
  await saveDynamicSections(applicantId, payload);
}

async function deleteApplicantById(applicantId) {
  // Delete child rows first to satisfy FK constraints.
  await db.execute("DELETE FROM education WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM workExperience WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM languages WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM technologies WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM preference WHERE applicantId = ?", [applicantId]);
  await db.execute("DELETE FROM basic_details WHERE applicantId = ?", [applicantId]);
}

module.exports = {
  getSelectOptions,
  getCityOptions,
  getApplicants,
  getApplicantById,
  saveDynamicSections,
  updateApplicantById,
  deleteApplicantById,
};