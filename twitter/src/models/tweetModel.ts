import db from "../config/db";

/**
 * Get all main tweets of a user
 */
export async function getTweetsByUser(userId: number) {
    try {
        const connection = await db.getConnection();

        const query = `
            SELECT 
                t.tweet_id,
                t.content,
                t.created_at,
                u.username,
                u.profile_pic_url
            FROM tweets t
            JOIN users u ON t.user_id = u.id
            WHERE t.user_id = ? AND t.parent_id IS NULL
            ORDER BY t.created_at DESC
        `;

        const [rows]: any = await connection.execute(query, [userId]);
        connection.release();

        return rows;
    } catch (err) {
        console.log("getTweetsByUser error:", err);
        throw err;
    }
}