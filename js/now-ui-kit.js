var transparent = true;
var big_image;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
  backgroundOrange = false,
  toggle_initialized = false;

var nowuiKit,
  $navbar,
  scroll_distance,
  oVal;

$(document).ready(function() {
  //  Activate the Tooltips
  $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

  // Activate Popovers and set color for popovers
  $('[data-toggle="popover"]').each(function() {
    color_class = $(this).data('color');
    $(this).popover({
      template: '<div class="popover popover-' + color_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    });
  });

  // Activate the image for the navbar-collapse
  nowuiKit.initNavbarImage();

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

  if ($('.navbar[color-on-scroll]').length != 0) {
    nowuiKit.checkScrollForTransparentNavbar();
    $(window).on('scroll', nowuiKit.checkScrollForTransparentNavbar)
  }

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });

  // Activate bootstrapSwitch
  $('.bootstrap-switch').each(function() {
    $this = $(this);
    data_on_label = $this.data('on-label') || '';
    data_off_label = $this.data('off-label') || '';

    $this.bootstrapSwitch({
      onText: data_on_label,
      offText: data_off_label
    });
  });

  if ($(window).width() >= 992) {
    big_image = $('.page-header-image[data-parallax="true"]');

    $(window).on('scroll', nowuiKitDemo.checkScrollForParallax);
  }

  // Activate Carousel
  $('.carousel').carousel({
    interval: 4000
  });

  $('.date-picker').each(function() {
    $(this).datepicker({
      templates: {
        leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
        rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
      }
    }).on('show', function() {
      $('.datepicker').addClass('open');

      datepicker_color = $(this).data('datepicker-color');
      if (datepicker_color.length != 0) {
        $('.datepicker').addClass('datepicker-' + datepicker_color + '');
      }
    }).on('hide', function() {
      $('.datepicker').removeClass('open');
    });
  });


});

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
  checkScrollForParallax: debounce(function() {
    var current_scroll = $(this).scrollTop();

    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });

  }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

$(window).on('resize', function() {
  nowuiKit.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (nowuiKit.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    nowuiKit.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $('html').removeClass('nav-open');
      nowuiKit.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('#bodyClick').remove();
      }, 550);
    });

    $('html').addClass('nav-open');
    nowuiKit.misc.navbar_menu_visible = 1;
  }
});

nowuiKit = {
  misc: {
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > scroll_distance) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
      }
    }
  }, 17),

  initNavbarImage: function() {
    var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
    var background_image = $navbar.data('nav-image');

    if (background_image != undefined) {
      if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
        $navbar.css('background', "url('" + background_image + "')")
          .removeAttr('data-nav-image')
          .css('background-size', "cover")
          .addClass('has-image');
      } else {
        $navbar.css('background', "")
          .attr('data-nav-image', '' + background_image + '')
          .css('background-size', "")
          .removeClass('has-image');
      }
    }
  },

  initSliders: function() {
    // Sliders for demo purpose in refine cards section
    var slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: [true, false],
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
}

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
  checkScrollForParallax: debounce(function() {
    var current_scroll = $(this).scrollTop();

    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });

  }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};


$(function(){
	// You can add Users inside JSON users section
	var _json = {
		users: ["Gupi Gain", "Bagha Bain", "Hirak Raja"],
		chats: [{
			from: 'Gupi Gain',
			msg: 'Mora Dujonai Rajar Jamai!',
			time: '1533263925814',
			action: ''
		}, {
			from: 'Bagha Bain',
			msg: 'Jamai!',
			time: '1533263925814',
			action: ''
		}, {
			from: 'Gupi Gain',
			msg: 'Mora Khai Dai Ghuri Firi!',
			time: '1533263925814',
			action: ''
		},{
			from: 'Gupi Gain',
			msg: 'Aha ki Moder Chiri!',
			time: '1533263925814',
			action: ''
		}]
	};
		
	init();
	function init () {
		renderData();
	};	
	
	// RENDER METHODS
	function renderData () {
		var _now = $.now();
		getDateTime(_now);
		_json.users.forEach(function (user) {
			var userID = user.replace(/ /g,"_");
			var parentString = '<div class="chatbox" id="'+userID+'">'+
				 '<div class="chats">'+
				 '<ul></ul>'+
				 '</div>'+
				 '<div class="sendBox">'+
				 '<input type="text" placeholder="enter next line '+ user.split(' ')[0]+'...">'+
				 '</div>';	
			$('#viewport').append(parentString);
			_json.chats.forEach(function (chat) {
				var _cl;
				(chat.from === user) ? _cl = 'you' : _cl = 'him';
				var dataString = '<li>'+
					 '<div class="msg ' + _cl +'">'+
					 '<span class="partner">'+ chat.from +'</span>'+
					 chat.msg +
					 '<span class="time">' + getDateTime (chat.time) + '</span>'+
					 '</div></li>';
				$('#viewport #'+ userID +' .chats>ul').append(dataString);		
			});
		});		
	};
	
	function newMsgRender (data) {
		$('#viewport .chats ul>li.pending').remove();
		_json.users.forEach(function (user) {
			var checkID = user.replace(/ /g,"_");
			var _cl = '';
			(data.from === user) ? _cl = 'you' : _cl= 'him';					
			$('#viewport .chatbox#'+ checkID +' .chats ul')
				.append('<li><div class="msg '+_cl+'">'+
						  '<span class="partner">'+ data.from +'</span>'+
						  data.msg +
						  '<span class="time">' + getDateTime (data.time) + '</span>'+
						  '</div>'+
						  '</li>');	
		});
	}
	
	function pendingRender (typingUser) {
		var pending = '<li class="pending">'+
			 '<div class="msg load">'+
			 '<div class="dot"></div>'+
			 '<div class="dot"></div>'+
			 '<div class="dot"></div>'+
			 '</div>'+
			 '</li>';
		_json.users.forEach( function (user) {
			user = user.replace(/ /g,"_");
			if(user !== typingUser) {
				if(!($('#'+ user +' .chats ul>li').hasClass('pending')))
					$('#'+ user +' .chats ul').append(pending);
			}
		});		
	}
	
	// HELPER FUNCTION
	function getDateTime (t) {
		var month 	= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];	
		var d 		= new Date(t/1000),
			 month 	= (month[d.getMonth()]),
			 day 		= d.getDate().toString(),
			 hour 	= d.getHours().toString(),
			 min 		= d.getMinutes().toString();
		(day.length < 2) ? day = '0' + day : '';
		(hour.length < 2) ? hour = '0' + hour : '';
		(min.length < 2) ? min = '0' + min : '';		
		var res = ''+month+' '+day+' '+hour+ ':' + min;
		return res;
	}
	
	// KEYPRESS EVENTS HANDLER
	$('#viewport .sendBox>input').keypress(function( e ) {			
		var _id = $(this).closest('.chatbox').attr('id');
		pendingRender(_id);
		if(e.which == 13) {
			var msgFrom;
			_json.users.forEach(function (user) {
				if(user.replace(/ /g,"_") === _id)
					msgFrom = user;
			});
			var msg = $('#'+_id+' .sendBox>input').val();
			msg = msg.replace(/\"/g,'\\"');
			var t = $.now();
			$('#'+_id+' .sendBox>input').val('');
			if(msg.replace(/\s/g, '') !== ''){
				var temp = {
					from: msgFrom,
					msg: msg,
					time: t.toString(),
					action: ''
				}
				_json.chats.push(temp);
				console.log(_json);
				newMsgRender (temp);
			} else {
				$('#viewport .chats ul>li.pending').remove();
			}
		}
	});	
	
	// EVENT HANDLER
	$('#viewport .sendBox>input').focusout(function() {
		$('#viewport .chats ul>li.pending').remove();
	});
});