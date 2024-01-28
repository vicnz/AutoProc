INSERT
  IGNORE INTO notifications (
    id,
    title,
    description,
    source,
    content,
    type,
    updatedAt
  )
SELECT
  id,
  "Delivery Deadline for Item" AS title,
  concat(
    "Deadline For Purchase Request Number ",
    number,
    " at ",
    DATE_FORMAT(NOW(), '%b %d, %Y')
  ) AS description,
  id AS source,
  concat('{"ref":"', id, '","type":"delivery"}') AS content,
  "delivery" AS type,
  CURRENT_TIMESTAMP AS updatedAt
FROM
  (
    SELECT
      purchase_requests.id AS id,
      purchase_requests.number AS number
    FROM
      delivery
      INNER JOIN purchase_requests ON delivery.prId = purchase_requests.id
    WHERE
      delivery.endDate >= CURDATE()
      AND delivery.endDate < CURDATE() + INTERVAL 1 DAY
    ORDER BY
      delivery.createdAt DESC
    LIMIT
      25
  ) AS temp_delivery;