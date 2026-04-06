// const model = require("../models/form");
const db = require("../config/database");

exports.getform = (req, res) => {
  res.render("jobApplicationForm");
};

exports.getGender = async (req, res) => {
  try {
    const [result] = await db.execute(
      `select selectId from selectMaster where selectName ="gender"`,
    );
    const selectId = result[0].selectId;
    const [result1] = await db.execute(
      `select * from optionMaster where selectId =${selectId}`,
    );

    res.json(result1);
  } catch (error) {
    console.log(`getGender error: ${error}`);
  }
};

exports.getRelationship = async (req, res) => {
  try {
    const [result] = await db.execute(
      `select selectId from selectMaster where selectName="relationship"`,
    );
    const selectId = result[0].selectId;
    const [result1] = await db.execute(
      `select * from optionMaster where selectId =${selectId}`,
    );
    res.json(result1);
  } catch (error) {
    console.log(`error in getrelationship ${error}`);
  }
};

exports.getState = async (req, res) => {
  try {
    const [selectResult] = await db.execute(
      `select selectId from selectMaster where selectName="state"`,
    );
    const selectId = selectResult[0].selectId;

    const [optionResult] = await db.execute(
      `select * from optionMaster where selectId =${selectId}`,
    );

    res.json(optionResult);
  } catch (error) {
    console.log(`error in getrelationship ${error}`);
  }
};

exports.getCity = async (req, res) => {
  try {
    const stateName = req.query.state;

    const [selectResult] = await db.execute(
      `select selectId from selectMaster where selectname="city"`,
    );
    const selectId = selectResult[0].selectId;

    const [optionResult] = await db.execute(
      `select * from optionMaster where selectId=${selectId} and parentId=(select optionId from optionMaster where optionName="${stateName}")`,
    );

    res.json(optionResult);
  } catch (error) {
    console.log(`error in getcity ${error}`);
  }
};

exports.getPrefLocation = async (req, res) => {
  try {
    const [result] = await db.execute(
      `select selectId from selectMaster where selectName="prefLocation"`,
    );
    if (result) {
      const selectId = result[0].selectId;

      const [locations] = await db.execute(
        `select * from optionMaster where selectId =${selectId}`,
      );
      res.send(locations);
    }
  } catch (error) {
    console.log(`error in getPrefLocation ${error}`);
  }
};

exports.getPrefDepartment = async (req, res) => {
  try {
    const [result] = await db.execute(
      `select selectId from selectMaster where selectName="prefDepartment"`,
    );
    const selectId = result[0].selectId;

    const [departments] = await db.execute(
      `select * from optionMaster where selectId=${selectId}`,
    );
    res.json(departments);
  } catch (error) {
    console.log(`error in getPrefDepartment ${error}`);
  }
};
exports.submit = async (req, res) => {
  try {
    console.log(req.body);

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

      courses,
      passingYears,
      unis,
      results,

      compName,
      fromDate,
      toDate,
      annualPkg,
      reasonToLeave,
      refContactNo,
      refContactName,
      refContactRelation,

      languages,
      technologies,
      location1,
      location2,
      noticePeriod,
      expectedCtc,
      currentCtc,
      department,
    } = req.body;

    //instert all the data in db

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
    console.log(applicantId);

    //insert into education tabel

    const eduQuery = `insert into education (courseName, passingYear, uniBoard ,result, applicantId) 
            values
            (?,?,?,?,?)
        `;
    if (courses) {
      for (let i = 0; i < courses.length; i++) {
        const resultEdu = await db.execute(eduQuery, [
          courses[i],
          passingYears[i],
          unis[i],
          results[i],
          applicantId,
        ]);
      }
    }

    //insert into workexp

    const workQuery = `insert into workExperience 
            (compName, fromDate, toDate, annualPackage , reasonToLeave , refContactNo , refContactName, refContactRelation , applicantId)
            VALUES
            (?,?,?,?,?,?,?,?,?)
            
            `;

    if (compName) {
      for (let i = 0; i < compName.length; i++) {
        await db.execute(workQuery, [
          compName[i],
          fromDate[i],
          toDate[i],
          annualPkg[i],
          reasonToLeave[i],
          refContactNo[i],
          refContactName[i],
          refContactRelation[i],
          applicantId,
        ]);
      }
    }
    //insert into languages
    const languageQuery = `insert into languages (applicantId , languageName , canRead, canWrite , canSpeak)
        values (?,?,?,?,?)`;

    if (languages) {
      languages.forEach(async (ele) => {
        let canRead = ele.canRead ? 1 : 0;
        let canWrite = ele.canWrite ? 1 : 0;
        let canSpeak = ele.canSpeak ? 1 : 0;

        await db.execute(languageQuery, [
          applicantId,
          ele.languages,
          canRead,
          canWrite,
          canSpeak,
        ]);
      });
    }

    //insert technologies
    const techQuery = `insert into technologies (applicantId , techName , expLevel)
            values (?,?,?);
         `;
    if (technologies) {
      technologies.forEach(async (e) => {
        await db.execute(techQuery, [applicantId, e.technologies, e.level]);
      });
    }

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

    res.send("hii data is sent to backend");
  } catch (error) {
    console.log(`error inot submit form ${error}`);
  }
};

exports.getUser = async (req, res) => {
  try {
    const applicantId = req.params.id;

    if (isNaN(applicantId)) {
      res.send("enter proper applicant ID");
    }
    const [basic_details] = await db.execute(
      `select * from basic_details where applicantId= ?`,
      [applicantId],
    );
    if (!basic_details.length) {
      return res.status(404).send(`applicant not found`);
    }

    const [educations] = await db.execute(
      `select * from education where applicantId=?`,
      [applicantId],
    );
    const [workExp] = await db.execute(
      `select * from workExperience where applicantId =?`,
      [applicantId],
    );

    const [languages] = await db.execute(
      `select * from languages where applicantId=?`,
      [applicantId],
    );
    const [technologies] = await db.execute(
      `select * from technologies where applicantId=?`,
      [applicantId],
    );

    const [preferences] = await db.execute(
        `select * from preference where applicantId =?`,
        [applicantId]
    );



    const data = {
      applicantId,
      basic_details,
      educations,
      workExp,
      languages,
      technologies,
      preferences,
    };
    console.log(data);

    res.render("updateForm", {data});



    
  } catch (err) {
    console.log(err);
  }
};
