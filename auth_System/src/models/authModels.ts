import db from "../config/db";

export async function checkEmail(email: string) {
  try {
    const connection = await db.getConnection();
    const query = `select * from authentication where user_email =?`;
    const [result]: any = await connection.execute(query, [email]);
    connection.release();
    return result[0];
  } catch (e) {
    console.log(e);
  }
}

export async function registerUser(userName:string, email:string , password:string){
    try{
        const connection = await db.getConnection();
        const  query = `insert into authentication ( user_name,user_email,user_password) values(?,?,?);`

        //logic for hasing the password using bcrpt
        
        const [result] = await connection.execute(query, [userName,email,password]);
        connection.release();

        return result;
    }catch(err){
        console.log(err);
    }
}

export async function authenticateUser(email:string , password:string){
  try{
    const connection = await db.getConnection();
        const  query = `select * from authentication where user_email = ?`;
        
        const [result] = await connection.execute(query, [email]);
        connection.release();

        return result;
  }catch(err){
    console.log(err);
  }
}

export async function EnterJWT(token:string , id:number) {  
    try{
      const connection = await db.getConnection();
        const  query = `update authentication set jwt_token =? where user_id = ?`;
        
        const [result] = await connection.execute(query, [token, id]);
        connection.release();

        return result;
    }catch(err){
      console.log(err);
    }
}