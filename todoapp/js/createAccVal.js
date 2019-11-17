(function(){
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/***clear createAccountForm when "I want create Account" button is pressed***/
	var formOK = true;

	var b_createAcc = document.getElementById('b_createAcc');	
	b_createAcc.addEventListener('click', function(){
		document.getElementById('userPassword').value = "";
		document.getElementById('userPasswConfirm').value = "";
		document.getElementById('s_passwordWorningInfoGlyph').setAttribute('class', '');
		document.getElementById('form-group-password').setAttribute('class', 'form-group');
		document.getElementById('form-group-confirmPass').setAttribute('class', 'form-group');
		mylib.removeMessage('confirmPass');
		mylib.removeGlyphicon('confirmPass');
	}, false);//endb_createAcc.addEventListener('click', function(){
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check if password are the same**********/
	document.addEventListener('keyup', function(){
		var userPasswIn = document.getElementById('userPassword');
		var userPasswConfirmIn = document.getElementById('userPasswConfirm');
		if(userPasswIn.value == userPasswConfirmIn.value){
			if(userPasswIn.value!='' && userPasswConfirmIn.value!=''){
				mylib.removeMessage('confirmPass');
				mylib.createMessage('confirmPass', 'passwords the same', 'info-ok');
				mylib.addGlyphicon('confirmPass', 'ok', 'has-success');
				formOK = true;
			}else 	if(userPasswIn.value=='' && userPasswConfirmIn.value==''){
					mylib.removeMessage('confirmPass');
					mylib.removeGlyphicon('confirmPass');
					formOK = false;
			}
		}else{
			mylib.removeMessage('confirmPass');
			mylib.createMessage('confirmPass', 'passwords not the same', 'info-error');
			mylib.removeGlyphicon('confirmPass');
			mylib.addGlyphicon('confirmPass', 'remove', 'has-error');
			formOK = false;
		}		
	}, false);//$(document).on('keyup', '#userPasswConfirm', function(){{	
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check name input field**********/
	$('#userName').bind('click keyup change', function(event) {
		var userNameIn = document.getElementById('userName');
		//if in the name input string is empty
			if(userNameIn.value!='' && (userNameIn.value.length < 2 || userNameIn.value.length > 20)){
				mylib.removeMessage('name');
				mylib.createMessage('name', 'Name must have betwene 2 and 20 characters', 'info-error');
				mylib.removeGlyphicon('name');
				formOK = false;
			}else 	if(userNameIn.value==''){
					mylib.removeMessage('name');
					mylib.createMessage('name', 'Enter your name!', 'info-error');
					mylib.removeGlyphicon('name');
					formOK = false;
			}else{
					mylib.removeMessage('name');
					mylib.addGlyphicon('name', 'ok', 'has-success');
					formOK = true;
			}
	})//$('#userName').bind('click keyup change', function(event) {
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check surname input field**********/
	$('#userSurname').bind('click keyup change', function(event) {
		var userSurnameIn = document.getElementById('userSurname');
		//if in the surname input string is empty
			if(userSurnameIn.value!='' && (userSurnameIn.value.length < 2 || userSurnameIn.value.length > 20)){
				mylib.removeMessage('surname');
				mylib.createMessage('surname', 'Name must have betwene 2 and 20 characters', 'info-error');
				formOK = false;
				mylib.removeGlyphicon('surname');
			}else 	if(userSurnameIn.value==''){
					mylib.removeMessage('surname');
					mylib.createMessage('surname', 'Enter your surname!', 'info-error');
					mylib.removeGlyphicon('surname');
					formOK = false;
			}else{
					mylib.removeMessage('surname');
					mylib.addGlyphicon('surname', 'ok', 'has-success');
					formOK = true;
			}
	})//$('#userSurname').bind('click keyup change', function(event) {
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check age input field**********/
	$(document).on('keyup', '#userAge', function(){
		var userAgeIn = document.getElementById('userAge');
		var ageAsNumber = Number(userAgeIn.value);
		//if in the age input string is empty
			if(userAgeIn.value==''){
				//remove warnings if exist, if not exist notching happens
				mylib.removeMessage('age');
				mylib.createMessage('age', 'Enter your age!', 'info-error');
				mylib.removeGlyphicon('age');
			}
			if(userAgeIn.value!=''){
				if(isNaN(ageAsNumber)){
					mylib.removeMessage('age');
					mylib.createMessage('age', 'Age must be a number!', 'info-error');
					mylib.removeGlyphicon('age');
					formOK = false;
				}else 	if(ageAsNumber>99 || ageAsNumber<5){
					mylib.removeMessage('age');
					mylib.createMessage('age', 'Enter correct age!', 'info-error');
					mylib.removeGlyphicon('age');
					formOK = false;
				}else{
					mylib.removeMessage('age');
					mylib.addGlyphicon('age', 'ok', 'has-success');
					formOK = true;
				}			
			}
	});//$(document).on('keyup', '#userAge', function(){
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check email input field**********/
	$('#userEmail').bind('click keyup change', function(event) {
		var userEmailIn = document.getElementById('userEmail');
		//if in the email input string is empty
			var emailRegExpPattern = /^[^\.][\S]+\w@(((\w){1,15}\.\w{2,3})|((\w{1,20}\.){1,4}\w{2,3}))$/;
			var result = emailRegExpPattern.test(userEmailIn.value);
			if(!result){
				mylib.removeMessage('email');
				mylib.createMessage('email', 'Enter correct email', 'info-error');
				mylib.removeGlyphicon('email');
				formOK = false;
			}else 	if(userEmailIn.value==''){
					mylib.removeMessage('email');
					mylib.createMessage('email', 'Enter your email!', 'info-error');
					mylib.removeGlyphicon('email');
					formOK = false;
			}else{
					mylib.removeMessage('email');
					mylib.addGlyphicon('email', 'ok', 'has-success');
					formOK = true;
			}
	})//$('#userEmail').bind('click keyup change', function(event) {
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check login input field**********/
	$(document).on('keyup', '#userLogin', function(){
		var userLoginIn = document.getElementById('userLogin');
		//if in the login input string is empty
			var loginRegExpPattern = /^[\w\.\+-]{3,20}$/;
			var result = loginRegExpPattern.test(userLoginIn.value);
			if(!result){
				mylib.removeMessage('login');
				mylib.createMessage('login', 'Enter 3 to 20 characters [a-z A-Z 0-9 . - +]', 'info-error');
				mylib.removeGlyphicon('login');
				formOK = false;
			}else{
				mylib.removeMessage('login');
				mylib.addGlyphicon('login', 'ok', 'has-success');
				formOK = true;
			}
	});//$(document).on('keyup', '#userLogin', function(){{
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check password input field**********/
	$(document).on('keyup', '#userPassword', function(){
		//userPassword is a name of password input HTML element 
		var userPasswIn = document.getElementById('userPassword');
		var passwordRegExpPattern = /^[\w\.\+\-\!\@\#\$\%\^\&\*\(\)\{\}\[\]]{8,20}$/;
		var result = passwordRegExpPattern.test(userPasswIn.value);
		if(!result){
			mylib.removeMessage('password');
			mylib.createMessage('password', 'Enter 8 to 20 characters', 'info-error');
			mylib.removeGlyphicon('password');
			formOK = false;
		}else 	if(userPasswIn.value==''){
				mylib.removeMessage('password');
				mylib.createMessage('password', 'Enter your password!', 'info-error');
				mylib.removeGlyphicon('password');
				formOK = false;
		}else{
				mylib.removeMessage('password');
				mylib.addGlyphicon('password', 'ok', 'has-success');
				formOK = true;
		}
	});//$(document).on('keyup', '#userPassw', function(){{
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------
	/******check password input field**********/
	var createAccButt = document.getElementById('createAccButt');	
	createAccButt.addEventListener('click', function(){
		if(formOK){
			var name = document.getElementById('userName').value;
			var surname = document.getElementById('userSurname').value;
			var age = document.getElementById('userAge').value;
			var email = document.getElementById('userEmail').value;
			var login = document.getElementById('userLogin').value;
			var password = document.getElementById('userPassword').value;
			var dataToSend = name+" "+surname+" "+age+" "+email+" "+login+" "+password;
			var data_json = JSON.stringify(dataToSend);
			var request = new XMLHttpRequest;
			request.open('POST', './php/createAccount.php', true);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.onreadystatechange = function(){
				if(request.readyState == 4 && request.status == 200){
					console.log("request.responseText= "+request.responseText);	
					if(request.responseText == 'loginInUse'){
						mylib.removeMessage('login');
						mylib.createMessage('login', 'This login is in use', 'info-error');
						mylib.removeGlyphicon('login');
						formOK = false;
					}else if(request.responseText == 'emailInUse'){
						mylib.removeMessage('email');
						mylib.createMessage('email', 'Email in use', 'info-error');
						mylib.removeGlyphicon('email');
						formOK = false;
					}else{
						window.location = "./views/appMainPage.php";
					}
				}
			};
			request.send(data_json);
		}
	}, false)
})()