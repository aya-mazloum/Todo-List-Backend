<?php
include('connection.php');

$title = $_POST['title'];
$user_id = (int) $_POST['user_id'];

$query1 = $mysqli->prepare('select id
    from users
    where id=?');
$query1->bind_param('i', $user_id);
$query1->execute();
$query1->store_result();
$query1->bind_result($actual_user_id);
$query1->fetch();


$query = $mysqli->prepare('insert into todos (title, completed, user_id)
    values (?, 0, ?)');
$query->bind_param('si', $title, $actual_user_id);
$query->execute();
$response['status'] = "success";
$response['message'] = "Todo $title was created successfully";

echo json_encode($response);