<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

// THÔNG TIN MỚI TỪ ẢNH image_db6fc4.jpg
$host = "sql100.infinityfree.com"; 
$user = "if0_40711936"; 
$pass = "ROA04PmNoz"; 
$db   = "if0_40711936_exam"; // Bạn nhớ tạo database tên 'exam' trong Control Panel nhé

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Lỗi kết nối sql100"]));
}

// Giữ nguyên các phần xử lý GET, POST, PUT, DELETE bên dưới...