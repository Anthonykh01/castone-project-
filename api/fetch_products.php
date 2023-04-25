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

$sql = "SELECT * FROM products ORDER BY category";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  $products = array();
  while ($row = mysqli_fetch_assoc($result)) {
    if (!isset($products[$row["category"]])) {
      $products[$row["category"]] = array();
    }
    array_push($products[$row["category"]], $row);
  }
  echo json_encode(array("categories" => $products));
} else {
  echo json_encode(array("message" => "No products found."));
}

mysqli_close($conn);
?>
