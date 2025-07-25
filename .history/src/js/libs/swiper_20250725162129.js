import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

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
				navigation: {
					prevEl: prevButtons,
					nextEl: nextButtons,
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					768.98: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}
			};

			const swiperCard = new Swiper(slider, config);
			return swiperCard;
		});
	}
}



window.addEventListener('load', function () {
	initSliders();
	changeSliders(customersSlider, 767.98)
});