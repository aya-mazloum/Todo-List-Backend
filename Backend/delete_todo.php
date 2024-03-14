<?php
include('connection.php');

$todo_id = $_POST['todo_id'];

$query = $mysqli->prepare('delete from todos where id=?');
$query->bind_param('i', $todo_id);
$query->execute();

if ($query->affected_rows > 0) {
    $response['status'] = "success";
    $response['message'] = "Todo was deleted successfully"; 
} else {
    $response['status'] = "not deleted";
    $response['message'] = "No matching todo found";
}

echo json_encode($response);