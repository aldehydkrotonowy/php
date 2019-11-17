<?php

	require_once 'connection_MySQL.php';
	$userTable = 'useraccounts';
	$dbLink = new mysqli($host, $dbLogin, $dbPassword, $dbName);
	if($dbLink->connect_errno != 0){
		echo "Error: Unable to connect to MySQL.";
    echo "<b>Error number: </b>" . mysqli_connect_errno()."</br>";
    exit;
	}else {
		$decoded_str = json_decode(file_get_contents('php://input'));
		$input_array = explode(' ', $decoded_str);
		//preventing sql injection
		$idIn = '';
		$nameIn = $input_array[0];
		$surnameIn = $input_array[1];
		$ageIn = $input_array[2];
		$emailIn = $input_array[3];
		$loginIn = $input_array[4];
		$passwordIn = $input_array[5];
		if($nameIn!=''&&$surnameIn!=''&&$ageIn!=''&&$emailIn!=''&&$loginIn!=''&&$passwordIn!=''){
			$stmt = $dbLink->prepare("SELECT * FROM useraccounts WHERE login=? OR email=?");
			if ( false===$stmt ) {
			  die('prepare() failed: '.htmlspecialchars($dbLink->error));
			}
			$rc = $stmt->bind_param('ss', $loginIn, $emailIn);
			if ( false===$rc ) {

			  die('bind_param() failed: '.htmlspecialchars($stmt->error));
			}
			$rc = $stmt->execute();
			if ( false===$rc ) {
			  die('execute() failed: '.htmlspecialchars($stmt->error));
			}
			$result = $stmt->get_result();
			$row_count = $result->num_rows;		
			if($row_count>0){
				$row = $result->fetch_assoc();
				if($row['login']==$loginIn){
					echo 'loginInUse';
					exit;
				}
				if ($row['email']==$emailIn){
					echo 'emailInUse';
					exit;
				}
			}else{
				$stmt = $dbLink->prepare("INSERT INTO useraccounts (id, name, surname, age, email, login, password, date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
				$stmt->bind_param('sssssss', $idIn, $nameIn, $surnameIn, $ageIn, $emailIn, $loginIn, $passwordIn);
				$stmt->execute();
				echo 'newUserAdded';
				exit;
				if(!$stmt){
					echo "cannot add new user ".mysqli_error($dbLink);
					exit;
				}
			}
		}
		$stmt->close();
		$dbLink->close();
	}
?>