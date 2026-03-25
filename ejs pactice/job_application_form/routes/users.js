const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
  res.render("htmlform");
});

router.post("/", (req, res) => {
  
  const {
    first_name,
    last_name,
    designation, // maps to Designation
    email,
    ph_no, // maps to phone_no
    gender,
    maritalstatus, // maps to relationship_status
    address1,
    address2,
    city,
    state,
    zip,
    dob,

    //education arrays
    course,
    passingyear,
    uni,
    result,

    // work experience arrays
    comp_name,
    from_date,
    to_date,
    package,
    reason_to_leave,
    contact_no,
    name,
    relation,

    //languages
    languages,

    //technologies
    tech_names,

    //preferences
    preferred_location,
    notice_period,
    expected_ctc,
    current_ctc,
    department,
  } = req.body;
  console.log(req.body);

  // console.log(req.body.languages[0].read);

  const insertQuery_basic_details = `
    INSERT INTO basic_details
    (first_name, last_name, Designation, email, phone_no, gender, relationship_status, address1, address2, city, state, zipcode, dob)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const basic_values = [
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
  ];
  //insert basic details

  db.query(insertQuery_basic_details, basic_values, (err, basic_result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).send("Could not save application.");
    }
    console.log("basic details is inserted in db");

    const applicant_id = basic_result.insertId;

    //loop for education
    if (course) {
      for (let i = 0; i < course.length; i++) {
        if (course[i].trim() !== "") {
          const inset_edu_query = `
          insert into education
          (applicant_id , courseName , passingYear , universityORboard, result)
          values (?,?,?,?,?)
        `;

          db.query(
            inset_edu_query,
            [applicant_id, course[i], passingyear[i], uni[i], result[i]],
            (err, result) => {
              if (err) throw err;
              else {
                console.log("edu data is inserted!");
              }
            },
          );
        }
      }
    }

    //loop for work experience
    if (comp_name && !Array.isArray(comp_name)) comp_name = [comp_name];
    if (from_date && !Array.isArray(from_date)) from_date = [from_date];
    if (to_date && !Array.isArray(to_date)) to_date = [to_date];
    if (package && !Array.isArray(package)) package = [package];
    if (reason_to_leave && !Array.isArray(reason_to_leave))
      reason_to_leave = [reason_to_leave];
    if (contact_no && !Array.isArray(contact_no)) contact_no = [contact_no];
    if (name && !Array.isArray(name)) name = [name];
    if (relation && !Array.isArray(relation)) relation = [relation];

    if (comp_name) {
      for (let i = 0; i < comp_name.length; i++) {
        if (comp_name[i].trim() !== "") {
          const work_query = `insert into work_experience (applicant_id, companyName, from_date, to_date, annual_package, reasonToLeave, ref_contact_no, ref_contact_name, ref_contact_relation)
        VALUES (?,?,?,?,?,?,?,?,?)`;
          db.query(
            work_query,
            [
              applicant_id,
              comp_name[i],
              from_date[i],
              to_date[i],
              package[i],
              reason_to_leave[i],
              contact_no[i],
              name[i],
              relation[i],
            ],
            (err, work_result) => {
              if (err) {
                throw err;
              }
              console.log("work data is inserted!");
            },
          );
        }
      }
    }

    //language insert
    if (languages) {
      for (let i = 0; i < languages.length; i++) {
        let language_name = languages[i].lang_name.toLowerCase();
        //console.log(`lang_name ${language_name}`);

        let currentLangs = [];
        db.query(`select * from languages;`, (err, currentLangans) => {
          if (err) throw err;

          currentLangans.forEach((element) => {
            currentLangs.push(element.language_name);
          });
          console.log(currentLangans);

          if (!currentLangs.includes(language_name)) {
            let query = `insert into languages (language_name) values (?);`;
            db.query(query, [language_name], (err, languageResult) => {
              if (err) throw err;
              console.log("language is added in db");
              //get language id
              db.query(
                `select language_id from languages where language_name= (?)`,
                [language_name],
                (err, lang_id_ans) => {
                  if (err) throw err;
                  let language_id = lang_id_ans[0].language_id;
                  //fill applicant_language
                  let can_read = languages[i].read ? 1 : 0;
                  let can_write = languages[i].write ? 1 : 0;
                  let can_speak = languages[i].speak ? 1 : 0;

                  let applicant_language = `insert into applicant_language (applicant_id,language_id,can_read,can_write,can_speak)
            values (?,?,?,?,?)`;

                  db.query(
                    applicant_language,
                    [applicant_id, language_id, can_read, can_write, can_speak],
                    (err, applicant_language_ans) => {
                      console.log(applicant_language_ans);
                      if (err) throw err;
                      console.log("data is inserted in applicant_language");
                    },
                  );
                },
              );
            });
          } else {
            console.log("already have this language in db");
            //get language id
            db.query(
              `select language_id from languages where language_name= (?)`,
              [language_name],
              (err, lang_id_ans) => {
                if (err) throw err;
                let language_id = lang_id_ans[0].language_id;
                //fill applicant_language
                let can_read = languages[i].read ? 1 : 0;
                let can_write = languages[i].write ? 1 : 0;
                let can_speak = languages[i].speak ? 1 : 0;

                let applicant_language = `insert into applicant_language (applicant_id,language_id,can_read,can_write,can_speak)
            values (?,?,?,?,?)`;

                db.query(
                  applicant_language,
                  [applicant_id, language_id, can_read, can_write, can_speak],
                  (err, applicant_language_ans) => {
                    console.log(applicant_language_ans);
                    if (err) throw err;
                    console.log("data is inserted in applicant_language");
                  },
                );
              },
            );
          }
        });
      }
    }

    // technology insert
    if (tech_names) {
      for (let i = 0; i < tech_names.length; i++) {
        let curr_tech_name = tech_names[i].tech_name.toLowerCase();
        let level = tech_names[i].level;

        //check its already present or not , if not then insert it.
        let tech_list = [];
        db.query(
          `select tech_name from technologies`,
          (err, technologies_result) => {
            if (err) throw err;
            technologies_result.forEach((ele) => {
              tech_list.push(ele.tech_name);
            });
            console.log(tech_list);

            console.log(` tech list from database :${tech_list}`);

            if (!tech_list.includes(curr_tech_name)) {
              db.query(
                `insert into technologies (tech_name) values (?)`,
                [curr_tech_name],
                (err, tech_insert_result) => {
                  if (err) throw err;
                  console.log(`${curr_tech_name} technology is inserted`);

                  db.query(
                    `select tech_id from technologies where tech_name= (?)`,
                    [curr_tech_name],
                    (err, fetch_tech_id_res) => {
                      if (err) throw err;
                      console.log(fetch_tech_id_res);

                      let tech_id = fetch_tech_id_res[0].tech_id;
                      console.log(`fetched tech is ${tech_id}`);

                      //add the row in applicant_technologies

                      query_applicant_tech = `
            insert into applicant_technologies (applicant_id , tech_id , level) values (?,?,?)
            `;
                      db.query(
                        query_applicant_tech,
                        [applicant_id, tech_id, level],
                        (err, app_tech_res) => {
                          if (err) throw err;
                          console.log("technologies of applicant are inserted");
                        },
                      );
                    },
                  );
                },
              );
            } else {
              console.log("technology is already in db");
              db.query(
                `select tech_id from technologies where tech_name= (?)`,
                [curr_tech_name],
                (err, fetch_tech_id_res) => {
                  if (err) throw err;
                  console.log(fetch_tech_id_res);

                  let tech_id = fetch_tech_id_res[0].tech_id;
                  console.log(`fetched tech is ${tech_id}`);

                  //add the row in applicant_technologies

                  query_applicant_tech = `
            insert into applicant_technologies (applicant_id , tech_id , level) values (?,?,?)
            `;
                  db.query(
                    query_applicant_tech,
                    [applicant_id, tech_id, level],
                    (err, app_tech_res) => {
                      if (err) throw err;
                      console.log("technologies of applicant are inserted");
                    },
                  );
                },
              );
            }

            //then get technology id
            //( i think some time this will give error because some time tech is not added in db and you try to get the id of that)
          },
        );
      }
    }

    //insert preference
    //get location and department id first

    let location_id, department_id;

    db.query(
      `select location_id from locations where location_name=(?)`,
      [preferred_location],
      (err, location_res) => {
        if (err) {
          console.error(err);
          return res.redirect("/user");
        }
        if (!location_res || !location_res[0]) {
          return res.redirect("/user");
        }

        location_id = location_res[0].location_id;

        //now get dept id
        db.query(
          `select department_id from departments where department_name=(?)`,
          [department],
          (err, department_res) => {
            if (err) {
              console.error(err);
              return res.redirect("/user");
            }
            if (!department_res || !department_res[0]) {
              return res.redirect("/user");
            }
            department_id = department_res[0].department_id;

            //now insert preference to database
            if (location_id && department_id) {
              let query_preference = `insert into preferences (applicant_id , location_id , department_id , notice_period , expected_ctc,current_ctc) values (?,?,?,?,?,?)`;

              db.query(
                query_preference,
                [
                  applicant_id,
                  location_id,
                  department_id,
                  notice_period,
                  expected_ctc,
                  current_ctc,
                ],
                (err, preference_res) => {
                  if (err) {
                    console.error(err);
                    return res.redirect("/user");
                  }
                  console.log(`preference is added in db`);
                  return res.redirect("/user");
                },
              );
            } else {
              return res.redirect("/user");
            }
          },
        );
      },
    );
  });
});

module.exports = router;
