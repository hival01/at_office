import db from "../config/db";

export async function checkEmail(email: string) {
  try {
    const connection = await db.getConnection();
    const query = `select * from users where email =?`;
    const [result]: any = await connection.execute(query, [email]);
    connection.release();
    return result[0];
  } catch (e) {
    console.log(e);
  }
}

export async function registerUser(userName:string, email:string , password:string , dob:string){
    try{
        const connection = await db.getConnection();
        const  query = `insert into users ( username,email,password_hash,dob) values(?,?,?,?);`

        //logic for hasing the password using bcrpt
        
        const [result] = await connection.execute(query, [userName,email,password,dob]);
        connection.release();

        return result;
    }catch(err){
        console.log(err);
    }
}

export async function getUser(email:string){
  try{
    const connection = await db.getConnection();
        const  query = `select * from users where email = ?`;
        
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
        const  query = `update users set jwt_token =? where id = ?`;
        
        const [result] = await connection.execute(query, [token, id]);
        connection.release();

        return result;
    }catch(err){
      console.log(err);
    }
}

export async function updatePassword(id:number, hash:string) {
     try{
      const connection = await db.getConnection();
        const  query = `update users set password_hash=? where id=?`;
        
        const [result] = await connection.execute(query, [hash, id]);
        connection.release();

        return result;
    }catch(err){
      console.log(err);
    }
}

export async function saveOTP(user_id :number, otpHash:string , expiresAt:Date){
  try{
      const connection = await db.getConnection();
        const  query = `INSERT INTO password_resets (user_id, otp_hash, expires_at) 
        VALUES (?, ?, ?)`;
        
        const [result] = await connection.execute(query, [user_id, otpHash,expiresAt]);
        connection.release();

        return result;
    }catch(err){
      console.log(err);
    }
} 


// Finds the most recent, unused OTP for the user
export async function getLatestOTP(userId:number) :Promise<any> {
    

    try{
      const connection = await db.getConnection();
        const  query = `SELECT * FROM password_resets 
         WHERE user_id = ? AND is_used = false 
         ORDER BY created_at DESC LIMIT 1`;
        
        const [result] = await connection.execute(query, [userId]);
        connection.release();

        return result;
    }catch(err){
      console.log(err);
    }
}

// Prevents the same OTP from being used twice
export async function markOTPAsUsed(resetId:number) {
    
    try{
      const connection = await db.getConnection();
        
        const [result] = await connection.execute(`UPDATE password_resets SET is_used = true WHERE reset_id = ?`, [resetId]);
        connection.release();

        return result;
    }catch(err){
      console.log(err);
    }
}



/**
 * Get user by username
 */
export async function getUserByUsername(username: string) {
    try {
        const connection = await db.getConnection();
        const query = `
            SELECT id, username, bio, profile_pic_url, cover_page_url, created_at
            FROM users
            WHERE username = ?
        `;
        const [rows]: any = await connection.execute(query, [username]);
        connection.release();

        return rows[0];
    } catch (err) {
        console.log("getUserByUsername error:", err);
        throw err;
    }
}

export async function updateUserProfile(
    userId: number,
    bio: string,
    profilePic: string,
    coverPic: string
) {
    try {
        const connection = await db.getConnection();

        const query = `
            UPDATE users
            SET bio = ?, profile_pic_url = ?, cover_page_url = ?
            WHERE id = ?
        `;

        await connection.execute(query, [
            bio,
            profilePic,
            coverPic,
            userId
        ]);

        connection.release();

    } catch (err) {
        console.log("updateUserProfile error:", err);
        throw err;
    }
}


export async function getUserById(userId: number) {
    try {
        const connection = await db.getConnection();

        const [rows]: any = await connection.execute(
            `SELECT id, username, bio, profile_pic_url, cover_page_url 
             FROM users WHERE id = ?`,
            [userId]
        );

        connection.release();
        return rows[0];

    } catch (err) {
        console.log("getUserById error:", err);
        throw err;
    }
}


/**
 * Get user tweet/follower stats
 */
export async function getUserStats(userId: number) {
    try {
        const connection = await db.getConnection();

        // Count main tweets (parent_id IS NULL)
        const [tweetRows]: any = await connection.execute(
            `SELECT COUNT(*) as count FROM tweets WHERE user_id = ? AND parent_id IS NULL`,
            [userId]
        );

        connection.release();

        return {
            tweets: tweetRows[0]?.count || 0,
            followers: 0, // implement later
            following: 0
        };
    } catch (err) {
        console.log("getUserStats error:", err);
        throw err;
    }
}

export async function updateUserImages(
    userId: number,
    profilePic: string | null,
    coverPic: string | null
) {
    try {
      console.log("in the model");
        const connection = await db.getConnection();

        if (profilePic) {
            await connection.execute(
                "UPDATE users SET profile_pic_url = ? WHERE id = ?",
                [profilePic, userId]
            );
        }

        if (coverPic) {
            await connection.execute(
                "UPDATE users SET cover_page_url = ? WHERE id = ?",
                [coverPic, userId]
            );
        }

        connection.release();
    } catch (err) {
        console.log("updateUserImages error:", err);
        throw err;
    }
}