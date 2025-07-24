import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const panels = Array.from(document.querySelectorAll("[data-card-sticky]"));
const createScrollAnimation = () => {
	panels.forEach((panel, index) => {
		const isLast = index === panels.length - 1;
		gsap
			.timeline({
				scrollTrigger: {
					trigger: panel,
					start: "top top",
					scrub: true,
				}
			})
			.to(
				panel,
				{
					ease: "none",
					startAt: { filter: 'brightness(100%) blur(0px)' },
					filter: isLast ? "none" : "brightness(50%) blur(10px)",
					scale: 0.9
				},
				'<'
			)
	});
}


document.addEventListener("DOMContentLoaded", () => {
	createScrollAnimation();
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