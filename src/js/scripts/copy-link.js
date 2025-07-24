function clipboard() {
	document.addEventListener('click', async (event) => {
		const button = event.target.closest('[data-copy-button]');
		if (!button) return;
		const copyContainer = button.closest('[data-copy-container]');
		if (!copyContainer) return;
		const copyTextElement = copyContainer.querySelector('[data-copy-text]');
		if (!copyTextElement) return;
		const textToCopy = copyTextElement.textContent;
		try {
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText(textToCopy);
			} else {
				const tempInput = document.createElement('textarea');
				tempInput.value = textToCopy;
				document.body.appendChild(tempInput);
				tempInput.select();
				document.execCommand('copy');
				document.body.removeChild(tempInput);
			}
			copyContainer.classList.add('_show-clipboard');
			setTimeout(() => copyContainer.classList.remove('_show-clipboard'), 1500);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	});
}
window.addEventListener('DOMContentLoaded', () => {
	clipboard();
});