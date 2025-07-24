/**
 * Function to add and remove classes to the root element when scrolling down or up
 * @param {Object} params - Object with params
 * @param {string} params.startScrolledClass - Class to add to the root element when the scroll position is greater than the trigger
 * @param {string} params.scrolledDownClass - Class to add to the root element when scrolling down
 * @param {string} params.scrolledTopClass - Class to add to the root element when scrolling up
 * @param {number} params.scrollTrigger - The position in px to start adding the classes when scrolling
 */
function showHideHeader(params) {
	const header = document.querySelector('header');

	// Exit the function if there is no header element
	if (!header) return;

	/**
	 * The last scroll position
	 * @type {number}
	 */
	let lastScrollTop = 0;

	/**
	 * Event handler for the scroll event
	 * @param {Event} event - Scroll event
	 */
	window.addEventListener('scroll', function (event) {
		scrollEvent();
	});

	function scrollEvent() {
		let scrollTop = window.scrollY || document.documentElement.scrollTop;

		// Add the startScrolledClass to the root element
		if (scrollTop > params.scrollTrigger) {
			document.documentElement.classList.add(params.startScrolledClass);

			// Add the scrolledDownClass and remove scrolledTopClass when scrolling down
			if (scrollTop > lastScrollTop) {
				document.documentElement.classList.add(params.scrolledDownClass);
				document.documentElement.classList.remove(params.scrolledTopClass);
				// Add the scrolledTopClass and remove scrolledDownClass when scrolling up
			} else {
				document.documentElement.classList.remove(params.scrolledDownClass);
				document.documentElement.classList.add(params.scrolledTopClass);
			}

			// Remove both classes when at the top
		} else {
			document.documentElement.classList.remove(params.startScrolledClass);
			document.documentElement.classList.remove(params.scrolledDownClass);
			document.documentElement.classList.remove(params.scrolledTopClass);
		}
		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	}
	scrollEvent();
}

document.addEventListener('DOMContentLoaded', () => {
	showHideHeader({
		startScrolledClass: 'scrolled-page',
		scrolledDownClass: 'scrolled-down',
		scrolledTopClass: 'scrolled-top',
		scrollTrigger: 1,
	});
});