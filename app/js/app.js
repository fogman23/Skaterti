document.addEventListener("DOMContentLoaded", function () {
	let isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	let body = document.querySelector('body');
	if (isMobile.any()) {
		body.classList.add('touch');
		let arrow = document.querySelectorAll('.arrow');
		for (i = 0; i < arrow.length; i++) {
			let thisLink = arrow[i].previousElementSibling;
			let subMenu = arrow[i].nextElementSibling;
			let thisArrow = arrow[i];

			thisLink.classList.add('parent');
			arrow[i].addEventListener('click', function () {
				subMenu.classList.toggle('open');
				thisArrow.classList.toggle('active');
			});
		}
	} else {
		body.classList.add('mouse');
	}

	$('.hamburger').click(function () {
		$(this).toggleClass('hamburger_active');
		$('.header-top-menu__common-list').toggleClass('header-top-menu__common-list_active');
	});

	$('.header-top-menu__profile-link:first-child').click(function (event) {
		event.preventDefault();
		$(".header-top-menu__city-selection").slideToggle(400);
	});

	if ($('body').hasClass('mouse')) {
		$('.header-top-menu__common-list').find('> li').hover(function () {
			$('.header-top-menu__common-list > li').not(this).find('ul').slideUp;
			$(this).find('ul').stop(true, true).slideToggle(400);
		});
		$('.header-bottom__menu-list').find('> li').hover(function () {
			$('.header-bottom__menu-list > li').not(this).find('ul').slideUp;
			$(this).find('ul').stop(true, true).slideToggle(400);
		});
	} else {
		$('.header-top-menu__common-list').find('> li').click(function () {
			$('.header-top-menu__common-list > li').not(this).find('ul').slideUp;
			$(this).find('ul').stop(true, true).slideToggle(400);
		});
		$('.header-bottom__menu-list').find('> li').click(function () {
			$('.header-bottom__menu-list > li').not(this).find('.ul').slideUp;
			$(this).find('.ul').stop(true, true).slideToggle(400);
		});
		$('.header-middle__services').click(function () {
			$('.header-middle__services-container').slideToggle(400);
		});
	}

	$('.slider__wrapper').slick({
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				arrows: false,
			}
		}]
	});

	$('.popular__items-home').slick({
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [{
				breakpoint: 1025,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					arrows: false,
					slidesToShow: 1,
				}
			}
		]
	});

	$('.certificates__items').slick({
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [{
			breakpoint: 768,
			settings: {
				arrows: false,
			}
		}]
	});

	$('.order__items').slick({
		arrows: false,
		vertical: true,
		verticalSwiping: true,
		infinite: false,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
			}
		}]
	});

	$('.product-gallery__image').slick({
		arrows: false,
		fade: true,
		speed: 500,
		swipe: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.product-gallery__carousel'
	});

	$('.product-gallery__carousel').slick({
		arrows: false,
		speed: 500,
		swipe: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		focusOnSelect: true,
		asNavFor: '.product-gallery__image',
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 3,
			}
		}]
	});

	$('#price-range').ionRangeSlider({
		type: "double",
		min: 0,
		max: 30000,
		from: 1500,
		to: 25600,
		grid: true
	});

	$(".faq__accordeon dd").hide().prev().click(function () {
		$(this).parents(".faq__accordeon").find("dd").not(this).slideUp().parents(".faq__accordeon dl").removeClass("active");
		$(this).next().not(":visible").slideDown().parents(".faq__accordeon dl").addClass("active");
	});

	$('input[name="d"]').click(function () {
		if ($('input[name="d"][value="d1"]').is(':checked')) {
			$('.order__pickup').slideDown('slow');
			$('.order__dispatch').slideUp('slow');
		} else {
			$('.order__dispatch').slideDown('slow');
			$('.order__pickup').slideUp('slow');
		};
	});

	$('input[name="p"]').click(function () {
		if ($('input[name="p"][value="p1"]').is(':checked')) {
			$('.order__payment-card').slideDown('slow');
		} else {
			$('.order__payment-card').slideUp('slow');
		};
	});

	$('[data-modal=order]').on('click', function () {
		$('.overlay, #order').fadeIn('slow');
		$('.order__items').slick('setPosition');
	});

	$('[data-modal=entry]').on('click', function () {
		$('.overlay, #modal-entry').fadeIn('slow');
	});

	$('[data-modal=registration]').on('click', function () {
		$('.overlay, #modal-registration').fadeIn('slow');
	});

	$('[data-modal=quickorder]').on('click', function () {
		$('.overlay, #modal-quickorder').fadeIn('slow');
	});

	$('[data-modal=success]').on('click', function () {
		$("#order__delivery-form, #order__dispatch-form, #order__recipient-form, #order__payment-form").submit(function () {
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: $(this).serialize()
			}).done(function () {
				$(this).find("input").val("");
				$('#order').fadeOut('slow');
				$('#success').fadeIn('slow');
				$("#order__delivery-form, #order__dispatch-form, #order__recipient-form, #order__payment-form").trigger("reset");
			});
			return false;
		});
		$('#order').fadeOut('slow');
		$('#success').fadeIn('slow');
	});

	$('.modal__close').on('click', function () {
		$('.overlay, #order, #success, #modal-callback, #modal-entry, #modal-registration, #modal-quickorder').fadeOut('slow');
	});

	$("#callback-form").submit(function () {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('.overlay, #callback-modal').fadeIn('slow');
			$("#callback-form").trigger("reset");
		});
		return false;
	});

	$('ul.product-card__tabs').on('click', 'li:not(.product-card__tab-active)', function () {
		$(this)
			.addClass('product-card__tab-active').siblings().removeClass('product-card__tab-active')
			.closest('div.product-card__tabs-container').find('.product-card__content').removeClass('product-card__content-active').eq($(this).index()).addClass('product-card__content-active');
	});

});