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
  $product_id = $data->product_id;

  // Check if the user has an existing cart
  $cart_query = "SELECT id FROM carts WHERE user_id = '$user_id'";
  $cart_result = mysqli_query($conn, $cart_query);
  $cart_row = mysqli_fetch_assoc($cart_result);

  $response = array();

  // If there's no cart for the user, create one
  if (!$cart_row) {
    $create_cart_query = "INSERT INTO carts (user_id) VALUES ('$user_id')";
    if (mysqli_query($conn, $create_cart_query)) {
      $cart_id = mysqli_insert_id($conn);
      $response["debug"] = "Cart created with ID: $cart_id";
    } else {
      $response["debug"] = "Failed to create cart.";
      $response["error"] = mysqli_error($conn);
      echo json_encode($response);
      exit();
    }
  } else {
    $cart_id = $cart_row['id'];
    $response["debug"] = "Found existing cart with ID: $cart_id";
  }

  // Add the item to the cart_items table
  $sql = "INSERT INTO cart_items (cart_id, product_id) VALUES ('$cart_id', '$product_id')";
  $result = mysqli_query($conn, $sql);

  if ($result) {
    $response["message"] = "Item added to cart.";
  } else {
    $response["message"] = "Failed to add item to cart.";
    $response["error"] = mysqli_error($conn);
  }

  echo json_encode($response);
}

mysqli_close($conn);
?>
