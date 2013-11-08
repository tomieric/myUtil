<?php
	//$img = $_POST['pic'];
    $dir = 'upload/';
    $uploadfile = $dir . basename($_FILES['img']['name']);
    if(move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile)){
        echo '{status: 1, msg: "success", file: "'. addslashes($uploadfile) .'"}';
    }else{
        echo '{status: 0, msg: "fail", file: ""}';
    }