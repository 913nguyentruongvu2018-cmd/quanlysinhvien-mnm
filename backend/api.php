<?php
// Cấu hình Database
$host = "sql100.infinityfree.com"; 
$user = "if0_40711936"; 
$pass = "ROA04PmNoz"; 
$db   = "if0_40711936_qlsv"; 

$conn = new mysqli($host, $user, $pass, $db);

// Cho phép Vercel truy cập trực tiếp (Fix lỗi bị chặn)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

// Xử lý API cho Project 2 gọi sang
if (isset($_GET['api'])) {
    header('Content-Type: application/json');
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method == 'GET') {
        $res = $conn->query("SELECT * FROM students ORDER BY id DESC");
        echo json_encode($res->fetch_all(MYSQLI_ASSOC));
    } elseif ($method == 'POST') {
        $d = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("INSERT INTO students (name, mssv, class_name) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $d['name'], $d['mssv'], $d['class_name']);
        $stmt->execute();
        echo json_encode(["status" => "ok"]);
    }
    // (Thêm PUT/DELETE tương tự nếu cần)
    exit;
}
?>