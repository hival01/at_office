import db from "../config/db";

export async function checkEmail(email:string){
try{
    
    const connection = await db.getConnection();
    const  query = `select * from authentication where user_email =?`
    const [result] :any  = await connection.execute(query, [email]);
    
    return result[0];
}catch(e){
    console.log(e);
}
}