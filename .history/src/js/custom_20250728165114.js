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

// Ініціалізація елементів із унікальними ID
document.querySelectorAll(".bubble-animation .item").forEach((item) => {
	item.setAttribute("data-flip-id", generateFlipId());
});

setInterval(() => {
	// 1. Знімаємо попередній стан
	const state = Flip.getState(".item", { props: "opacity, zIndex" });

	// 2. Додаємо новий елемент на початок
	const items = container.querySelectorAll(".item");
	const last = items[items.length - 1];
	if (last) {
		const clone = last.cloneNode(true);
		clone.setAttribute("data-flip-id", generateFlipId());
		clone.style.opacity = "0"; // Новий елемент невидимий
		clone.style.zIndex = "0"; // Новий елемент позаду
		container.insertBefore(clone, container.firstChild);

		// Оновлюємо z-index для всіх елементів
		const newItems = container.querySelectorAll(".item");
		newItems.forEach((item, index) => {
			item.style.zIndex = newItems.length - index; // Передній елемент має найвищий z-index
			item.style.opacity = index === 0 ? "1" : "0"; // Тільки перший елемент видимий
		});

		// 3. Видаляємо зайві елементи (залишаємо не більше 4)
		if (newItems.length > 4) {
			newItems[newItems.length - 1].remove();
		}
	}

	// 4. Анімація переходу (Flip)
	Flip.from(state, {
		targets: ".item",
		ease: "sine.inOut",
		absolute: true,
		duration: 0.8,
		props: "opacity, zIndex", // Анімуємо тільки opacity і zIndex
		onEnter: (el) => {
			gsap.fromTo(
				el,
				{ opacity: 0, zIndex: 0 },
				{ opacity: 1, zIndex: 4, ease: "sine.out", duration: 0.8 }
			);
		},
		onLeave: (el) => {
			gsap.to(el, {
				opacity: 0,
				zIndex: 0,
				ease: "sine.out",
				duration: 0.8,
				onComplete: () => {
					if (el.parentNode) {
						el.parentNode.removeChild(el);
					}
				},
			});
		},
	});
}, 3000);