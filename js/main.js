const searchBar = () => {
	$('.nav-search').css({'display': 'none'});

	const searchHeight = $('.navbar').offset().top;
	const windowHeight = $(this).scrollTop();

	if (windowHeight >= searchHeight) {
		$('.nav-search').fadeIn(200, () => {
			$('.nav-search').css({'display': 'flex'});
		});
	} 

	$(window).scroll(() => {
		const searchHeight = $('.navbar').offset().top;
		const windowHeight = $(this).scrollTop();

		if (windowHeight >= searchHeight) {
			$('.nav-search').fadeIn(200, () => {
				$('.nav-search').css({'display': 'flex'});
			});
		} else {
			$('.nav-search').fadeOut(200);
		}
	});
}

const scrollUp = () => {
	$('.up-arrow').css({'display': 'none'});

	const windowHeight = $(this).scrollTop();

	if (windowHeight > 0) {
		$('.up-arrow').fadeIn(200, () => {
			$('.up-arrow').css({'display': 'flex'});
		});
	} 

	$(window).scroll(() => {
		const windowHeight = $(this).scrollTop();

		if (windowHeight > 0) {
			$('.up-arrow').fadeIn(200, () => {
				$('.up-arrow').css({'display': 'flex'});
			});
		} else {
			$('.up-arrow').fadeOut(200);
		}
	});

	$('.up-arrow').click(() => {
		$('html, body').animate({ scrollTop: 0 }, 300);
	});
}

window.onload = () => {
	searchBar();
	scrollUp();
}