import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

function initSliders() {
	if (document.querySelectorAll('[data-slider] .swiper').length > 0) {
		document.querySelectorAll('[data-slider] .swiper').forEach(slider => {
			const navigation = slider.parentElement.querySelectorAll('.swiper-navigation');
			console.log(navigation);
			const config = {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 3,
				spaceBetween: 12,
				speed: 400,
				navigation: {
					prevEl: slider.navigation.querySelector('.swiper-navigation__btn_prev'),
					nextEl: slider.navigation.querySelector('.swiper-navigation__btn_next'),
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
});