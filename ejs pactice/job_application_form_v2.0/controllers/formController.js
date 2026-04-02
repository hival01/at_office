// const model = require("../models/form");
const db = require("../config/database");

exports.getform =  (req, res)=>{
    res.render("jobApplicationForm");
}

exports.getGender =  async (req, res)=>{
    try {
        const [result] = await db.execute(`select selectId from selectMaster where selectName ="gender"`);
        const selectId = result[0].selectId;
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
        
        const [selectResult]= await db.execute(`select selectId from selectMaster where selectname="city"`);
        const selectId = selectResult[0].selectId;

        const [optionResult]= await db.execute(`select * from optionMaster where selectId=${selectId} and parentId=(select optionId from optionMaster where optionName="${stateName}")`);

        res.json(optionResult);

    } catch (error) {
        console.log(`error in getcity ${error}`);
    }
}


exports.getPrefLocation = async (req, res)=>{
    try{
        const [result] = await db.execute(`select selectId from selectMaster where selectName="prefLocation"`)
        if(result){
            const selectId = result[0].selectId;

            const [locations]= await db.execute(`select * from optionMaster where selectId =${selectId}`);
            res.send(locations);
        }
    }catch(error){
        console.log(`error in getPrefLocation ${error}`);
        
    }
}

exports.getPrefDepartment = async ( req, res)=>{
    try {
        const [result] = await db.execute(`select selectId from selectMaster where selectName="prefDepartment"`);
        const selectId = result[0].selectId;

        const[departments] = await db.execute(`select * from optionMaster where selectId=${selectId}`);
        res.json(departments);

    } catch (error) {
        console.log(`error in getPrefDepartment ${error}`);
        
    }
}
exports.submit = (req, res)=>{
    try {
        console.log(req.body);
        res.send("hii data is sent to backend")
    } catch (error) {
        console.log(`error inot submit form`);
        
    }
}