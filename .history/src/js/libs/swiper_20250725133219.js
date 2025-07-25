import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

function initSliders() {
	if (document.querySelectorAll('[data-slider] .swiper').length > 0) {
		document.querySelectorAll('[data-slider] .swiper').forEach(slider => {
			const navigationContainers = slider.parentElement.querySelectorAll('.swiper-navigation');
			let prevEl, nextEl;

			// Вибираємо перший видимий .swiper-navigation
			navigationContainers.forEach(container => {
				if (window.getComputedStyle(container).display !== 'none') {
					prevEl = container.querySelector('.swiper-navigation__btn_prev');
					nextEl = container.querySelector('.swiper-navigation__btn_next');
				}
			});
			// Якщо кнопки не знайдені, використовуємо запасний варіант
			if (!prevEl || !nextEl) {
				prevEl = slider.parentElement.querySelector('.block-silder__header .swiper-navigation__btn_prev');
				nextEl = slider.parentElement.querySelector('.block-silder__header .swiper-navigation__btn_next');
			}
			const config = {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 3,
				spaceBetween: 12,
				speed: 400,
				navigation: {
					prevEl: prevEl,
					nextEl: nextEl,
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