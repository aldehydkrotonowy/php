(function(window, $){
	'use strict';
	function define_library(){
		var mylib = {};	
		//this function was design to remove elements in table body (calendar project)
		// but in this shape is no longer in use. I put it here as reminder
		//----------------------------------------------------clearTableBody
		mylib.clearTBody = function(){		
			var tds = document.querySelectorAll('tbody td'), i;
			var events = document.getElementsByClassName('event');
			for (i=0; i<tds.length; i++){	
				recurse(tds[i]);
			}
			function recurse(element){
				if(element.childNodes.length>0){ //if children are present		
					for(var j=0; j<element.childNodes.length; j++){//then for every children...
						var child = element.childNodes[j];
						//check if this is div.event...
						if(element.childNodes[j].className === 'event draggable ui-draggable ui-draggable-handle'){
							//if so, remove it
							element.removeChild(child);
							//now in table is one element less, so:
							j--;
						}else{
							//go deepeer
							recurse(element.childNodes[j]);
						}					
					}
				}
				if(element.nodeType === Node.TEXT_NODE && element.nodeValue !== ''){
					element.nodeValue = "";
				}

			}
		}	
		mylib.createMessage = function (fieldLabel, messageText, cssMessage){
			// all parameters as a strings
			// fieldLabel : label of input field Name, Age etc.	
			// message : message for user		
			// cssMessage : your css style for message if needed;
			//					here: info-ok|info-error 	
			var parentDiv = document.createElement('div');
			var spaceDiv = document.createElement('div');
			var infoDiv = document.createElement('div');
			var formGroup = document.getElementById('form-group-'+fieldLabel);
			//add class attribute to parent div
			parentDiv.setAttribute('class', 'form-group');
			var parentDivID = 'parent'+fieldLabel;
			//and set id attribute
			parentDiv.setAttribute('id', parentDivID);
			//helper div
			spaceDiv.setAttribute('class', 'col-md-4');
			//div for the message text
			if(cssMessage!=null && cssMessage!=''){
				infoDiv.setAttribute('class', 'col-md-6 input-group '+cssMessage);
			}else{
				infoDiv.setAttribute('class', 'col-md-6 input-group');
			}
			//prepare id attribute for div element with message text
			var infoDivID = fieldLabel+'InfoDiv';//ageInfoDiv
			infoDiv.setAttribute('id', infoDivID);
			if(messageText!=null && messageText!=''){
				infoDiv.innerHTML = messageText;
			}	
			parentDiv.appendChild(spaceDiv);
			parentDiv.appendChild(infoDiv);//form-group-fieldLabel
			formGroup.appendChild(parentDiv);
		}
		mylib.removeMessage = function(fieldLabel){
			//	fieldLabel : label of input field Name, Age etc.
			var parent = document.getElementById('form-group-'+fieldLabel);
			var child = document.getElementById('parent'+fieldLabel);
			if(child){
				parent.removeChild(child);
			}
		}
		mylib.addGlyphicon = function(fieldLabel, glyphName, formClass){
			// fieldLabel : label of input field 'name', 'age' etc.
			// glyphName : ok, remove; gives glyphicon-ok, glyphicon-remove etc
			// formClass : bootstrap class = has-error or has-succes 
			// all parameters as a strings
			var glyphSpanElementID = 's_'+fieldLabel+'WorningInfoGlyph';
			var glyphSpanElement = document.getElementById(glyphSpanElementID);
			glyphSpanElement.setAttribute('class', 'glyphicon glyphicon-'+glyphName+' form-control-feedback');
			var formGroupElement = document.getElementById('form-group-'+fieldLabel);
			formGroupElement.setAttribute('class', 'form-group '+formClass+' has-feedback');	
		}
		mylib.removeGlyphicon = function(fieldLabel){
			// fieldLabel : label of input field 'name', 'age' etc.
			var glyphSpanElementID = 's_'+fieldLabel+'WorningInfoGlyph';
			var glyphSpanElement = document.getElementById(glyphSpanElementID);
			glyphSpanElement.setAttribute('class', '');
			var formGroupElement = document.getElementById('form-group-'+fieldLabel);
			formGroupElement.setAttribute('class', 'form-group');
		}
		mylib.createCallendar = function(cellW, cellH, tPart, bColor){
			// @string cellW - cell width
			// @string cellH - cell height
			// @string appendToID - id of target HTML div
	      var tablePart = document.createElement(tPart);  
	      var date = new Date();
			var currentYear = date.getFullYear();
			var currentMonth = date.getMonth();
			var ndays = new Date(currentYear, currentMonth, 0).getDate();
			while(ndays){
				var i = Math.min(ndays, 7);
				var row = document.createElement('tr');
				while(i){
					var cell = document.createElement('td');
					cell.style.width = cellW;
					cell.style.height = cellH;
					cell.style.border = '1px solid '+bColor;
					row.appendChild(cell);
					i--;
					ndays--;
					console.log('all ok');
					if(i==0){
					  tablePart.appendChild(row);
					}
				}
			}
	      return tablePart;
	   }
		mylib.createTablePart = function(rows, cols, cellW, cellH, tPart, bColor){
	      //@int rows - number of rows
	      //@int cols - number of columns
	      //@string cellW - cell width
	      //@string cellH - cell height
	      //@string tablePart - part of table: thead, tfoot, tbody
	      //@string bColor - color of table border
	      //usage: var tHead = createTablePart(1, 7, '50px', '30px', 'thead', 'red');
	      var tablePart = document.createElement(tPart);
	      var cellNum = 0;
	      for(var i=1; i<=rows; i++){
	       var row = document.createElement('tr');
	       for(var j=1; j<=cols; j++){
	       	cellNum++;
	         var cell = document.createElement('td');
	         cell.style.width = cellW;
	         cell.style.height = cellH;
	         cell.style.border = '1px solid '+bColor;
	         row.appendChild(cell);
	       }
	       tablePart.appendChild(row);           
	      }
	      return tablePart;
	   }
		mylib.deployMonths = function(userYear, userMonth){
			initializeCells(generateCellsID(userYear, userMonth));
			setMonthClasses(userYear, userMonth);
			function generateCellsID(userYear, userMonth){
			  var userMonthFirstDay = new Date(userYear, userMonth, 1);
			  var dayOfTheWeek = userMonthFirstDay.getDay();
			  var daysInPreviousMonth = new Date(userYear, userMonth, 0).getDate();
			  var daysInCurrentsMonth = new Date(userYear, userMonth+1, 0).getDate();
			  var emptyBefore = 7+dayOfTheWeek-1;
			  var emptyAfter = 49 - emptyBefore - daysInCurrentsMonth;
			  var previousStart = daysInPreviousMonth - emptyBefore + 1;
			  var tab = [];
			  for(var i=previousStart; i<=daysInPreviousMonth; i++){
			    var id = new Date(userYear, userMonth-1, i).toLocaleDateString();
			    tab.push(id);
			  }
			  for(var i=1; i<=daysInCurrentsMonth; i++){
			    var id = new Date(userYear, userMonth, i).toLocaleDateString();
			    tab.push(id);
			  }
			  for(var i=1; i<=emptyAfter; i++){
			    var id = new Date(userYear, userMonth+1, i).toLocaleDateString();
			    tab.push(id);
			  }
			  return tab;
			}
			function initializeCells(idTab){
			  var tds = document.querySelectorAll('#calndarTable tbody td');
			  for(var i=0; i<tds.length; i++){
			    // set cell id
			    var splitedData = idTab[i].split('.');
			    tds[i].setAttribute('id', idTab[i]);
			    // append day number div
			    var dayNum = document.createElement('div');
			    dayNum.setAttribute('class', 'dayNumber');
			    dayNum.innerHTML = splitedData[0];
			    tds[i].appendChild(dayNum);
			  }
			}
			function setMonthClasses(userYear, userMonth){
			  var previous = new Date(userYear, userMonth-1, 1).toLocaleDateString();
			  var current = new Date(userYear, userMonth, 1).toLocaleDateString();
			  var next = new Date(userYear, userMonth+1, 1).toLocaleDateString();
			  var tds = document.querySelectorAll('tbody td');
			  for(var i=0; i<tds.length; i++){
			    var id = tds[i].id;
			    if(id.split('.')[1] === previous.split('.')[1]){
			      tds[i].setAttribute('class', 'previousMonth');
			    }else if(id.split('.')[1] === current.split('.')[1]){
			      tds[i].setAttribute('class', 'currentMonth');
			    }else if(id.split('.')[1] === next.split('.')[1]){
			      tds[i].setAttribute('class', 'nextMonth');
			    }
			  }
			}
		}


		return mylib;
	}
	if(typeof(mylib) ==='undefined'){
		window.mylib = define_library();
	}else{
		console.log('library named mylib already defined');
	}
})(window, jQuery)