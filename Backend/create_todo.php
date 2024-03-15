<?php
include('connection.php');

$title = $_POST['title'];
$user_id = $_POST['user_id'];

$query = $mysqli->prepare('insert into todos (title, completed, user_id)
    values (?, ?, ?)');
$query->bind_param('sii', $title, 0, $user_id);
$query->execute();
$response['status'] = "success";
$response['message'] = "Todo $title was created successfully";

echo json_encode($response);