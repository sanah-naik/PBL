// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});




// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });
(function() {
  
  class CalendarStore {
    constructor(id) {
      this.id = id;
      
      this.data = {};
      try {
        const saved = localStorage.getItem(id);
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          this.data = parsed;
        }
      } catch (err) {
        console.error(err);
        console.error('Problem parsing saved data');
      }
    }
    save() {
      localStorage.setItem(
        this.id,
        JSON.stringify(this.data)
      );
    }
    setDayStatus(dayNumber, status) {
      this.data[dayNumber] = status;
      this.save();
    }
    getDayStatus(dayNumber) {
      return this.data[dayNumber];
    }
  }
  
  const db = new CalendarStore('calendar');
  
  const getCurrentDay = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };
  
  const calendar = document.querySelector('.calendar');
  const calendarContent = document.createDocumentFragment();
  const today = getCurrentDay();
  
  for (let i=1; i<=365; i++) {
    // onst day = document.createElement('div');
    const day = document.createElement('button');
    day.classList.add('noselect');
    day.classList.add('day');
    day.dataset.dayNumber = i;
    day.value = i;
    
    const dayNumber = document.createElement('span');
    dayNumber.classList.add('noselect');
    dayNumber.innerHTML = i;
    day.appendChild(dayNumber);
    
    if (i === today) {
      day.classList.add('today');  
    } else if (i > today) {
      day.classList.add('future');
    }
    if (db.getDayStatus(i)) {
      day.classList.add('completed');
    }
    calendarContent.appendChild(day);
  }
  calendar.appendChild(calendarContent);
  
  calendar.addEventListener('click', ({ target }) => {
    if (target.matches('.future')) {
      alert("You can't mark a future day as completed.");
    } else if (target.matches('.day')) {
      const { dayNumber } = target.dataset;
      
      if (dayNumber <= today) {
        db.setDayStatus(
          dayNumber,
          !db.getDayStatus(dayNumber)
        );

        if (db.getDayStatus(dayNumber)) {
          target.classList.add('completed');
        } else {
          target.classList.remove('completed');
        }
      }
    }
  });
}())