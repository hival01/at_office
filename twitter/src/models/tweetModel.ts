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

export async function getAllTweets(userId: number) {
    const connection = await db.getConnection();

    // SELECT 
    //     t.*,
    //     u.username,
    //     u.profile_pic_url,

    //     COUNT( l.tweet_id) AS like_count,
    //     COUNT(DISTINCT c.comment_id) AS comment_count,


    //     MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS is_liked

    // FROM tweets t
    // JOIN users u ON t.user_id = u.id
    // LEFT JOIN likes l ON t.tweet_id = l.tweet_id
    // left join comments c on t.tweet_id = c.tweet_id

    // GROUP BY t.tweet_id
    // ORDER BY t.created_at DESC
    const [rows]: any = await connection.execute(`

        SELECT 
          t.*,
          u.username,
          u.profile_pic_url,

          -- ✅ correct like count
          (SELECT COUNT(*) FROM likes WHERE tweet_id = t.tweet_id) AS like_count,

          -- ✅ correct comment count
          (SELECT COUNT(*) FROM comments WHERE tweet_id = t.tweet_id) AS comment_count,

          -- ✅ correct like state
          EXISTS (
              SELECT 1 FROM likes 
              WHERE tweet_id = t.tweet_id AND user_id = ?
          ) AS is_liked

          FROM tweets t
          JOIN users u ON t.user_id = u.id

          ORDER BY t.created_at DESC;
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


//add comment into db
export async function addComment(
  tweetId: number,
  userId: number,
  content: string,
  parentCommentId: number | null = null
) {
  const conn = await db.getConnection();

  await conn.execute(
    `INSERT INTO comments (tweet_id, user_id, content, parent_comment_id)
     VALUES (?, ?, ?, ?)`,
    [tweetId, userId, content, parentCommentId]
  );

  conn.release();
}


//get comments from database for perticuler tweet
export async function getCommentsByTweet(tweetId: number) {
  const conn = await db.getConnection();

  const [rows]: any = await conn.execute(
    `
    SELECT 
      c.comment_id,
      c.content,
      c.created_at,
      c.parent_comment_id,
      c.tweet_id,
      u.username,
      u.profile_pic_url
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.tweet_id = ?
    ORDER BY c.created_at ASC
    `,
    [tweetId]
  );

  conn.release();
  // 🔥 Convert flat list → tree
    const map: any = {};
    const roots: any[] = [];

    rows.forEach((c: any) => {
      c.replies = [];
      map[c.comment_id] = c;
    });

    // After this step:
    // map = {
    //   1: { id:1, replies: [] },
    //   2: { id:2, replies: [] },
    //   3: { id:3, replies: [] },
    //   4: { id:4, replies: [] }
    // }

    rows.forEach((c: any) => {
      if (c.parent_comment_id) {
        map[c.parent_comment_id]?.replies.push(c);
      } else {
        roots.push(c);
      }
    });
    // FINAL STRUCTURE
    // roots = [
    //     {
    //       id: 1,
    //       replies: [
    //         {
    //           id: 2,
    //           replies: [
    //             { id: 4, replies: [] }
    //           ]
    //         },
    //         {
    //           id: 3,
    //           replies: []
    //         }
    //       ]
    //     }
    //   ]

    return roots;

}


//get comment count foir perticuler tweet
export async function getCommentCount(tweetId: number) {
  const conn = await db.getConnection();

  const [rows]: any = await conn.execute(
    `SELECT COUNT(*) as count FROM comments WHERE tweet_id = ?`,
    [tweetId]
  );

  conn.release();
  return rows[0].count;
}