

const pageNavScroll = () => {
	function handleScroll() {
		let scrollDistance = window.scrollY
		const sections = document.querySelectorAll('[data-nav-block]')
		const navLinks = document.querySelectorAll('[data-nav-links] a')
		if (!sections && !navLinks) return
		sections.forEach((section, i) => {
			if ((section.offsetTop - (document.querySelector('header').clientHeight) - 60) <= (scrollDistance)) {
				navLinks.forEach(link => {
					if (link.classList.contains('active-section')) {
						link.classList.remove('active-section')
					}
				})
				navLinks[i].classList.add('active-section')
			}
		})
	}
	window.addEventListener('scroll', handleScroll)
	handleScroll()

}

document.addEventListener('DOMContentLoaded', pageNavScroll)
