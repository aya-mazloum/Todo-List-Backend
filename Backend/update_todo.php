<?php
include('connection.php');

$todo_id = $_POST['todo_id'];
$title = $_POST['title'];
$completed = $_POST['completed'];

$query = $mysqli->prepare('update todos
    set title = ?, completed = ?
    where id = ?');
$query->bind_param('sii', $title, $completed, $todo_id);
$query->execute();

if ($query->affected_rows > 0) {
    $response['status'] = "success";
    $response['message'] = "Todo was updated successfully"; 
} else {
    $response['status'] = "not updated";
    $response['message'] = "No matching todo found";
}

echo json_encode($response);