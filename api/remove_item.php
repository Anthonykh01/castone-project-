<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shoppingapp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$raw_data = file_get_contents('php://input');
$json_data = json_decode($raw_data, true);

if (!isset($json_data['item_id']) || !isset($json_data['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing item_id or user_id in the request"]);
    exit;
}

$item_id = $json_data['item_id'];
$user_id = $json_data['user_id'];

// Get the cart_id for the given user_id
$cart_id_query = "SELECT id FROM carts WHERE user_id = ?";
$stmt = $conn->prepare($cart_id_query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $cart_id = $row['id'];
} else {
    echo json_encode(["status" => "error", "message" => "No cart found for the given user_id"]);
    exit;
}

// Delete the item from the cart_items table using item_id and cart_id
$stmt = $conn->prepare("DELETE FROM cart_items WHERE id = ? AND cart_id = ?");
if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}
$stmt->bind_param("ii", $item_id, $cart_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Item removed from cart"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No rows were affected. Check if the item exists in the cart"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Error removing item from cart"]);
}

$stmt->close();
$conn->close();
?>
