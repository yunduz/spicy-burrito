jQuery(document).ready(function($) {

	$(".fs-mobile-trigger, .fs-mobile-trigger + .menu-slide").click(function(e){
		e.preventDefault();

		$('.fs-mobile-trigger').toggleClass('open');

		// slide down mobile menu
		// $('.mobile-nav-container').stop(true, true).slideToggle(200);
		// end slide down mobile menu

		// transition from right mobile menu 
		$('.mobile-nav-container').toggleClass('open');
		// end transition from right mobile menu 

	});

	$("#mobile-nav > li").find('.sub-menu').parent().children('a').after('<span class="menu-slide"></span>');

	$("#mobile-nav > li .menu-slide").on('click',function(e){
		$(this).toggleClass('open');
		e.preventDefault();
		e.stopPropagation();

		$(this).siblings('.sub-menu').stop(true, true).slideToggle(200);
	});

	// $('.slider').flexslider({
	// 	animation: "slide"
	// });



	var selector = '#news-nav li a';

	$(selector).click(function(){
	    $(selector).removeClass('active');
	    $(this).addClass('active');
	});




});