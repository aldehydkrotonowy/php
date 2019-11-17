$(document).on('click', "#loginButton", function(){
	if (document.getElementById('loginFeild')){
		var parent = document.getElementById('loginForm');
		var child = document.getElementById('loginFeild');
		parent.removeChild(child);			
	}
	var login = document.getElementById('textinput').value;
	var passw = document.getElementById('password').value;
	//TODO sprawdzić czy inputy nie są puste bo przenosi na stronę główną
	var toSend = login+" "+passw;		
	var strLogin_json = JSON.stringify(toSend);
	request= new XMLHttpRequest();		
	request.open("POST", "./php/login.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			//console.log("request.responseText= "+request.responseText);				
			if(request.responseText == 'OK_GO'){
				window.location = "./views/appMainPage.html";
			}else{
				//dynamic div for incorrect login/password message
				var infoDiv = document.createElement('div');
				infoDiv.setAttribute('id', 'loginFeild');
				infoDiv.innerHTML = "login or password incorrect";
				document.getElementById('loginForm').appendChild(infoDiv);
			}
		};
	};		
	request.send(strLogin_json);
});//end $(document).on('click', "#loginButton", function(){
