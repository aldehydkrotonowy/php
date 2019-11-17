(function(){
	var selectedEvent = 'family event';
	var date = new Date();
	var currentMonth = date.getMonth();
	var currentYear = date.getFullYear();
	var currentDay = date.getDate();	
	var userMonth = currentMonth;
	var userYear = currentYear;
	var rows = 7;
	var cols = 7;
	var step = 30;
	var modalDayN;
	var modalMonthN;
	var dayNamePL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	init();
	function init(){
		setTable();			
		setDayNames();
		setBannerYearMonth(currentYear, currentMonth);
		mylib.deployMonths(currentYear, currentMonth);
		highlightCurrentDay();
		makeElementsDroppable();
		
		$('#eventSelect').on('change', selectEvent);
		$('#clearTable').on('click', clearTBody);
		$('#days').on('click', getModalDay);
		$('#months').on('click', getModalMonths);
		$('#newEvent').on('change', addNewUserEvent);
	}
	function updateModalResult(){
		if(selectedEvent && modalDayN && modalMonthN !== undefined){
			var result;
			var howManyDays = new Date(2016, Number(modalMonthN), 0).getDate();
			var date = new Date(2016, Number(modalMonthN)-1, modalDayN);
			var dateStr = date.toLocaleDateString();
			var day = date.getDay();
			var dayPL = (day===0?7:day);
			if(howManyDays<modalDayN){
				result = "choose day";
			}else{
				result = selectedEvent+", "+dayNamePL[dayPL-1]+", "+dateStr;
			}			
			$('#result').html(result);
		}
	}
	function addNewUserEvent(){
		var value = $('#newEvent').val();
		$('#eventSelect').append($('<option>', {
			value: 1,
			text: value
		}));
		updateModalResult()
	}
	function getModalDay(e){
		modalDayN = Number($(e.target).attr('data-day'));
		if(modalMonthN !== undefined){
			updateModalResult()
		}		
	}
	function generateModuleDays(month){
		var trs = document.querySelectorAll('#days tr');
		
		var lastEl = trs.length-1;
		var days = new Date(2016, Number(month), 0).getDate();
		var nRows = days - 24;
		if(nRows !== 31){
			trs[lastEl].innerHTML = "";
			for(var i=1; i<=nRows; i++){
			  var el = document.createElement('td');
			  el.setAttribute('data-day', i+24);
			  el.innerHTML = i+24;
			  trs[lastEl].appendChild(el);
			}
		}
	}
	function getModalMonths(e){
		modalMonthN = $(e.target).attr('data-month');
		generateModuleDays(modalMonthN);
		updateModalResult()
	}
	function makeElementsDroppable(){
		$('.previousMonth').addClass('droppable');
		$('.currentMonth').addClass('droppable');
		$('.nextMonth').addClass('droppable');
		$('.droppable').droppable({
				drop: function(event, ui){
					var targetEl = $("#"+event.target.id);
					var draggableEl = $(ui.draggable);
					draggableEl.detach().appendTo($(this));
					draggableEl.css({top: 0, left: 0.5});
				} 
			});
	}
	function selectEvent(){
		selectedEvent = $("#eventSelect :selected").text();	
	}	
	function setDayNames(){
		var table = document.getElementById('calndarTable');
		var thead_td = table.firstChild.firstChild.childNodes;
		for(var l=0; l<thead_td.length; l++){
	  		thead_td[l].innerHTML = dayNamePL[l];
		}
	}
	function setTable(){
		var target = document.getElementById('calendar');
		target.innerHTML = '';
		var width = target.clientWidth;		
		var cellWidth = width/7;
		var tHead = mylib.createTablePart(1, cols, cellWidth+'px', "30px", "thead", "#cdc4bc");
		tHead.style.background = '#E2D9D0';
		var tBody = mylib.createTablePart(rows, cols, cellWidth+'px', cellWidth+'px', "tbody", "#cdc4bc")
		var table = document.createElement('table');
		table.setAttribute('id', 'calndarTable');
		table.appendChild(tHead);
		table.appendChild(tBody);
		target.appendChild(table);
	}
	//----------------------------------------------------setBannerYearMonth
	function setBannerYearMonth(year, month) {
		var monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
		var textBannerEl = document.getElementById('textBanner');
		textBannerEl.innerHTML = monthNames[month]+" "+year;
	}	
	//----------------------------------------------------
	var prevButt = document.getElementById('buttPrevious');
	var nextButt = document.getElementById('buttNext');
	var currtButt = document.getElementById('buttCurrent');
	var tudayView = document.getElementById('buttTudayView');
	var weekView = document.getElementById('buttWeekView');
	var montView = document.getElementById('buttMonthView');
	prevButt.addEventListener('click', userPreviousMonth);
	nextButt.addEventListener('click', userNextMonth);
	currtButt.addEventListener('click', setMonthView);
	tudayView.addEventListener('click', setTudayView);
	weekView.addEventListener('click', setWeekView);
	montView.addEventListener('click', setMonthView);
	$('tbody').on('dblclick', addEvent);
	//----------------------------------------------------setTudayView
	function setTudayView(){
		prevButt.disabled = true;
		nextButt.disabled = true;
		var cols = 1;
		var rows = (24*60)/step;		
		var container = document.getElementById('calendar');
		container.innerHTML = "";
		var containerWidth = container.clientWidth;
		//@param (rows, cols, cellW, cellH, tPart, bColor)
		var tHead = mylib.createTablePart(1, cols, containerWidth+'px', '30px', 'thead', '#A29B95');
		tHead.style.background = '#E2D9D0';
		var tBody = mylib.createTablePart(rows, cols, containerWidth+'px', '20px', 'tbody', '#A29B95');
		var table = document.createElement('table');
		table.setAttribute('id', 'calndarTable');
		table.appendChild(tHead);
		table.appendChild(tBody);
		container.appendChild(table);
		var thead_td = table.firstChild.firstChild.childNodes[0];
		var dayName = tudayDayName();
		thead_td.innerHTML = " "+dayName+"";
		setBannerYearMonth(currentYear, currentMonth);
		setHoursInDayView();
		cols = 7;
		rows = 7;
	};
	//----------------------------------------------------setWeekView
	function setWeekView(){
		prevButt.disabled = true;
		nextButt.disabled = true;
		var cols = 7;
		var rows = (24*60)/step;		
		var container = document.getElementById('calendar');
		container.innerHTML = "";
		var containerWidth = container.clientWidth;
		var columnWidth = containerWidth/cols;
		//@param (rows, cols, cellW, cellH, tPart, bColor)
		var tHead = mylib.createTablePart(1, cols, columnWidth+'px', '30px', 'thead', '#A29B95');
		tHead.style.background = '#E2D9D0';
		var tBody = mylib.createTablePart(rows, cols, columnWidth+'px', '20px', 'tbody', '#A29B95');
		var table = document.createElement('table');
		table.setAttribute('id', 'calndarTable');
		table.appendChild(tHead);
		table.appendChild(tBody);
		container.appendChild(table);
		setDayNames();
		setHoursInDayView()
		cols = 7;
		rows = 7;
	};
	//	
	function addEvent(e){
		var event = e;
		var tds = document.querySelectorAll('#days td');
		tds.forEach(function(el, i){
			tds[i].setAttribute('data-day', i+1);
		})
		var tds = document.querySelectorAll('#months td');
		tds.forEach(function(el, i){
			tds[i].setAttribute('data-month', i+1);
		})
		function getDiv(){
			var div = document.createElement('div');
			div.setAttribute('class', "event draggable");
			div.innerHTML = selectedEvent;
			return div;
		}
		function getTarget(e){
			var target; 
			if(e.target.nodeName !== 'TD'){
				target = $(e.target).closest('td');
			}else{
				target = $(e.target);
			}
			return target;
		}
		$('#mymodal').modal('show');		
		var eventDiv = getDiv();
		var targetCell = getTarget(event);

		//gdy gliknęto save w modal wywołac tutaj funkcje dodaj z podanym eventDiv i targetem


		//var date = new Date(2016, modalMonthN, modalDayN).toLocaleDateString();
		//targetCell.append(eventDiv);		
		$('.draggable').draggable({
				containment: '#calendar',
				cursor: 'move',
				snap: '.droppable'
			});
		$('.draggable').resizable({
			containment: 'tbody',
			minWidth: 114,
			minHeight: 20,
			maxHeight: 20.1
		});

	}
	//----------------------------------------------------setMonthView
	function setMonthView(){	

		setTable();
		setDayNames();
		clearTBody();
		mylib.deployMonths(currentYear, currentMonth);
		highlightCurrentDay();
		makeElementsDroppable();
		userMonth = currentMonth;
		userYear = currentYear;		
		prevButt.disabled = false;
		nextButt.disabled = false;	
		// 	
		$('tbody').on('click', addEvent);
	};
	//----------------------------------------------------tudayDayName
	function tudayDayName(){
		var tudayDayNumber0_6 = date.getDay();//0-6
		var tudayDayNumber1_7 = (tudayDayNumber0_6==0?7:tudayDayNumber0_6);
		return dayNamePL[tudayDayNumber1_7-1];
	}
	var userMonth = currentMonth;
	var userYear = currentYear;

	//----------------------------------------------------userPreviousMonth
	function userPreviousMonth(){
		if(userMonth-1>=0){
			userMonth = userMonth-1;
			userYear = userYear;
		}else{
			userMonth = 11;
			userYear = userYear-1;
		};
		clearTBody();
		mylib.deployMonths(userYear, userMonth);
		setBannerYearMonth(userYear, userMonth);
		if(userMonth===currentMonth && userYear===currentYear){
			highlightCurrentDay();
		}
	}
	//----------------------------------------------------userNextMonth
	function userNextMonth(){
		if(userMonth+1<=11){
			userMonth = userMonth+1;
			userYear = userYear;
		}else{
			userMonth = 0;
			userYear = userYear+1;
		};
		clearTBody();
		mylib.deployMonths(userYear, userMonth, rows, cols);
		setBannerYearMonth(userYear, userMonth);	
		if(userMonth===currentMonth && userYear===currentYear){
			highlightCurrentDay();
		}
	}
	//----------------------------------------------------clearTableBody
	function clearTBody(){		
		var tds = document.querySelectorAll('#calendarTable tbody td');
		for (var i=0; i<tds.length; i++){	
			tds[i].innerHTML = "";
		}
	}
	//----------------------------------------------------highlightCurrentDay
	function highlightCurrentDay(){
		var id = new Date(currentYear, currentMonth, currentDay).toLocaleDateString();
		var cell = document.getElementById(id);
		cell.className += ' highlightCurrentDay';		
	}
	//----------------------------------------------------setHoursInDayView
	function setHoursInDayView(){
		var d = new Date(currentYear, currentMonth, currentDay, 0, 0, 0, 0);
		var rows = (24*60)/step;
		var counter = 240;//start from 4 o'clock
		var table = document.getElementById('calndarTable');
		var tbody_trTable = table.childNodes[1].childNodes;
		for(i=0; i<tbody_trTable.length; i++){
			var cell = tbody_trTable[i].firstChild;	
			cell.setAttribute('class', 'dayHours');
			var m = (counter%60);
			var h = (counter-(counter%60))/60;
			var hh = (h==24?0:h);
			d.setHours(hh);
			d.setMinutes(m);
			var s = d.toLocaleTimeString('PL', {hour: '2-digit', minute:'2-digit'})
			counter +=step;
			cell.innerHTML = s;
		}
	}
}());
