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









// const items = document.querySelectorAll(".item");
// const map = gsap.utils.mapRange(0, items.length, 0, 1); // 150
// const offset = 30;

// gsap.set(items, {
// 	y: (index) => -offset * index,
// 	zIndex: (index) => items.length - index
// });
// // END ⚙️ Setup ------------------ //

// function diagonalLoop(items) {
// 	let totalItems = items.length;
// 	let currentItem = 0;

// 	function updatePositions() {
// 		for (let i = 0; i < totalItems; i++) {
// 			let itemIndex = (currentItem + i) % totalItems;
// 			let item = items[itemIndex];
// 			gsap.to(item, {
// 				duration: 0.8, // Тривалість анімації
// 				y: -offset * i,
// 				zIndex: totalItems - i,
// 				scale: 1 - (i * 0.1), // Зменшуємо масштаб для кожної наступної картки (наприклад, на 0.1 за індексом)
// 				opacity: 1,
// 				ease: "power2.out" // Плавний ефект завершення анімації
// 			});
// 		}
// 	}

// 	function moveToNext() {
// 		currentItem = (currentItem + 1) % totalItems;
// 		updatePositions();
// 	}

// 	setInterval(moveToNext, 2000); // Кожні 2 секунди

// 	updatePositions();
// }

// document.addEventListener("DOMContentLoaded", function () {
// 	diagonalLoop(items);
// });





