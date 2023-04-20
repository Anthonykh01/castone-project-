<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Replace with your own database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shoppingapp";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

// Check if the email already exists
$email = $data->email;
$checkEmail = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($checkEmail);

if ($result->num_rows > 0) {
  echo json_encode(["message" => "Email already exists."]);
  exit();
}

// Insert a new user
$password = password_hash($data->password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (email, password) VALUES ( '$email', '$password')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["message" => "User registered successfully."]);
} else {
  echo json_encode(["message" => "Error: " . $sql . " " . $conn->error]);
}

$conn->close();
?>
