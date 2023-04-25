<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $data = json_decode(file_get_contents("php://input"));

  $user_id = $data->user_id;

  $sql = "SELECT ci.id, p.name, p.price, ci.quantity FROM cart_items ci JOIN carts c ON ci.cart_id = c.id JOIN products p ON ci.product_id = p.id WHERE c.user_id = '$user_id'";
  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) > 0) {
    $cart_items = array();
    while ($row = mysqli_fetch_assoc($result)) {
      array_push($cart_items, $row);
    }
    echo json_encode(array("cart_items" => $cart_items));
  } else {
    echo json_encode(array("message" => "No cart items found."));
  }
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
mysqli_close($conn);
?>
