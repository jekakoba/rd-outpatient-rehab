import Swiper from 'swiper';
import { Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules';

function initSliders() {
	if (document.querySelectorAll('[data-swiper]').length > 0) {
		document.querySelectorAll('[data-swiper]').forEach(slider => {
			const paginationContainer = document.createElement('div');
			paginationContainer.classList.add('swiper-pagination-hidden');
			paginationContainer.style.display = 'none';
			slider.appendChild(paginationContainer);
			const config = {
				modules: [Navigation, EffectFade],
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 400,
				grabCursor: false,
				autoHeight: true,
				effect: 'fade',
				loop: true,
				allowTouchMove: false,
				fadeEffect: {
					crossFade: true,
				},
				navigation: {
					prevEl: slider.querySelector('[data-prev-slide]'),
					nextEl: slider.querySelector('[data-next-slide]'),
				},
			};
			const swiper = new Swiper(slider, config);
			swiper.on('slideChange', function () {
				const current = swiper.realIndex + 1;
				const total = swiper.slides.length;
				const formattedCurrent = current < 10 ? `0${current}` : current;
				const formattedTotal = total < 10 ? `0${total}` : total;
				slider.querySelectorAll('.swiper-fractions').forEach(fractionEl => {
					fractionEl.innerHTML = `${formattedCurrent}/${formattedTotal}`;
				});
			});
			const current = swiper.realIndex + 1;
			const total = swiper.slides.length;
			const formattedCurrent = current < 10 ? `0${current}` : current;
			const formattedTotal = total < 10 ? `0${total}` : total;
			slider.querySelectorAll('.swiper-fractions').forEach(fractionEl => {
				fractionEl.innerHTML = `${formattedCurrent}/${formattedTotal}`;
			});

			return swiper;
		});
	}
	if (document.querySelectorAll('[data-swiper-card]').length > 0) {
		document.querySelectorAll('[data-swiper-card]').forEach(sliderProject => {
			const config = {
				modules: [Navigation, EffectFade, Pagination],
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 400,
				effect: 'fade',
				loop: true,
				allowTouchMove: false,
				fadeEffect: {
					crossFade: true,
				},
				navigation: {
					prevEl: sliderProject.querySelector('[data-prev-slide]'),
					nextEl: sliderProject.querySelector('[data-next-slide]'),
				},
				pagination: {
					el: '.pagination',
					dynamicBullets: true,
					clickable: true,
				},
			};
			const swiperCard = new Swiper(sliderProject, config);
			return swiperCard;
		});
	}
	if (document.querySelectorAll('[data-swiper-planning]').length > 0) {
		document.querySelectorAll('[data-swiper-planning]').forEach(sliderPlanning => {
			const isGrab = sliderPlanning.hasAttribute('data-swiper-grab');
			const config = {
				modules: [Navigation, EffectFade, Pagination],
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 400,
				effect: 'fade',
				loop: true,
				grabCursor: isGrab,
				allowTouchMove: isGrab,
				fadeEffect: {
					crossFade: true,
				},
				navigation: {
					prevEl: sliderPlanning.querySelector('[data-prev-slide]'),
					nextEl: sliderPlanning.querySelector('[data-next-slide]'),
				},

				pagination: {
					el: sliderPlanning.querySelector('.swiper-fractions'),
					type: 'fraction',
					formatFractionCurrent: number => (number < 10 ? `0${number}` : number),
					formatFractionTotal: number => (number < 10 ? `0${number}` : number),
				},
			};
			const swiperPlanning = new Swiper(sliderPlanning, config);
			return swiperPlanning;
		});
	}
	if (document.querySelector('[data-swiper-hero]')) {
		const config = {
			modules: [Navigation, Autoplay],
			observeParents: true,
			slidesPerView: 3,
			loop: true,
			spaceBetween: 32,
			speed: 600,
			allowTouchMove: false,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				prevEl: document.querySelector('[data-swiper-hero] [data-prev-slide]'),
				nextEl: document.querySelector('[data-swiper-hero] [data-next-slide]'),
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				991.98: {
					slidesPerView: 3,
				},
			},
			on: {
				init(swiper) {
					const activeSlide = swiper.slides[swiper.activeIndex];
					const progressBar = activeSlide.querySelector('.slide-hero__progress-line');
					if (progressBar) progressBar.style.width = '0%';
					const mediaQuery = window.matchMedia('(min-width: 767.98px)');
					if (mediaQuery.matches) {
						swiper.slides.forEach(slide => {
							slide.addEventListener('mouseenter', () => {
								if (swiper.activeIndex === swiper.slides.indexOf(slide)) {
									swiper.autoplay.pause();
									const activeProgressBar = slide.querySelector('.slide-hero__progress-line');
									if (activeProgressBar) {
										activeProgressBar.style.transition = 'none';
									}
								}
							});
							slide.addEventListener('mouseleave', () => {
								if (swiper.activeIndex === swiper.slides.indexOf(slide)) {
									swiper.autoplay.resume();
									const activeProgressBar = slide.querySelector('.slide-hero__progress-line');
									if (activeProgressBar) {
										activeProgressBar.style.transition = '';
									}
								}
							});
						});
					}
				},
				slideChange(swiper) {
					const previousSlide = swiper.slides[swiper.previousIndex];
					if (previousSlide) {
						const progressBar = previousSlide.querySelector('.slide-hero__progress-line');
						if (progressBar) progressBar.style.width = '0%';
					}
				},
				autoplayTimeLeft(swiper, time) {
					const activeSlide = swiper.slides[swiper.activeIndex];
					const progressBar = activeSlide.querySelector('.slide-hero__progress-line');
					if (!progressBar) return;
					const progress = 100 - (time / swiper.params.autoplay.delay) * 100;
					progressBar.style.width = `${progress}%`;
				},
			},
		};
		const swiperHero = new Swiper(document.querySelector('[data-swiper-hero]'), config);
		return swiperHero;
	}
}

window.addEventListener('load', function () {
	initSliders();
});