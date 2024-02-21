-- database: forum.db
SELECT DISTINCT id_user,username,pp,
	(
	SELECT count(*) FROM Messages 
	where Messages.receiver ="@sniang"
	and Messages.sender = u.username
	and Messages.isread = false
	) as unreadCounter
	FROM "users"  u, "Messages"
	LEFT JOIN (
		SELECT receiver AS r , sender as s , MAX(timestamp) AS last_message_date
		FROM Messages
		GROUP BY receiver
	) AS last_messages
	 ON concat("@", u.username) = last_messages.r 
	 or last_messages.s = u.username
	 WHERE (
	   ( Messages.receiver = concat("@", "sniang") and Messages.sender = u.username )
		OR 
		(Messages.receiver = concat("@", u.username) and Messages.sender = "sniang")
		)
	
	 ORDER by last_messages.last_message_date DESC;
	
    SELECT DISTINCT id_user,username,pp
FROM "users"  u, "Messages"
LEFT JOIN (
    SELECT receiver AS r , sender as s
    FROM Messages
    GROUP BY receiver
) AS last_messages
 ON concat("@", u.username) != last_messages.r 
 or last_messages.s != u.username
WHERE NOT EXISTS (
    SELECT 1
    FROM Messages
    WHERE 
    (receiver = CONCAT("@", u.username) AND sender = "%s") 
    OR 
    (sender =username  AND receiver = "@%s")
)

 ORDER by username ASC;