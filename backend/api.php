<?php
// Chỉ cần giữ lại một bộ header chuẩn này là đủ để sửa lỗi CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { 
    http_response_code(200); 
    exit(); 
}


// --- THAY THÔNG TIN CỦA BẠN VÀO ĐÂY ---
$host = "sql100.infinityfree.com"; // Thay Host Name
$user = "if0_40711936";            // Thay User Name
$pass = "ROA04PmNoz";       // Thay Password
$db   = "if0_40711936_qlsv";       // Thay Database Name
// -------------------------------------

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) { die(json_encode(["error" => "Lỗi kết nối: " . $conn->connect_error])); }

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET': // Lấy danh sách
        $result = $conn->query("SELECT * FROM students ORDER BY id DESC");
        $data = [];
        while($row = $result->fetch_assoc()) { $data[] = $row; }
        echo json_encode($data);
        break;

    case 'POST': // Thêm mới
        $name = $input['name']; $mssv = $input['mssv']; $class = $input['class_name'];
        $conn->query("INSERT INTO students (name, mssv, class_name) VALUES ('$name', '$mssv', '$class')");
        echo json_encode(["message" => "Đã thêm thành công!"]);
        break;

    case 'DELETE': // Xóa
        $id = $_GET['id'];
        $conn->query("DELETE FROM students WHERE id=$id");
        echo json_encode(["message" => "Đã xóa!"]);
        break;
}
$conn->close();
?>