<?php
include('connection.php');

$user_id = (int) $_POST['user_id'];

$query = $mysqli->prepare('select id, title, completed, user_id from todos where user_id=?');
$query->bind_param('i', $user_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no todos found';
} else {
    $todos = [];
    $query->bind_result($todo_id, $title, $completed, $user_id);
    while ($query->fetch()) {
        $todo = [
            'todo_id' => $todo_id,
            'title' => $title,
            'completed' => $completed
        ];
        $todos[] = $todo;
    }
    $response['status'] = 'success';
    $response['todos'] = $todos;
}

echo json_encode($response);