import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

function initSliders() {
	if (document.querySelectorAll('[data-slider] .swiper').length > 0) {
		document.querySelectorAll('[data-slider] .swiper').forEach(slider => {
			const config = {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 3,
				spaceBetween: 2,
				speed: 400,
				navigation: {
					prevEl: slider.parentElement.querySelector('.swiper-navigation__btn_prev'),
					nextEl: slider.parentElement.querySelector('.swiper-navigation__btn_next'),
				},
			};
			const swiperCard = new Swiper(slider, config);
			return swiperCard;
		});
	}
}

window.addEventListener('load', function () {
	initSliders();
});