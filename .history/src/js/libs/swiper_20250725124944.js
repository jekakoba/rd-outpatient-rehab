import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

function initSliders() {

	if (document.querySelectorAll('[data-slider]').length > 0) {
		document.querySelectorAll('[data-slider]').forEach(sliderCards => {
			const config = {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 3,
				spaceBetween: 30,
				speed: 400,
				navigation: {
					prevEl: sliderCards.querySelector('[data-prev-slide]'),
					nextEl: sliderCards.querySelector('[data-next-slide]'),
				},
			};
			const swiperCard = new Swiper(sliderCards, config);
			return swiperCard;
		});
	}
}

window.addEventListener('load', function () {
	initSliders();
});