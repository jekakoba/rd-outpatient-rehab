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

// Функція для генерації унікального ID
let idCounter = 0;
function generateFlipId() {
	return `item-${idCounter++}`;
}

// Ініціалізація елементів із унікальними ID і встановлення активної картки
document.querySelectorAll(".bubble-animation .item").forEach((item, index) => {
	item.setAttribute("data-flip-id", generateFlipId());
	if (index === 0) {
		item.classList.add("active"); // Перша картка активна
	}
});

setInterval(() => {
	// 1. Знімаємо попередній стан
	const state = Flip.getState(".item", { props: "opacity, zIndex" });

	// 2. Знаходимо активну картку
	const activeItem = container.querySelector(".item.active");
	const items = container.querySelectorAll(".item");

	if (items.length > 0) {
		// 3. Створюємо клон останньої картки
		const last = items[items.length - 1];
		const clone = last.cloneNode(true);
		clone.setAttribute("data-flip-id", generateFlipId());
		clone.style.opacity = "0"; // Новий елемент невидимий
		clone.style.zIndex = "0"; // Новий елемент позаду
		clone.classList.remove("active"); // Клон не активний
		container.insertBefore(clone, container.firstChild);

		// 4. Оновлюємо активну картку
		if (activeItem) {
			activeItem.classList.remove("active"); // Знімаємо активний клас зі старої картки
		}
		const newActive = container.querySelector(".item:first-child");
		newActive.classList.add("active"); // Нова картка стає активною

		// 5. Видаляємо зайві елементи (залишаємо не більше 4)
		const newItems = container.querySelectorAll(".item");
		if (newItems.length > 4) {
			newItems[newItems.length - 1].remove();
		}

		// 6. Анімація переходу (Flip)
		Flip.from(state, {
			targets: ".item",
			ease: "sine.inOut",
			absolute: true,
			duration: 0.8,
			props: "opacity, zIndex",
			onEnter: (el) => {
				gsap.fromTo(
					el,
					{ opacity: 0, zIndex: 0 },
					{ opacity: 1, zIndex: 10, ease: "sine.out", duration: 0.8 }
				);
			},
			onLeave: (el) => {
				gsap.to(el, {
					opacity: 0,
					zIndex: 0,
					ease: "sine.out",
					duration: 0.8,
					onComplete: () => {
						if (el.parentNode && !el.classList.contains("active")) {
							el.parentNode.removeChild(el);
						}
					},
				});
			},
		});
	}
}, 3000);