function addLoadedClass() {
	if (!document.documentElement.classList.contains('loading')) {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.classList.add('loaded');
			}, 0);
		});
	}
}
document.addEventListener("DOMContentLoaded", function (e) {
	addLoadedClass()
});



gsap.registerPlugin(Flip);

const container = document.querySelector(".bubble-animation");

setInterval(() => {
	// 1. Знімаємо попередній стан
	const state = Flip.getState(".item");

	// 2. Ховаємо останній і додаємо його копію на початок
	const last = container.querySelector(".item:last-child");
	if (last) {
		last.style.display = "none";

		const clone = last.cloneNode(true);
		clone.style.display = "";
		container.insertBefore(clone, container.firstChild);
	}

	// 3. Анімація переходу (Flip)
	Flip.from(state, {
		targets: ".item",
		ease: "sine.inOut",
		absolute: true,

		onEnter: (el) => {
			gsap.from(el, {
				yPercent: 20,
				opacity: 0,
				ease: "sine.out"
			});
		},

		onLeave: (el) => {
			gsap.to(el, {
				yPercent: 20,
				transformOrigin: "bottom left",
				opacity: 1,
				ease: "sine.out",
				onComplete: () => {
					el?.parentNode?.removeChild(el);
				}
			});
		}
	});
}, 3000);