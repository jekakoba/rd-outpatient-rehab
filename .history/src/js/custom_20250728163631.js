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
	const state = Flip.getState(".item");

	// 2. Видаляємо останній елемент і додаємо новий на початок
	const items = container.querySelectorAll(".item");
	const last = items[items.length - 1];
	if (last) {
		const clone = last.cloneNode(true);
		clone.setAttribute("data-flip-id", generateFlipId()); // Унікальний ID для клону
		clone.style.display = ""; // Переконуємося, що елемент видимий
		container.insertBefore(clone, container.firstChild);

		// 3. Обмежуємо кількість елементів (наприклад, не більше 4)
		if (items.length >= 4) {
			last.remove(); // Видаляємо останній елемент
		}
	}

	// 4. Анімація переходу (Flip)
	Flip.from(state, {
		targets: ".item",
		ease: "sine.inOut",
		absolute: true,
		duration: 0.8,
		onEnter: (el) => {
			gsap.from(el, {
				yPercent: 20,
				opacity: 0,
				ease: "sine.out",
				duration: 0.8,
			});
		},
		onLeave: (el) => {
			gsap.to(el, {
				yPercent: 20,
				opacity: 0,
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