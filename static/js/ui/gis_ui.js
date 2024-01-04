/* 《 공통 UI js 》 */

//GIS 팝업
gisPopup = function(){
	var $openBtn = $(".gis_open"),
		$closeBtn = $(".gis_pop .closed");
		$modal = $(".gis_modal");

	$openBtn.on("click", function(e) { /* 열기 */ 
		e.preventDefault();
		var target = $(this).attr("open-gis-pop") || e;
		$(".gis_pop" + "." + target).fadeIn(150).addClass("on");
		$modal.addClass("on");
		$(".gis_pop.small").hide();
		$modal.removeClass("small");
	});

	$closeBtn.on("click", function() { /* 닫기 */
		var target= $(this).closest(".gis_pop");
		target.fadeOut(150).removeClass("on");
		$modal.removeClass("on");
		$modal.removeClass("small");
	});
	
	$modal.on("click", function() { /* 모달 클릭시 닫기 */
		$('.gis_pop').fadeOut(150);
		$modal.removeClass("on");		
	});
}

//GIS 모바일 small 팝업
gisPopupSmall = function(){
	var $openBtnSmall = $(".gis_small_open")
		$modalSmall = $(".gis_modal");

	$openBtnSmall.on("click", function(e) { /* 열기 */ 
		e.preventDefault();
		var target = $(this).attr("open-gis-small-pop") || e;
		$(".gis_pop.small" + "." + target).fadeIn(150).addClass("on");
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		$modalSmall.addClass("small");
		$modalSmall.addClass("on");
	});
	
	$modalSmall.on("click", function() { /* 모달 클릭시 닫기 */
		$('.gis_pop.small').fadeOut(150);
		$openBtnSmall.removeClass("on");
		$modalSmall.removeClass("small");
		$modalSmall.removeClass("on");
	});
}

// GIS 윈도우 오픈팝업
function popupWindow(url, title) {
    var popupWidth = 1200;
    var popupHeight = 820;
    var popupX = Math.round(window.screenX + (window.outerWidth/2) - (popupWidth/2));
    var popupY = Math.round(window.screenY + (window.outerHeight/2) - (popupHeight/1.85));    
    var featureWindow = "width=" + popupWidth + ", height="+popupHeight+ ", left=" + popupX + ", top=" + popupY;
    var options = 'status=no, menubar=no, toolbar=no, resizable=no, scrollbars=yes, location=no';	
    return window.open(url, title, featureWindow, options);
}


//input type reset
$(document).on("click","button[type=reset]",function(e){
	e.preventDefault();
	$(this).prev().children().val("");
	$(this).hide();	
});

// input type radio
function setDisplay(){
	if($('input:radio[id=rdo_02]').is(':checked')){
		$('.rdo_area01').hide();
		$('.rdo_area02').show();
	}else{
		$('.rdo_area01').show();
		$('.rdo_area02').hide();
	}
}

$(window).on('load', function () {
	$(".gis_pop").length && gisPopup(); //GIS팝업
	$(".gis_pop.small").length && gisPopupSmall(); //GIS small팝업
	
	//GIS 
	$(".btn_oc_area > a").click(function(){
		$(this).attr('role', 'button');
		var oc_text = $(this).find('.blind');
		var oc_btn = $(this).hasClass('active');
		if(oc_btn){
			$(this).removeClass('active');
			$("#gis_info_wrap").removeClass('on');	
            $(this).attr('aria-expanded', 'true');
			oc_text.text('닫기');
			$(".btn_close_simp").show();	
		}else{
			$(this).addClass('active');
			$("#gis_info_wrap").addClass('on');	
            $(this).attr('aria-expanded', 'false');
			oc_text.text('열기');
			$(".btn_close_simp").hide();	
		}
	});

	$(".btn_open_simp").click(function(){
		$(".gis_info_simp").fadeIn(350);
	});

	$(".gis_info_simp .btn_close_simp").click(function(){
		$(this).parent().hide();
	});

	$(".gis_info_simp_sec .btn_close_simp").click(function(){
		$(this).parent().hide();
	});

	// $(".gis_around_wrap").on({
	// 	mouseover : function(){
	// 		$(this).addClass('on');
	// 	},
	// 	mouseleave : function(){
	// 		$(this).removeClass('on');
	// 	},
	// });
	// $(".gis_around_btn > a").click(function(e) {
	// 	$('.gis_around_wrap').toggleClass('on'); 
    // });
	
	$(".gis_bot_btn.btn03").click(function(){
		$(this).toggleClass('on');
		$(this).next().toggleClass('active');
	});
	$(".gis_distance > li > a").click(function(){
		$(this).addClass('on');
		$(this).parent().siblings().children().removeClass('on');
	});
	$(".gis_map_fac_info > .close").click(function(e) {
		$(this).parent().hide(); 
    });	
	$(".fac_mark_info > .close").click(function(e) {
		$(this).parent().hide(); 
		$(this).parent().parent(".fac_mark").removeClass("on"); 
    });	
	$(".gis_map_dist_circle .gis_map_dist_info > .close, .gis_map_dist_square .gis_map_dist_info > .close").click(function(e) {
		$(this).parent().hide(); 
		$(this).parent().parent().hide(); 
    });	
	$(document).mouseup(function (e){
		var mapFacInfo = $(".gis_map_fac_info");
		if(mapFacInfo.has(e.target).length === 0) {
			mapFacInfo.hide();
		} 
	});
	$(".gis_info_facility > ul > li > a, .gis_around_ov > ul > li > a, .gis_info_fac_list ul > li > button").click(function(e) {
		$(this).parent().toggleClass('on'); 
    });
	$(".gis_sate > ul > li > a").click(function(e) {
		$(this).parent().addClass('on'); 
		$(this).parent().siblings().removeClass('on'); 
    });
	$(".btn_gis_dtl").click(function(){
		$(this).attr('role', 'button');
		var dtl_text = $(this).children('.blind');
		var dtl_btn = $(this).hasClass('active');
		if(dtl_btn){
			$(this).removeClass('active');
			$(".gis_dtl_checkbox").removeClass('open');	
            $(this).attr('aria-expanded', 'false');
			dtl_text.text('열기');
		}else{
			$(this).addClass('active');
			$(".gis_dtl_checkbox").addClass('open');	
            $(this).attr('aria-expanded', 'true');
			dtl_text.text('닫기');
		}
	});
	$('.rdo_area02').hide();

	$('.gis_info_fac_list h5 > .tool_pc').hover(function() {   
	    $(this).next().addClass("on");
    }, function(){
	    $(this).next().removeClass("on");
    });
	
	//input reset
	$("button[type=reset]").hide();	
	$(".input_txt").keydown(function(e) {
		$(this).parent().next().show();
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
					var $wrap = $inp.parent();
					if($wrap.hasClass("otherCheck")) {
						$wrap = $wrap.parent();
					}
					if($wrap.find("input:checkbox[name=allCheck]").size() == 1) {
						if(name == "allCheck") {
							if($inp.is(":checked")) {
								$wrap.find("input[name!=allCheck]:checkbox").each(function() {
									$(this).prop("checked", true);
									$(this).next().addClass("on");
								});
							} else {
								$wrap.find("input:checkbox").each(function() {
									$(this).prop("checked", false);
									$(this).next().removeClass("on");
								});
							}
						} else {
							var cnt1 = $wrap.find("input[name!=allCheck]").size();
							var cnt2 = $wrap.find("input[name!=allCheck]:checked").size();
							if(cnt1 == cnt2) {
								$wrap.find("input[name=allCheck]").prop("checked", true);
								$wrap.find("input[name=allCheck]").next().addClass("on");
							} else {
								$wrap.find("input[name=allCheck]").prop("checked", false);
								$wrap.find("input[name=allCheck]").next().removeClass("on");
							}
						}
					}
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

	// PC Tab
	$('.tab_title ul li').on('click', function(){
		var onTab = $(this).attr('aria-controls');
		$(".gis_info_simp").hide();

		$(this).parent('.tab_title ul').children('li').removeClass('active').children('button').attr('aria-selected',false);
		$(this).parent().parent('.tab_title').siblings('.tab_cont').children('.box_tab-contents').removeClass('active').attr({
			'hidden' : true,
		});
		$(this).addClass('active').children('button').attr('aria-selected',true);
		$('#' + onTab).addClass('active').attr({
			'hidden' : false,
		});
	})
	
	// PC 최근 검색어 드롭다운 (임시) 
	$(".gis_info_top .input_txt").click(function(e) {
		$('.gis_input_list').addClass('on'); 
    });


	//모바일 전용
	$(function(){
		var gisBot = $('.gis_m #gis_info_wrap');
		var btnHome = $('.gis_m #gis_top_wrap > h1');
		var btnBack = $('.gis_m #gis_top_wrap > .top_btn.back');	
		var btnClose = $('.gis_m #gis_top_wrap > .top_btn.close');	
		var btnMap = $('.gis_m #gis_top_wrap > .top_btn.map');	
		var btnList = $('.gis_m #gis_top_wrap > .top_btn.list');	
		var inputSrch = $('.gis_m #gis_top_wrap .input_txt');
		var inputBtn = $('.gis_m .gis_ico_search');
		var gisPop = $('.gis_m .gis_pop');
		gisBot.hide(); 

		inputSrch.click(function(e) {
			gisBot.show(); 
			btnHome.hide(); 
			btnBack.addClass("on"); 
			btnClose.removeClass("on"); 
			btnMap.removeClass("on"); 	
		});

		inputSrch.keydown(function(e) {
			btnClose.addClass("on"); 
			btnBack.removeClass("on"); 
			btnMap.removeClass("on"); 		    
		});

		btnBack.click(function(e) {
			gisBot.hide(); 
			btnHome.show(); 
			$(this).removeClass("on"); 
			btnMap.removeClass("on"); 	
		});

		btnClose.click(function(e) {
			gisBot.hide(); 
			btnHome.show(); 
			$(this).removeClass("on"); 
			btnBack.removeClass("on"); 
			btnMap.removeClass("on"); 		
			inputSrch.val("");
			inputSrch.parent().next().hide();	
		});

		inputBtn.click(function(e) {
			gisBot.show(); 
			btnMap.addClass("on"); 
			btnHome.hide(); 
			btnBack.removeClass("on"); 
			btnClose.removeClass("on"); 
			btnList.removeClass("on"); 
		});

		btnMap.click(function(e) {
			gisBot.hide(); 
			btnHome.hide(); 
			$(this).removeClass("on"); 
			btnBack.removeClass("on"); 
			btnClose.removeClass("on"); 
			btnList.addClass("on"); 
		});

		btnList.click(function(e) {
			gisBot.show(); 
			$(this).removeClass("on"); 
			btnHome.hide(); 
			btnBack.removeClass("on"); 
			btnClose.removeClass("on"); 
			btnMap.addClass("on"); 		
		});

	});

	$(".gis_pop.small > .close").click(function(){
		$(this).parent().fadeOut(150);
	});

	$(".gis_m .gis_btn > li > a.guide, .gis_m .gis_btn > li > ul > li > a").click(function(){
		$(this).parent().toggleClass("on");
	});

	$(".gis_m .gis_info_fac_list h5 > .tool_m").click(function() {		
			$(this).next().toggleClass('on');
	});

	$(".gis_m .gis_info_fac_list .tooltip > button").click(function() {		
			$(this).parent().removeClass('on');
	});
});

