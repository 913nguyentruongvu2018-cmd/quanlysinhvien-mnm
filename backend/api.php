<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

// CẬP NHẬT THEO ẢNH MỚI NHẤT
$host = "sql100.infinityfree.com"; 
$user = "if0_40711936"; 
$pass = "ROA04PmNoz"; 
$db   = "if0_40711936_qlsv";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Lỗi kết nối sql100"]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM students ORDER BY id DESC");
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("INSERT INTO students (name, mssv, class_name) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $data['name'], $data['mssv'], $data['class_name']);
        $stmt->execute();
        echo json_encode(["status" => "success"]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE students SET name=?, mssv=?, class_name=? WHERE id=?");
        $stmt->bind_param("sssi", $data['name'], $data['mssv'], $data['class_name'], $data['id']);
        $stmt->execute();
        echo json_encode(["status" => "success"]);
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $conn->query("DELETE FROM students WHERE id = $id");
        echo json_encode(["status" => "success"]);
        break;
}
$conn->close();
?>