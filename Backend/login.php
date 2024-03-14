<?php
include('connection.php');

$user = $_POST['user'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id, username, name, email, password, score
    from users
    where username=? or email=?');

$query->bind_param('ss', $user, $user);
$query->execute();
$query->store_result();
$query->bind_result($id, $username, $name, $email, $hashed_password, $score);
$query->fetch();
$num_rows = $query->num_rows();

if($num_rows == 0) {
    $response['status'] = 'invalid';
    $response['message'] = 'User not found';
} else{
    if(password_verify($password, $hashed_password)) {
        $response['status'] = 'logged in';
        $response['message'] = 'User found and logged in';
        $response['user_id'] = $id;
        $response['name'] = $name;
        $response['email'] = $email;
        $response['score'] = $score;
    }else {
        $response['status'] = 'invalid';
        $response['message'] = 'Incorrect credentials';
    }
}
echo json_encode($response);