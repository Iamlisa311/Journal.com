<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['title']) && !empty($data['content'])) {
  $stmt = $pdo->prepare("INSERT INTO posts (title, content, created_at) VALUES (?, ?, NOW())");
  $stmt->execute([$data['title'], $data['content']]);
  echo json_encode(['message' => 'Post added successfully!']);
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Title and content are required.']);
}
?>





