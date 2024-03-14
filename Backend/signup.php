<?php
include('connection.php');

$username = $_POST['username'];
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_user = $mysqli->prepare('select username, email 
    from users 
    where username=? or email=?');
$check_user->bind_param('ss', $username, $email);
$check_user->execute();
$check_user->store_result();
$email_exists = $check_user->num_rows();

if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(username,name,email,password) values(?,?,?,?);');
    $query->bind_param('ssss', $username, $name, $email, $hashed_password);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "User $name was created successfully";
} else {
    $response["status"] = "user already exists";
    $response["message"] = "User $name wasn't created";
}
echo json_encode($response);
