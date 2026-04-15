const jwt = require("jsonwebtoken");



const secretKey = "hival";

function generateToken(userObj){
    const payload={
        userId: userObj.id,
        userName: userObj.name,
        role:userObj.role,
    }

    const option ={
        expiresIn: '1min'
    };

    const token = jwt.sign(payload ,secretKey , option);
    console.log(token);
    return token;
}

function verifyToken(token){
    try{
        const decoded = jwt.verify(token , secretKey);
        return decoded;

    }catch(err){
        console.log(err);
        return null;
    }
}

const sampleUser={
    id:10,
    name:"hival",
    role:"admin",
}

const userToken = generateToken(sampleUser);
const decodedToken = verifyToken(userToken);
console.log(decodedToken);