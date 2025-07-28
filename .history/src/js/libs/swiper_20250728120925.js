import Swiper from 'swiper';
import Marquee from './marque.js';
import { Autoplay, EffectCards, Navigation } from 'swiper/modules';

function initSliders() {
	if (document.querySelectorAll('[data-slider] .swiper').length > 0) {
		document.querySelectorAll('[data-slider] .swiper').forEach(slider => {

			const headerNavigation = slider.parentElement.querySelector('.block-silder__header .swiper-navigation');
			const bottomNavigation = slider.parentElement.querySelector('.block-silder__bottom .swiper-navigation');

			const prevButtons = [];
			const nextButtons = [];

			if (headerNavigation) {
				prevButtons.push(headerNavigation.querySelector('.swiper-navigation__btn_prev'));
				nextButtons.push(headerNavigation.querySelector('.swiper-navigation__btn_next'));
			}
			if (bottomNavigation) {
				prevButtons.push(bottomNavigation.querySelector('.swiper-navigation__btn_prev'));
				nextButtons.push(bottomNavigation.querySelector('.swiper-navigation__btn_next'));
			}
			const config = {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 3,
				spaceBetween: 12,
				speed: 400,
				autoHeight: false,
				allowTouchMove: false,
				navigation: {
					prevEl: prevButtons,
					nextEl: nextButtons,
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
						autoHeight: true,
					},
					768.98: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
						autoHeight: false,
					},
				}
			};

			const swiperCard = new Swiper(slider, config);
			return swiperCard;
		});
	}
	if (document.querySelectorAll('[data-swiper-carousel-reviews]').length > 0) {
		document.querySelectorAll('[data-swiper-carousel-reviews]').forEach(slider => {
			const config = {
				modules: [EffectCards, Autoplay],
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 12,
				speed: 600,
				effect: 'cards',
				loop: true,
				cenetredSlides: true,

				cardsEffect: {
					perSlideRotate: 2,
					perSlideOffset: 8,
					slideShadows: false,
				},
				// loop: true,
				grabCursor: true,
				// autoplay: {
				// 	delay: 1000,
				// },
			};

			const swiperCarouselReviews = new Swiper(slider, config);
			return swiperCarouselReviews;
		});
	}
}
function customersSlider() {
	const customersSlider = document.querySelector('.reviews__slider')
	if (!customersSlider) return null
	return new Swiper(customersSlider, {
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 800,
		autoHeight: true,
		loop: true,
		navigation: {
			prevEl: '[data-prev-slide]',
			nextEl: '[data-next-slide]',
		},
	})
}
function changeSliders(sliderFunc, breakpoint) {
	let currentMode = null
	let sliderInstance = null
	let marquee = null
	function handleResize() {
		const isMobile = document.documentElement.clientWidth <= breakpoint
		const newMode = isMobile ? 'mobile' : 'desktop'
		if (newMode !== currentMode) {
			if (isMobile) {
				// fixSwiperStructure(true)
				sliderInstance = sliderFunc()
				if (marquee) {
					marquee.destroy()
					marquee = null
				}
				// console.log(window.destroy);
				// window.destroy()
			} else {
				if (sliderInstance) {
					sliderInstance.destroy(true, true)
					sliderInstance = null
				}
				// fixSwiperStructure(false)
				if (!marquee) {
					marquee = new Marquee({
						parent: '[data-marquee]',
					})
				}
			}
			currentMode = newMode
		}
	}
	handleResize()
	window.addEventListener('resize', debounce(handleResize, 200))
}
function debounce(func, wait) {
	let timeout
	return function (...args) {
		clearTimeout(timeout)
		timeout = setTimeout(() => func.apply(this, args), wait)
	}
}

window.addEventListener('load', function () {
	initSliders();
	changeSliders(customersSlider, 767.98)
});