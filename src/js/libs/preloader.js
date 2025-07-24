

function preloader() {
	document.documentElement.classList.add('loading');
	document.documentElement.classList.add('lock');
	function startPreloader() {
		document.documentElement.classList.add('loaded');
		document.documentElement.classList.remove('loading');
		document.documentElement.classList.remove('lock');
		setTimeout(function () {
			var preloader = document.getElementById('preloader');
			if (preloader) {
				preloader.remove();
			}
		}, 1200);
	}
	document.addEventListener('DOMContentLoaded', () => {
		setTimeout(() => {
			startPreloader()
		}
			, 1000);
	}
	);
}
preloader()


