



function marquee() {
	/*
		Instruction: 
Structure: You can indicate any classes and tags elements. 
<DIV DATA-MarQuee> 
<Span> Element One </ span> 
<div> Element Two </div> 
</div> 
Additional settings (you can not specify): 
Data-Marquee-Space = '30 '-indentation between items (by default 30px) 
Data-Marquee-Speed = '1000'-Animation speed (by default 1000) indicate in MS 1S = 1000 
Data-marquee-pause-mouse-entter-stop animation when moving. 
Data-Marquee-Direction = 'Left'-direction of animation "Top, Right, Bottom, Left" (by default Left)
		  ! Important: when used data-marquee-direction 'top' or 'bottom' should be fixed height + overflow: hidden;
	  */

	const $marqueeArray = document.querySelectorAll("[data-marquee]");
	const CLASS_NAMES = {
		wrapper: "marquee-wrapper",
		inner: "marquee-inner",
		item: "marquee-item",
	};

	if (!$marqueeArray.length) return;

	const {
		head
	} = document;

	// Function (filter) reducing the number of function calls when changing the size of Vuvport. (Reduction of the load on the system)
	const debounce = (delay, fn) => {
		let timerId;
		return (...args) => {
			if (timerId) {
				clearTimeout(timerId);
			}
			timerId = setTimeout(() => {
				fn(...args);
				timerId = null;
			}, delay);
		};
	};
	// Event Changing the size of Vuvport
	const onWindowResize = (cb) => {
		if (!cb && !isFunction(cb)) return;

		const handleResize = () => {
			cb();
		};

		window.addEventListener("resize", debounce(15, handleResize));

		handleResize();
	};

	// Create a structure
	const buildMarquee = (marqueeNode) => {
		if (!marqueeNode) return;

		const $marquee = marqueeNode;
		const $childElements = $marquee.children;

		if (!$childElements.length) return;
		$marquee.classList.add(CLASS_NAMES.wrapper);
		Array.from($childElements).forEach(($childItem) => $childItem.classList.add(CLASS_NAMES.item));

		const htmlStructure = `<div class="${CLASS_NAMES.inner}">${$marquee.innerHTML}</div>`;
		$marquee.innerHTML = htmlStructure;
	};

	// Function of Obtaining Item Sizes
	const getElSize = ($el, isVertical) => {
		if (isVertical) return $el.getBoundingClientRect().height;
		return $el.getBoundingClientRect().width;
	};

	$marqueeArray.forEach(($wrapper) => {
		if (!$wrapper) return;

		buildMarquee($wrapper);

		const $marqueeInner = $wrapper.firstElementChild;
		let cacheArray = [];

		if (!$marqueeInner) return;

		const dataMarqueeSpace = parseFloat($wrapper.getAttribute("data-marquee-space"));
		const spaceBetween = !isNaN(dataMarqueeSpace) ? dataMarqueeSpace : 30;
		const speed = parseFloat($wrapper.getAttribute("data-marquee-speed")) / 10 || 100;
		const isMousePaused = $wrapper.hasAttribute("data-marquee-pause-mouse-enter");
		const direction = $wrapper.getAttribute("data-marquee-direction");
		const isVertical = direction === "bottom" || direction === "top";
		const animName = `marqueeAnimation-${Math.floor(Math.random() * 10000000)}`;
		let startPosition = parseFloat($wrapper.getAttribute("data-marquee-start")) || 0;

		// Dynamic data, taken into account when scripting.
		let sumSize = 0;
		let firstScreenVisibleSize = 0;
		let initialSizeElements = 0;
		let initialElementsLength = $marqueeInner.children.length;
		let index = 0;
		let counterDublicateElements = 0;

		// Initialization of events.
		const initEvents = () => {
			if (startPosition) $marqueeInner.addEventListener("animationiteration", onChangeStartPosition);

			if (!isMousePaused) return;
			$marqueeInner.addEventListener("mouseenter", onChangePaused);
			$marqueeInner.addEventListener("mouseleave", onChangePaused);
		};

		const onChangeStartPosition = () => {
			console.log("work");
			startPosition = 0;
			$marqueeInner.removeEventListener("animationiteration", onChangeStartPosition);
			onResize();
		};

		// Adding basic styles for corrective animation.
		const setBaseStyles = (firstScreenVisibleSize) => {
			let baseStyle = "display: flex; flex-wrap: nowrap;";

			if (isVertical) {
				baseStyle += `
				flex-direction: column;
			  position: relative;
			  will-change: transform;`;

				if (direction === "bottom") {
					baseStyle += `top: -${firstScreenVisibleSize}px;`;
				}
			} else {
				baseStyle += `
				position: relative;
			  will-change: transform;`;

				if (direction === "right") {
					baseStyle += `left: -${firstScreenVisibleSize}px;;`;
				}
			}

			$marqueeInner.style.cssText = baseStyle;
		};

		// The function returns the value to which the elements need to be displaced when animation.
		const setdirectionAnim = (totalWidth) => {
			switch (direction) {
				case "right":
				case "bottom":
					return totalWidth;
				default:
					return -totalWidth;
			}
		};

		// Animation function.
		const animation = () => {
			const keyFrameCss = `@keyframes ${animName} {
					  0% {
						  transform: translate${isVertical ? "Y" : "X"}(${startPosition}%);
					  }
					  100% {
						  transform: translate${isVertical ? "Y" : "X"}(${setdirectionAnim(firstScreenVisibleSize)}px);
					  }
				  }`;
			const $style = document.createElement("style");

			$style.classList.add(animName);
			$style.innerHTML = keyFrameCss;
			head.append($style);

			$marqueeInner.style.animation = `${animName} ${(firstScreenVisibleSize + (startPosition * firstScreenVisibleSize) / 100) / speed
				}s infinite linear`;
		};

		// function of working with elements. (duplication, indication \ size calculation)
		const addDublicateElements = () => {
			// Після зміни розмірів екрану, обнуляємо всі динамічні данні.
			sumSize = firstScreenVisibleSize = initialSizeElements = counterDublicateElements = index = 0;

			const $parentNodeWidth = getElSize($wrapper, isVertical);

			let $childrenEl = Array.from($marqueeInner.children);

			if (!$childrenEl.length) return;

			if (!cacheArray.length) {
				cacheArray = $childrenEl.map(($item) => $item);
			} else {
				$childrenEl = [...cacheArray];
			}

			// Add the basic styles of flexes for the correct calculation of the size of the elements.
			$marqueeInner.style.display = "flex";
			if (isVertical) $marqueeInner.style.flexDirection = "column";
			// Up the number of elements to avoid duplication when the screen size changes.
			$marqueeInner.innerHTML = "";
			$childrenEl.forEach(($item) => {
				$marqueeInner.append($item);
			});

			// Before duplication of the elements, add the styles of indentation and make the dimensions of the elements to the dynamic data.
			$childrenEl.forEach(($item) => {
				if (isVertical) {
					$item.style.marginBottom = `${spaceBetween}px`;
				} else {
					$item.style.marginRight = `${spaceBetween}px`;
					$item.style.flexShrink = 0;
				}

				const sizeEl = getElSize($item, isVertical);

				sumSize += sizeEl + spaceBetween;
				firstScreenVisibleSize += sizeEl + spaceBetween;
				initialSizeElements += sizeEl + spaceBetween;
				counterDublicateElements += 1;

				return sizeEl;
			});

			const $multiplyWidth = $parentNodeWidth * 2 + initialSizeElements;

			// Duplicate elements as needed.
			for (; sumSize < $multiplyWidth; index += 1) {
				if (!$childrenEl[index]) index = 0;

				const $cloneNone = $childrenEl[index].cloneNode(true);
				const $lastElement = $marqueeInner.children[index];

				$marqueeInner.append($cloneNone);

				sumSize += getElSize($lastElement, isVertical) + spaceBetween;

				if (firstScreenVisibleSize < $parentNodeWidth || counterDublicateElements % initialElementsLength !== 0) {
					counterDublicateElements += 1;
					firstScreenVisibleSize += getElSize($lastElement, isVertical) + spaceBetween;
				}
			}

			// Add the base styles taking into account the calculated values of the elements of the elements.
			setBaseStyles(firstScreenVisibleSize);
		};

		// Initialization function.
		const init = () => {
			addDublicateElements();
			animation();
			initEvents();
		};

		// The animation restart function when changing the size of Vuvport.
		const onResize = () => {
			head.querySelector(`.${animName}`)?.remove();
			init();
		};

		// The pause function when moving.
		const onChangePaused = (e) => {
			const {
				type,
				target
			} = e;

			target.style.animationPlayState = type === "mouseenter" ? "paused" : "running";
		};

		onWindowResize(onResize);
	});
}
document.addEventListener("DOMContentLoaded", function (e) {
	marquee();
});
