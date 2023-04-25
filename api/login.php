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
  die("Connection failed: " . $conn->connect_error);
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  
  if (password_verify($password, $row["password"])) {
    // Prepare the response with the email and a success message
    $response = [
        'message' => 'Login successful.',
        'email' => $row['email'],
        'id' => $row['id']
    ];
  } else {
    $response = [
        'message' => 'Incorrect password.'
    ];
  }
} else {
  $response = [
      'message' => 'Email does not exist.'
  ];
}

// Send the JSON response
echo json_encode($response);

$conn->close();
?>
