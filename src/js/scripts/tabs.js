import { getHash, _slideDown, _slideUp, dataMediaQueries } from './functions.js'


function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]')
	let tabsActiveHash = []

	if (tabs.length > 0) {
		const hash = getHash()
		if (hash && hash.startsWith('tab-')) {
			tabsActiveHash = hash.replace('tab-', '').split('-')
		}

		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init')
			tabsBlock.setAttribute('data-tabs-index', index)
			tabsBlock.addEventListener("click", setTabsAction)
			initTabs(tabsBlock)
		})

		// Отримання слойлерів з медіа-запитами
		let mdQueriesArray = dataMediaQueries(tabs, "tabs")
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Подія
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
				})
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
			})
		}
	}
	// Встановлення позицій заголовків
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item
			let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]')
			let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]')
			let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]')
			let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]')
			tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem)
			tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem)
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index])
					tabsContent.append(tabsContentItem)
					tabsMediaItem.classList.add('_tab-spoller')
				} else {
					tabsTitles.append(tabsTitleItems[index])
					tabsMediaItem.classList.remove('_tab-spoller')
				}
			})
		})
	}
	// Робота з контентом
	function initTabs(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*')
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*')
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>.active')
			tabsActiveTitle ? tabsActiveTitle.classList.remove('active') : null
		}
		if (tabsContent.length) {
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '')
				tabsContentItem.setAttribute('data-tabs-item', '')

				if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
					tabsTitles[index].classList.add('active')
				}
				tabsContentItem.hidden = !tabsTitles[index].classList.contains('active')
			})
		}
	}
	function setTabsStatus(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]')
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]')
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex
		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500
			}
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock)
		if (tabsContent.length > 0) {
			const isHash = tabsBlock.hasAttribute('data-tabs-hash')
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock)
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock)
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('active')) {
					if (tabsBlockAnimate) {
						_slideDown(tabsContentItem, tabsBlockAnimate)
					} else {
						tabsContentItem.hidden = false
					}
					if (isHash && !tabsContentItem.closest('.popup')) {
						setHash(`tab-${tabsBlockIndex}-${index}`)
					}
				} else {
					if (tabsBlockAnimate) {
						_slideUp(tabsContentItem, tabsBlockAnimate)
					} else {
						tabsContentItem.hidden = true
					}
				}
			})
		}
	}
	function setTabsAction(e) {
		const el = e.target
		if (el.closest('[data-tabs-title]')) {
			const tabTitle = el.closest('[data-tabs-title]')
			const tabsBlock = tabTitle.closest('[data-tabs]')
			if (!tabTitle.classList.contains('active') && !tabsBlock.querySelector('._slide')) {
				let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title].active')
				tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null
				tabActiveTitle.length ? tabActiveTitle[0].classList.remove('active') : null
				tabTitle.classList.add('active')
				setTabsStatus(tabsBlock)
			}
			e.preventDefault()
		}
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	tabs()
});


