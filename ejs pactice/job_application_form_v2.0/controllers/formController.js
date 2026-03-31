// const model = require("../models/form");
const db = require("../config/database");

exports.getform =  (req, res)=>{
    res.render("jobApplicationForm");
}

exports.getGender =  async (req, res)=>{
    try {
        console.log("before execute");
        const [result] = await db.execute(`select selectId from selectMaster where selectName ="gender"`);
        console.log("after  execute");
        const selectId = result[0].selectId;
        console.log(`select d is ${selectId}`);
        const [result1] = await db.execute(`select * from optionMaster where selectId =${selectId}`)

        res.json(result1);
    } catch (error) {
        console.log(`getGender error: ${error}`);
    }
}

exports.getRelationship = async (req, res)=>{
    try {
            const[result] = await db.execute(`select selectId from selectMaster where selectName="relationship"`);
            const selectId=result[0].selectId;
            const [result1] = await db.execute(`select * from optionMaster where selectId =${selectId}`)
            res.json(result1);
    } catch (error) {
        console.log(`error in getrelationship ${error}`);
        
    }
}

exports.getState = async (req, res)=>{
    try {
        const [selectResult]= await db.execute(`select selectId from selectMaster where selectName="state"`);
        const selectId = selectResult[0].selectId;

        const [optionResult] = await db.execute(`select * from optionMaster where selectId =${selectId}`);

        res.json(optionResult);
    } catch (error) {
        console.log(`error in getrelationship ${error}`);
    }
}

exports.getCity = async (req, res)=>{
    try {
        const stateName = req.query.state;
        console.log(`state name ${stateName}`);
        
        const [selectResult]= await db.execute(`select selectId from selectMaster where selectname="city"`);
        const selectId = selectResult[0].selectId;

        const [optionResult]= await db.execute(`select * from optionMaster where selectId=${selectId} and parentId=(select optionId from optionMaster where optionName="${stateName}")`);

        res.json(optionResult);

    } catch (error) {
        console.log(`error in getcity ${error}`);
    }
}