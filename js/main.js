window.onload = () => {
	$('.nav-search').hide();

	$(window).scroll(function() {
		const hT = $('.navbar').offset().top;
		const wS = $(this).scrollTop();

		if (wS >= hT){
			$('.nav-search').fadeIn(200, () => {
				$('.nav-search').css({'display': 'flex'});
			});
		} else {
			$('.nav-search').fadeOut(200);
		}
	});
}