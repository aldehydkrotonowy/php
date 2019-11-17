<?php
	session_start();
	require_once 'connection_MySQL.php';
	$el = "<br>";
	$userTable = 'useraccounts';
	$dbLink = new mysqli($host, $dbLogin, $dbPassword, $dbName);
	if($dbLink->connect_errno != 0){
		echo "Error: Unable to connect to MySQL.";
    echo "<b>Error number: </b>" . mysqli_connect_errno()."</br>";
    exit;
	}
	//read-only stream that allows you to read raw data from the request body.
	$decode_str = json_decode(file_get_contents('php://input'));
	//put into array using space as a delimiter 
	$logPassArray = explode(' ', $decode_str);
	//login at first position
	$loginIn = $logPassArray[0];
	//password at second position in array
	$passwordIn = $logPassArray[1];
	//preapre statement for db
	if($loginIn!='' && $passwordIn!='') {
		$stmt=$dbLink->prepare("SELECT * FROM useraccounts WHERE login=? AND password=?");
		$stmt->bind_param('ss', $loginIn, $passwordIn);
		$stmt->execute();	
		$result = $stmt->get_result();
		/* now you can fetch the results into an array */
		$myrow = $result->fetch_assoc();
		if($myrow['login']==$loginIn && $myrow['password']==$passwordIn){		
			echo $loginerror = 'OK_GO';
		}else if($myrow['login']!=$loginIn || $myrow['password']!=$passwordIn) {
			$loginerror = 'NOT_OK';
			echo $loginerror;
		}else{
			echo $dbLink->connect_errno;
		}
		$stmt->close();
	}else{
		$loginerror = 'NOT_OK';
		echo $loginerror;
	}	
	
	$dbLink->close();
?>