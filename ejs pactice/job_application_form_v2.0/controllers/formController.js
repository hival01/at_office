const db = require("../config/database");
const model = require("../models/form");

function normalizeArray(field) {
  if (Array.isArray(field)) return field;
  if (!field) return [];
  return [field];
}

exports.getform = (req, res) => {
  res.render("jobApplicationForm");
};

exports.getGender = async (req, res) => {
  try {
    const options = await model.getSelectOptions("gender");
    res.json(options);
  } catch (error) {
    console.log(`getGender error: ${error}`);
    res.status(500).json({ message: "Failed to load gender options." });
  }
};

exports.getRelationship = async (req, res) => {
  try {
    const options = await model.getSelectOptions("relationship");
    res.json(options);
  } catch (error) {
    console.log(`error in getrelationship ${error}`);
    res.status(500).json({ message: "Failed to load relationship options." });
  }
};

exports.getState = async (req, res) => {
  try {
    const options = await model.getSelectOptions("state");
    res.json(options);
  } catch (error) {
    console.log(`error in getrelationship ${error}`);
    res.status(500).json({ message: "Failed to load state options." });
  }
};

exports.getCity = async (req, res) => {
  try {
    const stateName = req.query.state;
    const cities = await model.getCityOptions(stateName);
    res.json(cities);
  } catch (error) {
    console.log(`error in getcity ${error}`);
    res.status(500).json({ message: "Failed to load city options." });
  }
};

exports.getPrefLocation = async (req, res) => {
  try {
    const locations = await model.getSelectOptions("prefLocation");
    res.send(locations);
  } catch (error) {
    console.log(`error in getPrefLocation ${error}`);
    res.status(500).json({ message: "Failed to load preferred locations." });
  }
};

exports.getPrefDepartment = async (req, res) => {
  try {
    const departments = await model.getSelectOptions("prefDepartment");
    res.json(departments);
  } catch (error) {
    console.log(`error in getPrefDepartment ${error}`);
    res.status(500).json({ message: "Failed to load preferred departments." });
  }
};
exports.submit = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      designation,
      gender,
      relationship,
      address1,
      address2,
      state,
      city,
      zip,
      dob,
      location1,
      location2,
      noticePeriod,
      expectedCtc,
      currentCtc,
      department,
    } = req.body;

    const education = normalizeArray(req.body.education);
    const workExperience = normalizeArray(req.body.workExperience);
    const languages = normalizeArray(req.body.languages);
    const technologies = normalizeArray(req.body.technologies);

    if (!education.length || !workExperience.length || !languages.length || !technologies.length) {
      return res.status(400).send("Dynamic sections are required (education, work experience, languages, technologies).");
    }

    let basicQuery = `insert into basic_details 
        (firstName, lastName, designation, email, phoneNo, address1, address2, zipcode, dob,gender , relationship,state,city)
        values
        (?,?,?,?,?,?,?,?,?,?,?,?,?);`;

    const resultBasic = await db.execute(basicQuery, [
      firstName,
      lastName,
      designation,
      email,
      phoneNo,
      address1,
      address2,
      zip,
      dob,
      gender,
      relationship,
      state,
      city,
    ]);

    const applicantId = resultBasic[0].insertId;
    await model.saveDynamicSections(applicantId, req.body);

    //insert preference into db

    const preferenceQuery = `insert into preference (noticePeriod , expectedCTC , currentCTC , applicantId, location1 ,location2 , department)
        VALUES (?,?,?,?,?,?,?);
        `;

    await db.execute(preferenceQuery, [
      noticePeriod,
      expectedCtc,
      currentCtc,
      applicantId,
      location1,
      location2,
      department,
    ]);

    res.redirect(`/applications/${applicantId}`);
  } catch (error) {
    console.log(`error inot submit form ${error}`);
    res.status(500).send("Failed to save form.");
  }
};

exports.listApplicants = async (req, res) => {
  try {
    const applicants = await model.getApplicants();
    res.render("applicantsList", { applicants });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to load applicants list.");
  }
};

exports.getApplicantDetails = async (req, res) => {
  try {
    const applicantId = Number(req.params.id);
    if (!Number.isInteger(applicantId)) {
      return res.status(400).send("Please provide a valid applicant ID.");
    }

    const data = await model.getApplicantById(applicantId);
    if (!data.basic) return res.status(404).send("Applicant not found.");

    res.render("applicantDetails", {
      applicantId,
      basic: data.basic,
      preference: data.preference,
      education: data.education,
      workExperience: data.workExperience,
      languages: data.languages,
      technologies: data.technologies,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to load applicant details.");
  }
};

exports.getUser = async (req, res) => {
  try {
    const applicantId = Number(req.params.id);
    if (!Number.isInteger(applicantId)) {
      return res.status(400).send("Please provide a valid applicant ID.");
    }

    const data = await model.getApplicantById(applicantId);
    if (!data.basic) return res.status(404).send("Applicant not found.");

    res.render("updateForm", {
      applicantId,
      basic: data.basic,
      preference: data.preference,
      education: data.education,
      workExperience: data.workExperience,
      languages: data.languages,
      technologies: data.technologies,
      formError: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to load update form.");
  }
};

exports.updateApplicant = async (req, res) => {
  try {
    const applicantId = Number(req.params.id);
    if (!Number.isInteger(applicantId)) {
      return res.status(400).send("Please provide a valid applicant ID.");
    }

    const payload = req.body;
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNo",
      "designation",
      "address1",
      "state",
      "city",
      "zip",
      "dob",
      "gender",
      "relationship",
      "noticePeriod",
      "expectedCtc",
      "currentCtc",
      "location1",
      "department",
    ];

    const missing = requiredFields.filter((field) => !payload[field]);
    const dynamicMissing =
      !normalizeArray(payload.education).length ||
      !normalizeArray(payload.workExperience).length ||
      !normalizeArray(payload.languages).length ||
      !normalizeArray(payload.technologies).length;

    if (missing.length || dynamicMissing) {
      const data = await model.getApplicantById(applicantId);
      return res.status(400).render("updateForm", {
        applicantId,
        basic: { ...data.basic, ...payload },
        preference: { ...data.preference, ...payload },
        education: payload.education || data.education,
        workExperience: payload.workExperience || data.workExperience,
        languages: payload.languages || data.languages,
        technologies: payload.technologies || data.technologies,
        formError: `Please fill required fields: ${missing.join(", ")}${
          dynamicMissing ? " and all dynamic sections." : ""
        }`,
      });
    }

    await model.updateApplicantById(applicantId, payload);
    res.redirect(`/applications/${applicantId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to update applicant.");
  }
};

exports.deleteApplicant = async (req, res) => {
  try {
    const applicantId = Number(req.params.id);
    if (!Number.isInteger(applicantId)) {
      return res.status(400).send("Please provide a valid applicant ID.");
    }

    await model.deleteApplicantById(applicantId);
    res.redirect("/applications");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete applicant.");
  }
};
