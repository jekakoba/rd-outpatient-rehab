import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

class ScrollAnimations {
	constructor(selectors) {
		this.selectors = selectors;
		this.init();
	}

	init() {
		const cards = document.querySelectorAll(this.selectors.cards);
		cards.forEach((card, index) => {
			ScrollTrigger.create({
				trigger: card,
				start: "top",
				end: () => `+=${card.offsetHeight}`,
				pin: true,
				pinSpacing: false,
				id: `card-${index}`,
			});
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new ScrollAnimations({
		cards: "[data-card-sticky]",
	});
});

// 	constructor(selectors) {
// 		this.selectors = selectors;
// 		this.init();
// 	}

// 	init() {
// 		const wrapper = document.querySelector(this.selectors.wrapper);
// 		ScrollTrigger.create({
// 			trigger: wrapper,
// 			start: "top top",
// 			end: () => `+=${wrapper.offsetHeight}`,
// 			pin: true,
// 			pinSpacing: false,
// 			id: "wrapper-pin",
// 		});
// 	}
// }

// document.addEventListener("DOMContentLoaded", () => {
// 	new ScrollAnimations({
// 		wrapper: "[data-pin-wrapper]",
// 	});
// });