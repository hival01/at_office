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


// export async function getAllTweets() {
//     const connection = await db.getConnection();
//     const [rows]: any = await connection.execute(`
//         SELECT tweets.*, users.username, users.profile_pic_url
//         FROM tweets
//         JOIN users ON tweets.user_id = users.id
//         ORDER BY tweets.created_at DESC
//     `);

//     connection.release();
//     return rows;
// }

export async function getAllTweets(userId: number) {
    const connection = await db.getConnection();

    const [rows]: any = await connection.execute(`
        SELECT 
            t.*,
            u.username,
            u.profile_pic_url,

            COUNT(l.tweet_id) AS like_count,

            MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS is_liked

        FROM tweets t
        JOIN users u ON t.user_id = u.id
        LEFT JOIN likes l ON t.tweet_id = l.tweet_id

        GROUP BY t.tweet_id
        ORDER BY t.created_at DESC
    `, [userId]);
    connection.release();
    return rows;
}

// ✅ Add Like
export async function addLike(user_id: number, tweet_id: number) {
  try {
    const connection = await db.getConnection();

    const query = `
      INSERT INTO likes (user_id, tweet_id)
      VALUES (?, ?)
    `;

    const [result] = await connection.execute(query, [user_id, tweet_id]);

    connection.release();
    return result;

  } catch (err) {
    console.error("Error in addLike:", err);
    throw err;
  }
}


// ✅ Remove Like (Unlike)
export async function removeLike(user_id: number, tweet_id: number) {
  try {
    const connection = await db.getConnection();

    const query = `
      DELETE FROM likes
      WHERE user_id = ? AND tweet_id = ?
    `;

    const [result] = await connection.execute(query, [user_id, tweet_id]);

    connection.release();
    return result;

  } catch (err) {
    console.error("Error in removeLike:", err);
    throw err;
  }
}


// ✅ Check if user already liked
export async function isLiked(user_id: number, tweet_id: number) {
  try {
    const connection = await db.getConnection();

    const query = `
      SELECT like_id FROM likes
      WHERE user_id = ? AND tweet_id = ?
      LIMIT 1
    `;

    const [rows]: any = await connection.execute(query, [user_id, tweet_id]);

    connection.release();

    return rows.length > 0;

  } catch (err) {
    console.error("Error in isLiked:", err);
    throw err;
  }
}


// ✅ Get like count of a tweet
export async function getLikeCount(tweet_id: number) {
  try {
    const connection = await db.getConnection();

    const query = `
      SELECT COUNT(*) as count
      FROM likes
      WHERE tweet_id = ?
    `;

    const [rows]: any = await connection.execute(query, [tweet_id]);

    connection.release();

    return rows[0].count;

  } catch (err) {
    console.error("Error in getLikeCount:", err);
    throw err;
  }
}



// follow user
export async function followUser(followerId: number, followingId: number) {
    const conn = await db.getConnection();
    const query = `
        INSERT INTO follows (follower_id, following_id)
        VALUES (?, ?)
    `;
    await conn.execute(query, [followerId, followingId]);
    conn.release();
}

// unfollow user
export async function unfollowUser(followerId: number, followingId: number) {
    const conn = await db.getConnection();
    const query = `
        DELETE FROM follows 
        WHERE follower_id = ? AND following_id = ?
    `;
    await conn.execute(query, [followerId, followingId]);
    conn.release();
}

// check if following
export async function isFollowing(followerId: number, followingId: number) {
    const conn = await db.getConnection();
    const [rows]: any = await conn.execute(
        `SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ?`,
        [followerId, followingId]
    );
    conn.release();
    return rows.length > 0;
}

// count followers
export async function getFollowersCount(userId: number) {
    const conn = await db.getConnection();
    const [rows]: any = await conn.execute(
        `SELECT COUNT(*) as count FROM follows WHERE following_id = ?`,
        [userId]
    );
    conn.release();
    return rows[0].count;
}

// count following
export async function getFollowingCount(userId: number) {
    const conn = await db.getConnection();
    const [rows]: any = await conn.execute(
        `SELECT COUNT(*) as count FROM follows WHERE follower_id = ?`,
        [userId]
    );
    conn.release();
    return rows[0].count;
}