-- database: forum.db
SELECT DISTINCT id_user,username,pp,
    (
    SELECT count(*) FROM Messages
    where Messages.receiver ="@aDiallo"
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
  ( Messages.receiver = concat("@", "aDiallo") and Messages.sender = u.username )
  OR
  (Messages.receiver = concat("@", u.username) and Messages.sender = "aDiallo")
  )
ORDER by last_messages.last_message_date DESC;
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
SELECT DISTINCT id_user, username, pp
FROM "users" u
WHERE username != 'mthiaw'
AND NOT EXISTS (
    SELECT DISTINCT  1
    FROM "Messages" m
    WHERE (m.receiver = CONCAT("@", u.username) AND m.sender = 'mthiaw')
    OR (m.sender = u.username AND m.receiver = "@mthiaw")
)
ORDER BY username ASC;