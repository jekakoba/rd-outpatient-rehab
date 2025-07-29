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



// gsap.registerPlugin(Flip);

// const container = document.querySelector(".bubble-animation");

// // Функція для генерації унікального ID
// let idCounter = 0;
// function generateFlipId() {
// 	return `item-${idCounter++}`;
// }

// // Ініціалізація елементів із унікальними ID
// document.querySelectorAll(".bubble-animation .item").forEach((item) => {
// 	item.setAttribute("data-flip-id", generateFlipId());
// });

// setInterval(() => {
// 	// 1. Отримати поточний стан
// 	const state = Flip.getState(".item", { props: "opacity, zIndex, transform" });

// 	// 2. Додати новий елемент на початок
// 	const items = container.querySelectorAll(".item");
// 	const last = items[items.length - 1];
// 	if (last) {
// 		const clone = last.cloneNode(true);
// 		clone.setAttribute("data-flip-id", generateFlipId());
// 		clone.style.opacity = "0";
// 		clone.style.transform = "translateY(0) scale(0.7)";
// 		clone.style.zIndex = "1";
// 		container.insertBefore(clone, container.firstChild);

// 		// Оновити стилі всіх елементів
// 		const newItems = container.querySelectorAll(".item");
// 		newItems.forEach((item, index) => {
// 			const scale = 1 - (index * 0.1);
// 			const translateY = index * -20 + "px";
// 			const opacity = index === 0 ? 1 : 1 - (index * 0.2); // Перша картка завжди 1
// 			const zIndex = newItems.length - index;

// 			item.style.transform = `translateY(${translateY}) scale(${scale})`;
// 			item.style.opacity = opacity;
// 			item.style.zIndex = zIndex;

// 			if (index === 0) {
// 				item.style.opacity = "1"; // Гарантуємо повну непрозорість для першої картки
// 			}
// 		});

// 		// 3. Видалити зайві елементи (залишити максимум 4)
// 		if (newItems.length > 4) {
// 			newItems[newItems.length - 1].remove();
// 		}
// 	}

// 	// 4. Анімація переходу
// 	Flip.from(state, {
// 		targets: ".item",
// 		ease: "sine.inOut",
// 		absolute: true,
// 		duration: 0.8,
// 		props: "opacity, zIndex, transform",
// 		onEnter: (el) => {
// 			gsap.fromTo(
// 				el,
// 				{ opacity: 0, transform: "translateY(0) scale(0.7)", zIndex: 1 },
// 				{ opacity: 1, transform: "translateY(0) scale(1)", zIndex: 4, ease: "sine.out", duration: 0.8 }
// 			);
// 		},
// 		onLeave: (el) => {
// 			gsap.to(el, {
// 				opacity: 0,
// 				transform: `translateY(-60px) scale(0.7)`,
// 				zIndex: 1,
// 				ease: "sine.out",
// 				duration: 0.8,
// 				onComplete: () => {
// 					if (el.parentNode) {
// 						el.parentNode.removeChild(el);
// 					}
// 				},
// 			});
// 		},
// 	});
// }, 3000);