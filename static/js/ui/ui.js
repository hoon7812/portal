/* 《 공통 UI js 》 */

// 퍼블용 include
// $(function(){
// 	var includes = $('[data-include]');
// 	jQuery.each(includes, function(){
// 		var file = '../../pub/include/' + $(this).data('include') + '.html';
// 		$(this).load(file);
// 	});
// });

// Dim
dimShow = function(){ /* 딤드 show */
	$("body").addClass("dim");
}
dimHide = function(){ /* 딤드 hide */
	$("body").removeClass("dim");
}

/* 기본 팝업 */
fullPopup = function(){ //팝업
	var $openBtn = $(".full_open"),
		$closeBtn = $(".full_pop .closed");

	$openBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		var target = $(this).attr("open-full-pop") || e;
		$(".full_pop" + "." + target).fadeIn(150).addClass("on");
		dimShow();
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".full_pop");
		target.fadeOut(150).removeClass("on");
		dimHide();
	});
}

/* 팝업 외부 클릭시 닫기 */
$(document).mouseup(function (e){
	var layerPop = $(".full_pop");		
	if(layerPop.has(e.target).length === 0){
		layerPop.fadeOut(150).removeClass("on");
		dimHide();
	}
});

/* 용어사전 팝업 */
termPop = function(){ //팝업
	var $termOpenBtn = $(".term_open"),
		$termCloseBtn = $(".terms_pop .closed");
		$termPopup= $(".terms_pop");

	$termOpenBtn.on("click", function(e) { /* 열기 */
		e.preventDefault();
		$termPopup.removeClass("on");
		var termTarget = $(this).attr("open-term-pop") || e;
		$(".terms_pop" + "." + termTarget).addClass("on");
		$(window).resize(function(){ 
			if (window.innerWidth < 1024) { //1024 이하 해상도
				$("body").addClass("mo_scroll_off");
			} 
		}).resize(); 
	});

	$termCloseBtn.on("click", function() { /* 닫기 */
		var termCTarget= $(this).closest(".terms_pop");
		termCTarget.removeClass("on");
		$(window).resize(function(){ 
			if (window.innerWidth < 1024) { //1024 이하 해상도
				$("body").removeClass("mo_scroll_off");
			} 
		}).resize(); 
	});
}


// GIS 윈도우 오픈팝업
function openWindowPop(url, name){
	userwidth = (screen.width - 0);
	userheight = (screen.height - 0);
    var options = 'top=0, left=0, width='+userwidth+', height='+userheight+', status=no, menubar=no, toolbar=no, resizable=no, scrollbars=no, location=no';	
    window.open(url, name, options);
}

//스크롤 시 header fixed :: 서브페이지 경우
$(document).ready(function(){
    scrollAct();
});
function scrollAct(){
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop(); //현재 스크롤 위치

        if (scrollTop){
            $('#wrap').addClass("sticky")
			$('.notice_top_btn').removeClass("on")
			$('.notice_list_area').removeClass("on")			 
		} else {
			$('#wrap').removeClass("sticky")
        }
    })
}

//이미지 클릭시 원본이미지 새창띄우기
const clickImg = (imgsrc,pageName) =>{
	alert(imgsrc);
	var imageWin = new Image();
	imageWin = window.open("", "", "width=600px, height=600px"); 
	imageWin.document.write("<html><body style='margin:0'>"); 
	imageWin.document.write("<img src='" + imgsrc + "' border=0>"); 
	imageWin.document.write("</body><html>"); 
	imageWin.document.title = pageName;	
}

// 시설현황상세 오픈팝업
function popupWindow(url, title) {
	var popupWidth = 1200;
	var popupHeight = 820;
	var popupX = Math.round(window.screenX + (window.outerWidth/2) - (popupWidth/2));
	var popupY = Math.round(window.screenY + (window.outerHeight/2) - (popupHeight/1.85));    
	var featureWindow = "width=" + popupWidth + ", height="+popupHeight+ ", left=" + popupX + ", top=" + popupY;
	var options = 'status=no, menubar=no, toolbar=no, resizable=no, scrollbars=yes, location=no';	
	return window.open(url, title, featureWindow, options);
}




$(window).on('load', function () {
	$(".alert_pop").length && alertPopup(); //알럿
	$(".full_pop").length && fullPopup(); //팝업
	$(".toast_pop").length && toastPop(); //토스트팝업
	$(".bottom_sheet").length && bottomSheet(); //팝업
	$(".terms_pop").length && termPop(); //용어사전 결과 팝업
	
	/* 세자리 콤마 카운트 */
	$('.count_num').each(function () {
	    const $this = $(this),
	        countTo = $this.attr('data-count');

	    $({
	        countNum: $this.text()
	    }).animate({
	        countNum: countTo
	    }, {
	        duration: 1100,
	        easing: 'linear',
	        step: function () {
	            $this.text(Math.floor(this.countNum));
	        },
	        complete: function () {
	            $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
	            //3자리 마다 콤마 표시 적용
	        }
	    });
	});

	//숫자 카운팅 모션 싱글뷰 년도
	$('.fact_board_list .num01').each(function() { // 각 클래스에 각각 적용
		var $this = $(this),
			countTo = $this.attr('data-count-year');
			// $this = .count_num
			// countTo = .count_num의 data-count 속성의 값
			
		
		$({ countNum: $this.text()}).animate({
			countNum: countTo 
			// countNum: $this.text() = 0, countNum: countTo = 00
			// 0에서 countNum이 된다
		},
		{
			duration: 1100, // 애니메이션이 완료될때까지 걸리는 시간
			easing:'linear', // 애니메이션 효과 방식
			step: function() { // 움직임 각 스텝별로 실행될 함수
				$this.text(Math.floor(this.countNum));
				// Math.floor -> this.countNum의 값을 정수로 만들어준다
			},
			
			complete: function() { // 움직임이 멈춘 후 실행될 함수
				$this.text(this.countNum);
				// this.countNum이 $this의 text값이 된다
			}
		});  
	});

	/* 인풋 대소문자 */
	// $("input").bind("keyup", function() {
    //     $(this).val($(this).val().toLowerCase());
    // });

	//메인 비쥬얼 스와이퍼 
	let options = {};
	if ( $(".main_vis_wrap_new .swiper-slide").length == 1 ) {
		options = {
			loop: false,
			autoplay: false,
			pagination: false,
		}	
		$('.main_vis_wrap_new .swiper-btn-wrap').hide();
	} else {
		options = {
			slidesPerView: 1,
			centeredSlides: true,
			spaceBetween: 0,
			grabCursor: true,
			pagination: {
				el: '.main_vis_wrap_new .swiper-pagination',
				clickable: true,
			},
			loop: true,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},
			autoplayDisableOnInteraction: false,
		}
		$('.swiper-btn-wrap').show();
	}
	
	var mainSwiper = new Swiper('.main_vis_wrap_new > .swiper-container', options);

	$('.main_vis_wrap_new .swiper-btn-wrap .play').hide();
	$('.main_vis_wrap_new .swiper-btn-wrap .play').click(function(){
		mainSwiper.autoplay.start();
		$(this).hide();
		$('.main_vis_wrap_new .swiper-btn-wrap .stop').show();
	});	
	$('.main_vis_wrap_new .swiper-btn-wrap .stop').click(function(){
		mainSwiper.autoplay.stop();
		$(this).hide();
		$('.main_vis_wrap_new .swiper-btn-wrap .play').show();
	});		
	
	$('.main_vis_wrap_new .swiper-btn-wrap > .swiper-pagination > span').click(function(){		
		$('.main_vis_wrap_new .swiper-btn-wrap .stop').hide();
		$('.main_vis_wrap_new .swiper-btn-wrap .play').show();
		setTimeout(function () {	
			mainSwiper.autoplay.stop();
		}, 0);	
	});	


	//상단공지 스와이퍼
    var noticeSwiper = new Swiper('.notice_top_area > .swiper-container', {
		direction: "vertical",
			slidesPerView: 5, 
		autoplay: {
			delay: 2000,
		},
		loop: true,
		allowTouchMove: false,
		pagination: {
		  el: '.notice_top_area .swiper-pagination',
		  type: 'fraction',
		},
    });
	$('.notice_top_btn .stop').hide();
	$('.notice_top_btn .play').click(function(){
		noticeSwiper.autoplay.stop();
		$(this).hide();
		$('.notice_top_btn .stop').show();
		$('.notice_top_wrap').addClass("active");
		$('#wrap').addClass("none");
		return false;		
	});	
	$('.notice_top_btn .stop').click(function(){
		noticeSwiper.autoplay.start();
		$(this).hide();
		$('.notice_top_btn .play').show();
		$('.notice_top_wrap').removeClass("active");
		$('#wrap').removeClass("none");
		return false;		
	});		
	
	//메인 교육시설통계 스와이퍼
	new Swiper('.main_swiper_stat > .swiper-container', {		
		breakpoints:{
			0: {
				loop: false,
				slidesPerView: 4, 
				slidesPerGroup: 4,
				pagination: {
					el: ".main_swiper_stat .swiper-pagination",
					clickable: true,
				},
				spaceBetween: 0,
				// slidesOffsetBefore: 26,
				// slidesOffsetAfter: 26,
			},
			768: {
				loop: false,
				slidesPerView: 6, 
				slidesPerGroup: 6,
				pagination: {
					el: ".main_swiper_stat .swiper-pagination",
					clickable: true,
				},
			},
			1024 : {
				loop: false,				
				slidesPerView: 8, 
				slidesPerGroup: 1,	
				pagination: false,		
				allowTouchMove: false,	
			},
		}
	});
	
	//메인 관련사이트 바로가기 스와이퍼
	new Swiper('.rt_site > .swiper-container', {

		breakpoints:{
			0: {
				autoplay: {
					delay: 2000,
				},
				loop: true,
				slidesPerView: 2, 
				spaceBetween: 10,
				navigation: {
					nextEl: '.rt_site .swiper-button-next',
					prevEl: '.rt_site .swiper-button-prev',
				},
				allowTouchMove: false,
			},
			768: {
				autoplay: {
					delay: 2000,
				},
				loop: true,
				slidesPerView: 4, 
				spaceBetween: 20,
				navigation: {
					nextEl: '.rt_site .swiper-button-next',
					prevEl: '.rt_site .swiper-button-prev',
				},
				allowTouchMove: false,
			},
			1024 : {
				loop: true,
				slidesPerView: 6, 
				spaceBetween: 8,
				autoplay: {
					delay: 2000,
				},
				navigation: {
					nextEl: '.rt_site .swiper-button-next',
					prevEl: '.rt_site .swiper-button-prev',
				},
				allowTouchMove: false,
			},
			1200 : {
				loop: true,
				slidesPerView: 6, 
				spaceBetween: 8,
				autoplay: {
					delay: 2000,
				},
				navigation: {
					nextEl: '.rt_site .swiper-button-next',
					prevEl: '.rt_site .swiper-button-prev',
				},
				allowTouchMove: false,
			}
		}
	});


	/* 체크박스, 라디오 접근성 */
	var ui = {
		checkLabel : function() {
			$(document).on('click', 'input:checkbox, input:radio', function (e) {
				$inp = $(this);
				if($inp.next().is("label")) {
					var name = $inp.attr("name");
					//only for radio
					if($inp.attr("type") == "radio") {
						$("input:radio[name=" + name + "]").each(function() {
							$(this).next().removeClass('on');
						});
					}
					//both checkbox and radio
					if(name) {
						$("input[name=" + name + "]").each(function(index) {
							if($(this).is(":checked")) {
								$(this).next().addClass('on');
							} else {
								$(this).next().removeClass('on');
							}
						});
					} else {
						//if name is not specified
						if($inp.is(":checked")) {
							$inp.next().addClass('on');
						} else {
							$inp.next().removeClass('on');
						}
					}
					//check/uncheck all checkboxes
					// var $wrap = $inp.parent();
					// if($wrap.hasClass("otherCheck")) {
					// 	$wrap = $wrap.parent();
					// }
					// if($wrap.find("input:checkbox[name=allCheck]").size() = 1) {
					// 	if(name == "allCheck") {
					// 		if($inp.is(":checked")) {
					// 			$wrap.find("input[name!=allCheck]:checkbox").each(function() {
					// 				$(this).prop("checked", true);
					// 				$(this).next().addClass("on");
					// 			});
					// 		} else {
					// 			$wrap.find("input:checkbox").each(function() {
					// 				$(this).prop("checked", false);
					// 				$(this).next().removeClass("on");
					// 			});
					// 		}
					// 	} else {
					// 		var cnt1 = $wrap.find("input[name!=allCheck]").size();
					// 		var cnt2 = $wrap.find("input[name!=allCheck]:checked").size();
					// 		if(cnt1 == cnt2) {
					// 			$wrap.find("input[name=allCheck]").prop("checked", true);
					// 			$wrap.find("input[name=allCheck]").next().addClass("on");
					// 		} else {
					// 			$wrap.find("input[name=allCheck]").prop("checked", false);
					// 			$wrap.find("input[name=allCheck]").next().removeClass("on");
					// 		}
					// 	}
					// }
				}
			});
	
			$(document).on('change', 'input:radio', function (e) {
				var $this = $(this);
				if( $this.prop('checked') ){
					$thisId = $this.attr('id');
					$thisGroup = $this.attr('name');
					$("input[name="+$thisGroup+"]").siblings('label').removeClass('on');
					$this.siblings('label').each(function(){
						if($(this).attr('for') == $thisId){
							$(this).addClass('on');
						}
					});
				} else {
					$this.next('label').removeClass('on');
				}
			}).change();
			if($('input[type=checkbox], input[type=radio]').length){
				$('input[type=checkbox], input[type=radio]').each(function(){
					if($(this).attr('checked') == 'checked'){
						var selObjName = $(this).attr('id');
						$('label').each(function(){
							if($(this).attr('for') == selObjName){
								$(this).addClass('on');
							}
						});
					}
				});
			}
	
		}
	}
	
	$(function(){
		ui.checkLabel();
	})
	
	//tab
	$('.tab_title ul li').on('click', function(){
		var onTab = $(this).attr('aria-controls');

		$(this).parent('.tab_title ul').children('li').removeClass('active').children('button').attr('aria-selected',false);
		$(this).parent().parent('.tab_title').siblings('.tab_cont').children('.box_tab-contents').removeClass('active').attr({
			'hidden' : true,
			// 'tabindex' : -1
		});
		$(this).addClass('active').children('button').attr('aria-selected',true);
		$('#' + onTab).addClass('active').attr({
			'hidden' : false,
			// 'tabindex' : 0
		});
	})

	// gnb	
	$('.header_category > a').click(function(){	
		$('.search_pop_wrap').hide();
		$('.header_search').removeClass('close');   
		$('header').removeClass('s_line');  
		$('header').toggleClass('menu_on');  
		$('body').addClass('mo_scroll_off');   
		$("body").removeClass("modal");	  
	});
	$('.menu_close > a').click(function(){
		$('header').removeClass('menu_on');    
		$('body').removeClass('mo_scroll_off');  
		$("body").removeClass("modal");
	});

	//input reset
	$("button[type=reset]").hide();	
	$(".input_txt").keydown(function(e) {
		$(this).parent().next().show();
    });
	
	$(document).on("click","button[type=reset]",function(e){
		e.preventDefault();
		$(this).prev().children().val("");
		$(this).hide();	
	});	

	// 아코디언 
	$('.acod > li > button').click(function(){
		var acodli = $(this).hasClass('on');
		if(acodli){
			$(this).removeClass('on');
			$(this).next('.acod_cont').stop(true,true).slideUp();
            $(this).attr('aria-expanded', 'false');
		}else{
			$('.acod li button').removeClass('on');
			$('.acod li .acod_cont').stop().slideUp();
			$(this).addClass('on');
			$(this).next('.acod_cont').stop(true,true).slideDown();
            $(this).attr('aria-expanded', 'true');
		}
	});		

	// Top 버튼 상단 스크롤
	$('.top_btn').hide();
	$(window).scroll(function(){
		if ($(this).scrollTop() > 0){
			$('.top_btn').fadeIn(200);
		} else{
			$('.top_btn').fadeOut(200);
		}
	});
	$('.top_btn').click(function(){
		$('html, body').animate({scrollTop:0},400);
		$("h1 a").focus();
		return false;
	});

	// 공통 검색 layer Popup	
	$('.header_search > a').click(function(){
		$(this).parent().toggleClass("close");	
		$('.search_pop_wrap').toggle();
		$("header").toggleClass("s_line");
		$("body").toggleClass("modal");
	});	

	$('.terms_cont_list ul li a').click(function(){
		$(this).parent().addClass("on");	
		$(this).parent().siblings().removeClass("on");	
	});	

	//교육시설통계 조회조건
	var statSelct = $('.stat_select_box');
	


    // 반응형 모바일시 필요 스크립트
	$(window).resize(function(){ 
		if (window.innerWidth < 767) { //768 이하 해상도
			$('body').addClass('mo');  
			$('body').removeClass('tb');  
			$('header').removeClass('extend');  
			//GNB
			$("#gnb").on({
				mouseover : function(){
					$(this).closest("header").removeClass("extend");
				},
				mouseleave : function(){
					$(this).closest("header").removeClass("extend");
				},
				focusin : function(){
					$(this).closest("header").removeClass("extend");
				},
				focusout : function(){
					$(this).closest("header").removeClass("extend");
				}
			});

			//메인 비쥬얼 문구 마크업 변경
		    $('.main_vis_l.l01 .main_vis_txt').html('대한민국 모든 교육시설의<br><span>안전한 교육 환경 구현에<br>기여</span>합니다.');  
		    $('.main_vis_l.l01 > span').html('KEIIS는 학교·기관 모든 교육시설 안전 및 유지관리<br> 현황을 체계적으로 통합 관리하는 플랫폼입니다. ');  
		    $('.main_vis_l.l02 > p').html('<span>관심 시설과<br>주변 생활 안전 시설</span>을<br>지도를 통해 확인하세요.');  

			//메인 안전자료실 스와이퍼
			new Swiper('.main_safe > .swiper-container', {
				navigation: {
					nextEl: '.main_safe .swiper-button-next',
					prevEl: '.main_safe .swiper-button-prev',
				},
				a11y: {
					prevSlideMessage: '이전 슬라이드',
					nextSlideMessage: '다음 슬라이드',
				},
				slidesPerView: 1, 
				slidesPerGroup: 1,
				spaceBetween: 30,
				speed: 300,
			});	
			

			//교육시설통계
			$('.btn_stat_srch').click(function(){
				statSelct.addClass('active');		
				statSelct.addClass('on');				
				$('body').addClass('mo_scroll_off');   
			});
			$('.btn_stat_close').click(function(){
				statSelct.removeClass('active');	
				$('body').removeClass('mo_scroll_off');   
			});
			$(".stat_select_box > ul > li > button").click(function(e) {
				$(this).addClass('on'); 
				$(this).parent().siblings().children().removeClass('on'); 
				$(this).next('ul').show(); 
				$(this).parent().siblings().children().next('ul').hide(); 
			});
			$(".stat_select_box > ul > li > ul > li > button").click(function(e) {
				$(this).addClass('on'); 
				$(this).parent().siblings().children().removeClass('on'); 
			});		

		
		} else if (window.innerWidth < 1024) { //1024 이하 해상도
			$('body').removeClass('mo');  
			$('body').addClass('tb');  
			$('header').removeClass('extend');  
			//GNB
			$("#gnb").on({
				mouseover : function(){
					$(this).closest("header").removeClass("extend");
				},
				mouseleave : function(){
					$(this).closest("header").removeClass("extend");
				},
				focusin : function(){
					$(this).closest("header").removeClass("extend");
				},
				focusout : function(){
					$(this).closest("header").removeClass("extend");
				}
			});

			//메인 안전자료실 스와이퍼
			new Swiper('.main_safe > .swiper-container', {
				navigation: {
					nextEl: '.main_safe .swiper-button-next',
					prevEl: '.main_safe .swiper-button-prev',
				},
				a11y: {
					prevSlideMessage: '이전 슬라이드',
					nextSlideMessage: '다음 슬라이드',
				},
				slidesPerView: 2.33, 
				slidesPerGroup: 1,
				spaceBetween: 30,
				speed: 300,
			});	

			//서비스 바로가기 스와이퍼
			new Swiper('.main_service > .swiper-container', {
				navigation: {
					nextEl: '.main_service .swiper-button-next',
					prevEl: '.main_service .swiper-button-prev',
				},
				a11y: {
					prevSlideMessage: '이전 슬라이드',
					nextSlideMessage: '다음 슬라이드',
				},
				slidesPerView: 3, 				
				spaceBetween: 25,
			});	

			//교육시설통계 탭
			$('.tab_wrap.stat_tab .swiper-container .swiper-pagination').hide();

			//교육시설통계 
			$(".stat_select_box > ul > li > button").click(function(e) {
				$(this).parent().parent().parent().toggleClass('on'); 
			});
			$(".stat_select_box > ul > li > ul > li > button").click(function(e) {
				$(this).addClass('on'); 
				$(this).parent().siblings().children().removeClass('on'); 
			});		

			
		} else if (window.innerWidth < 1200) {   //1200이하 해상도
			
			//메인 안전자료실 스와이퍼
			new Swiper('.main_safe > .swiper-container', {
				navigation: {
					nextEl: '.main_safe .swiper-button-next',
					prevEl: '.main_safe .swiper-button-prev',
				},
				a11y: {
					prevSlideMessage: '이전 슬라이드',
					nextSlideMessage: '다음 슬라이드',
				},
				slidesPerView: 3, 
				slidesPerGroup: 3,
				spaceBetween: 30,
				speed: 300,
			});	

			//교육시설통계 탭
			$('.tab_wrap.stat_tab .swiper-container .swiper-pagination').hide();

			//교육시설통계 
			$(".stat_select_box > ul > li > button").click(function(e) {
				$(this).parent().parent().parent().toggleClass('on'); 
			});
			$(".stat_select_box > ul > li > ul > li > button").click(function(e) {
				$(this).addClass('on'); 
				$(this).parent().siblings().children().removeClass('on'); 
			});		


		} else {	 //PC 해상도
			$('body').removeClass('mo');  
			$('body').removeClass('tb');  
			$('body').removeClass('mo_scroll_off');  
			//GNB
			$("#gnb").on({
				mouseover : function(){
					$(this).closest("header").addClass("extend");
					$('#container').addClass('on')
					$('.header_area').addClass("bg");
				},
				mouseleave : function(){
					$(this).closest("header").removeClass("extend");
					$('#container').removeClass('on');  
					$('.header_area').removeClass("bg");
				},
				focusin : function(){
					$(this).closest("header").addClass("extend");
					$('#container').addClass('on');  
					$('.header_area').addClass("bg");
				},
				focusout : function(){
					// $(this).closest("header").removeClass("extend");
					$('#container').removeClass('on');  
					$('.header_area').removeClass("bg");
				}
			});
		
			$("#gnb ul > li a").focus(function(){
				$(this).closest("header").addClass("extend");
			});
		
			$("#gnb ul > li:last > a").focusout(function(){
				$(this).closest("header").removeClass("extend");
			});

			//메인 안전자료실 스와이퍼
			new Swiper('.main_safe > .swiper-container', {
				navigation: {
					nextEl: '.main_safe .swiper-button-next',
					prevEl: '.main_safe .swiper-button-prev',
				},
				a11y: {
					prevSlideMessage: '이전 슬라이드',
					nextSlideMessage: '다음 슬라이드',
				},
				on: {
					slideChangeTransitionEnd: function () {
						if(this.activeIndex > 6){
							$(".main_safe .swiper-container .swiper-button-next").hide();
						}
						else {   
							$(".main_safe .swiper-container .swiper-button-next").show();
						}
					}
				},
				spaceBetween: 30,
				SlidesPerView: 3.3,
				slidesPerGroup: 1,
				width: 380,
				touchRatio: 0,
				speed: 150,
			});	

			//교육시설통계 탭
			$('.tab_wrap.stat_tab .swiper-container .swiper-pagination').hide();
			
			//교육시설통계 
			$(".stat_select_box > ul > li > button").click(function(e) {
				$(this).parent().parent().parent().toggleClass('on'); 
			});
			$(".stat_select_box > ul > li > ul > li > button").click(function(e) {
				$(this).addClass('on'); 
				$(this).parent().siblings().children().removeClass('on'); 
			});			
		}	
	}).resize(); 
	
	// 통합검색 
	$(".sel_cust > button").click(function(e) {
		var selbtn = $(this).hasClass('on');
		if(selbtn){
			$(this).removeClass('on');
			$(this).next().hide(); 
            $(this).attr('aria-expanded', 'false');
		}else{
			$('.sel_cust > button').removeClass('on');
			$(this).parent().siblings().children(".sel_dropbox").hide();
			$(this).addClass('on');
			$(this).next().show(); 
            $(this).attr('aria-expanded', 'true');
		}
	});

	$(".option_state ul li > a").click(function(e) {
		$(this).parent().addClass('on');
		$(this).parent().siblings().removeClass('on');
	});	

	// 통합검색 : 최근 검색어 드롭다운 (임시) 
	$("#search_header .input_txt").click(function(e) {
		$(this).toggleClass('on'); 
		$('.search_input_list').toggleClass('on'); 
	});

	$(".btn_lnb").click(function(e) {
		$(".srch_lnb_wrap").toggleClass('on'); 		
	});

	//시설현황상세 top 버튼
	$('.top_btn_a').hide();
	$(window).scroll(function(){
		if ($(this).scrollTop() > 0){
			$('.top_btn_a').fadeIn(200);
		} else{
			$('.top_btn_a').fadeOut(200);
		}
	});
	$('.top_btn_a').click(function(){
		$('html, body').animate({scrollTop:0},400);
		return false;
	});

});



