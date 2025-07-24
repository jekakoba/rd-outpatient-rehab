import MicroModal from './MicroModal.js';
import { bodyLock, bodyUnlock } from '../scripts/functions.js';
MicroModal.init({
	onShow: (modal) => callbackOpen(modal),
	onClose: (modal) => callbackClose(modal),
	onBeforeShow: (modal) => callbackBeforeOpen(modal),
	onBeforeClose: (modal) => callbackBeforeClose(modal),
	openTrigger: 'data-modal-open',
	closeTrigger: 'data-modal-close',
	openClass: 'is-open',
	disableFocus: true,
	awaitOpenAnimation: false,
	awaitCloseAnimation: false,
	debugMode: true,
});




const callbackOpen = (modal) => {
	bodyLock(300);
	//    console.info(`${modal.id} is shown`)
};
const callbackClose = (modal) => {
	// console.info(`${modal.id} is hidden`)
	bodyUnlock(300);
};
const callbackBeforeOpen = (modal) => {
	// modal.classList.add('_anim-body');
}
const callbackBeforeClose = (modal) => {
	// modal.classList.remove('_anim-body');
}