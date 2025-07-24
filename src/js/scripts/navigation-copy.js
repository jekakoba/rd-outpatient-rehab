export default class SmoothScrollNavigation {
	constructor({ headerSelector = "header", useHeaderOffset = true, extraOffset = 0, activeClass = "active" } = {}) {
		this.settings = { headerSelector, useHeaderOffset, extraOffset, activeClass };
		this.init();
	}

	init() {
		this.scrollToBlock();
		window.addEventListener("load", () => this.scrollToHashOnLoad());
		this.setupIntersectionObserver();
	}

	getOffset() {
		const header = this.settings.useHeaderOffset
			? document.querySelector(this.settings.headerSelector)
			: null;
		return (header?.offsetHeight || 0) + this.settings.extraOffset;
	}

	scrollToTarget(el) {
		if (!el) return;

		const offset = this.getOffset();
		const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

		window.scrollTo({
			top,
			behavior: "smooth",
		});
		document.documentElement.classList.remove("menu-open", "lock");
	}

	scrollToBlock() {
		document.addEventListener("click", (e) => {
			const link = e.target.closest('a[href^="#"], a[href^="/"], a[href^="http"]');
			if (!link) return;

			const href = link.getAttribute("href");
			if (!href) return;

			const isExternal = link.hostname && link.hostname !== window.location.hostname;

			if (href.startsWith("#")) {
				e.preventDefault();
				const id = href.slice(1);
				if (!id) return;
				const target = document.querySelector(`#${CSS.escape(id)}`);
				this.scrollToTarget(target);
			} else if (href.includes("#") && href.startsWith("/")) {
				e.preventDefault();
				const [page, hash] = href.split("#");
				if (!hash) return;

				if (window.location.pathname === page) {
					const target = document.querySelector(`#${CSS.escape(hash)}`);
					this.scrollToTarget(target);
				} else {
					window.location.href = `${page}#${hash}`;
				}
			} else if (href.includes("#") && href.startsWith("http") && !isExternal) {
				e.preventDefault();
				window.location.href = href;
			}
		});
	}

	scrollToHashOnLoad() {
		const hash = window.location.hash;
		if (!hash || hash.length <= 1) return;

		const el = document.querySelector(`#${CSS.escape(hash.slice(1))}`);
		if (el) {
			setTimeout(() => this.scrollToTarget(el), 100);
		}
	}

	setupIntersectionObserver() {
		const sections = document.querySelectorAll("[id]");
		if (!sections.length) return;

		const observerOptions = {
			root: null,
			rootMargin: `-${this.getOffset()}px 0px 0px 0px`,
			threshold: 0.1,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const sectionId = entry.target.id;
				const menuLinks = document.querySelectorAll(`a[href="#${CSS.escape(sectionId)}"]`);

				if (entry.isIntersecting) {
					// Додаємо клас active, коли секція видима
					menuLinks.forEach((link) => link.classList.add(this.settings.activeClass));
				} else {
					// Забираємо клас active, коли секція більше не видима
					menuLinks.forEach((link) => link.classList.remove(this.settings.activeClass));
				}
			});
		}, observerOptions);

		sections.forEach((section) => observer.observe(section));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new SmoothScrollNavigation({
		headerSelector: ".header",
		useHeaderOffset: true,
		extraOffset: 0,
		activeClass: "active-section",
	});
});