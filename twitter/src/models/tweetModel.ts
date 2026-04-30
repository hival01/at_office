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
                t.image_url,
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

export async function addTweet(userId: number, content: string, imageUrl: string | null) {
    const connection = await db.getConnection();

    await connection.execute(
        `INSERT INTO tweets (user_id, content, image_url) VALUES (?, ?, ?)`,
        [userId, content, imageUrl]
    );

    connection.release();
}


export async function getAllTweets() {
    const connection = await db.getConnection();
    console.log("in database to get tweet");
    const [rows]: any = await connection.execute(`
        SELECT tweets.*, users.username, users.profile_pic_url
        FROM tweets
        JOIN users ON tweets.user_id = users.id
        ORDER BY tweets.created_at DESC
    `);

    connection.release();
    return rows;
}
