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

const registrationOpen = () => {
	const regForm = $('#registration-form');
	const openBtn = $('#open-reg-form');
	const bgMask = $('#bg-mask');

	openBtn.click(function (e) {
		e.preventDefault();

		regForm.css({'display': 'flex', 'opacity': 0});
		regForm.animate({'opacity': 1}, 400, () => {
			regForm.addClass('d-md-flex').removeAttr('style');

			const closeForm = () => {
				regForm.animate({'opacity': 0}, 400, () => {
					regForm.removeClass('d-md-flex').removeAttr('style');

					$(document).unbind('keyup');
					bgMask.unbind('click');
				});
			}

			$(document).keyup(function(e) { 
			    if (e.which == 27) closeForm();
			});

			bgMask.click(closeForm);
		});
	});
}

const registrationReset = () => {
	const formElements = {
		firstnameElem: $('#firstname'),
		lastnameElem: $('#lastname'),
		emailElem: $('#email'),
		passwordElem: $('#password'),
		passwordConfirmElem: $('#password-confirm'),
		birthdateElem: $('#birthdate'),
		phoneElem: $('#phone'),
		termsElem: $('#terms'),
	};

	for (const index in formElements) {
		const elem = formElements[index];
		elem.val('');
		elem.removeClass('error success');
	}

	$('[id^=gender_]').removeAttr('checked');
	$('#gender-male').attr('checked', true);

	$('#registration-form select:first-child').attr('selected', true);

	formElements.termsElem[0].checked = false;

	$('#registration-form input[type=submit]').attr('disabled', true);

	return formElements;
}

const registrationValidate = () => {
	const formElements = registrationReset();

	const check = () => {
		const buttonElem = $('#registration-form input[type=submit]');

		for (const index in formElements) {
			const elem = formElements[index];

			if (elem.hasClass('error') || !elem.hasClass('success')) {
				buttonElem.attr('disabled', true);
				return;
			}
		}

		if (!formElements.termsElem[0].checked) {
			buttonElem.attr('disabled', true);
			return;
		}

		buttonElem.removeAttr('disabled');
	};

	formElements.firstnameElem.keyup(() => {
		const value = formElements.firstnameElem.val();

		if (!value) {
			formElements.firstnameElem.removeClass('error success');
			return;
		}

		const regEx = /[^a-zA-Z]/;

		if((value.length - 2) * (value.length - 14) > 0 || regEx.test(value)) {
			formElements.firstnameElem.removeClass('success');
			formElements.firstnameElem.addClass('error');
		} else {
			formElements.firstnameElem.removeClass('error');
			formElements.firstnameElem.addClass('success');
		}

		check();
	});

	formElements.lastnameElem.keyup(() => {
		const value = formElements.lastnameElem.val();

		if (!value) {
			formElements.lastnameElem.removeClass('error success');
			return;
		}

		const regEx = /[^a-zA-Z]/;

		if((value.length - 2) * (value.length - 14) > 0 || regEx.test(value)) {
			formElements.lastnameElem.removeClass('success');
			formElements.lastnameElem.addClass('error');
		} else {
			formElements.lastnameElem.removeClass('error');
			formElements.lastnameElem.addClass('success');
		}

		check();
	});

	formElements.emailElem.keyup(() => {
		const value = formElements.emailElem.val();

		if (!value) {
			formElements.emailElem.removeClass('error success');
			return;
		}

		const regEx = /^[a-zA-Z][a-zA-Z0-9]*[_||\.]?[a-zA-Z0-9]*\@[a-z]+\.[a-z]{2,5}$/;

		if(!regEx.test(value)) {
			formElements.emailElem.removeClass('success');
			formElements.emailElem.addClass('error');
		} else {
			formElements.emailElem.removeClass('error');
			formElements.emailElem.addClass('success');
		}

		check();
	});

	formElements.passwordElem.keyup(() => {
		const value = formElements.passwordElem.val();

		if (!value) {
			formElements.passwordElem.removeClass('error success');
			return;
		}

		const regEx = /[^a-zA-Z0-9]/;

		if(value.length < 4 || regEx.test(value)) {
			formElements.passwordElem.removeClass('success');
			formElements.passwordElem.addClass('error');
		} else {
			formElements.passwordElem.removeClass('error');
			formElements.passwordElem.addClass('success');
		}

		check();
	});

	formElements.passwordConfirmElem.keyup(() => {
		const valuePass = formElements.passwordElem.val();
		const valueConf = formElements.passwordConfirmElem.val();

		if (!valueConf) {
			formElements.passwordConfirmElem.removeClass('error success');
			return;
		}

		if(valuePass !== valueConf) {
			formElements.passwordConfirmElem.removeClass('success');
			formElements.passwordConfirmElem.addClass('error');
		} else {
			formElements.passwordConfirmElem.removeClass('error');
			formElements.passwordConfirmElem.addClass('success');
		}

		check();
	});

	formElements.birthdateElem.change(() => {
		const value = formElements.birthdateElem.val();

		if (!value) {
			formElements.birthdateElem.removeClass('error success');
			return;
		}

		const valueDate = new Date(value);
		const startDate = new Date('1900-01-01');
		const endDate = new Date();

		if(valueDate < startDate || valueDate > endDate) {
			formElements.birthdateElem.removeClass('success');
			formElements.birthdateElem.addClass('error');
		} else {
			formElements.birthdateElem.removeClass('error');
			formElements.birthdateElem.addClass('success');
		}

		check();
	});

	formElements.phoneElem.keyup(() => {
		const value = formElements.phoneElem.val();

		if (!value) {
			formElements.phoneElem.removeClass('error success');
			return;
		}

		const regEx = /^[0-9]{9}$/;

		if(!regEx.test(value)) {
			formElements.phoneElem.removeClass('success');
			formElements.phoneElem.addClass('error');
		} else {
			formElements.phoneElem.removeClass('error');
			formElements.phoneElem.addClass('success');
		}

		check();
	});

	formElements.termsElem.change(() => {
		const checked = formElements.termsElem[0].checked;

		if(!checked) {
			formElements.termsElem.removeClass('success');
			formElements.termsElem.addClass('error');
		} else {
			formElements.termsElem.removeClass('error');
			formElements.termsElem.addClass('success');
		}

		check();
	});
}

window.onload = () => {
	searchBar();
	scrollUp();
	registrationOpen();
	registrationValidate();

	$('#reset-form--registration').click(registrationReset);
}