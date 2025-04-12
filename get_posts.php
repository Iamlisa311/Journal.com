<?php
header('Content-Type: application/json');
include 'db.php';

$stmt = $pdo->query("SELECT * FROM posts ORDER BY created_at DESC");
$posts = $stmt->fetchAll();

echo json_encode($posts);
?>



