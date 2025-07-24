import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: 'AIzaSyAaRQVNcuA1qFSmbXuoKfoLkQ8022o98Wc',
	version: 'weekly',
	libraries: ['marker'],
});
function getLocationsFromHTML() {
	if (!locationObj || !Array.isArray(locationObj)) {
		console.error("locationObj is not defined or not an array in window scope");
		return [];
	}
	return locationObj;
}

const customMarkerSVG = `
		<svg class="marker" width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M23.5001 22.5212C22.2016 22.5212 20.9564 22.0054 20.0382 21.0872C19.1201 20.1691 18.6042 18.9238 18.6042 17.6253C18.6042 16.3269 19.1201 15.0816 20.0382 14.1634C20.9564 13.2453 22.2016 12.7295 23.5001 12.7295C24.7985 12.7295 26.0438 13.2453 26.962 14.1634C27.8801 15.0816 28.3959 16.3269 28.3959 17.6253C28.3959 18.2683 28.2693 18.9049 28.0232 19.4989C27.7772 20.0929 27.4166 20.6326 26.962 21.0872C26.5073 21.5418 25.9676 21.9024 25.3736 22.1485C24.7796 22.3945 24.143 22.5212 23.5001 22.5212ZM23.5001 3.91699C19.8644 3.91699 16.3776 5.36126 13.8068 7.93207C11.236 10.5029 9.79175 13.9896 9.79175 17.6253C9.79175 27.9066 23.5001 43.0837 23.5001 43.0837C23.5001 43.0837 37.2084 27.9066 37.2084 17.6253C37.2084 13.9896 35.7641 10.5029 33.1933 7.93207C30.6225 5.36126 27.1358 3.91699 23.5001 3.91699Z"
						fill="white" />
					<path
						d="M23.4998 4.16699C27.069 4.16699 30.4925 5.58467 33.0164 8.1084C35.5402 10.6322 36.9587 14.0557 36.9587 17.625C36.9587 20.1447 36.1174 22.9845 34.8386 25.8389C33.5614 28.6898 31.856 31.5377 30.1472 34.0703C28.4389 36.6023 26.7299 38.815 25.448 40.3945C24.8074 41.1838 24.2735 41.8146 23.9001 42.248C23.7336 42.4414 23.5977 42.5949 23.4998 42.7061C23.4018 42.5949 23.2668 42.4412 23.1003 42.248C22.727 41.8147 22.1931 41.1839 21.5525 40.3945C20.2706 38.815 18.5616 36.6022 16.8533 34.0703C15.1445 31.5377 13.4391 28.6898 12.1619 25.8389C10.8831 22.9845 10.0417 20.1447 10.0417 17.625C10.0418 14.0557 11.4593 10.6322 13.9832 8.1084C16.507 5.58455 19.9305 4.16708 23.4998 4.16699ZM23.4998 12.4795C22.1351 12.4796 20.826 13.0214 19.8611 13.9863C18.8961 14.9513 18.3543 16.2604 18.3542 17.625C18.3542 18.9896 18.8963 20.2987 19.8611 21.2637C20.826 22.2286 22.1351 22.7714 23.4998 22.7715C24.1755 22.7715 24.8452 22.6385 25.4695 22.3799C26.0938 22.1213 26.6606 21.7415 27.1384 21.2637C27.6163 20.7858 27.996 20.219 28.2546 19.5947C28.5132 18.9704 28.6462 18.3008 28.6462 17.625C28.6462 16.2604 28.1034 14.9513 27.1384 13.9863C26.1734 13.0215 24.8644 12.4795 23.4998 12.4795Z"
						stroke="#141B2F" stroke-opacity="0.4" stroke-width="0.5" />
					<rect x="13.5" y="7.5" width="20" height="20" class="marker__bg" rx="10" fill="#141B2F" />
					<path d="M28.1219 20.9429H26.6102L24.2051 18.4176L24.9781 17.6445L28.1219 20.9429Z" fill="white" />
					<path d="M26.2321 20.9444H24.7204L23.1914 19.3295L23.9645 18.5908L26.2321 20.9444Z" fill="white" />
					<rect x="18.7764" y="14.0381" width="1.09947" height="6.90603" class="marker__text" fill="#F2BE9B" />
					<path d="M24.4112 14.0381H23.1571L20.9581 16.0309C20.1851 16.7524 19.9411 17.4258 20.5458 18.4016C20.4084 17.4945 23.0884 15.2578 24.4112 14.0381Z" class="marker__text" fill="#F2BE9B" />
					<path d="M26.2664 14.0381H25.0084L21.7272 17.0101C20.958 17.8175 20.7828 18.3191 21.3875 19.2949C21.25 18.3879 24.9436 15.2578 26.2664 14.0381Z" class="marker__text" fill="#F2BE9B" />
					<path d="M24.1705 20.9273H22.968L22.0575 19.9997C21.4391 19.261 22.3152 18.3161 22.4354 18.213L26.8161 14.0557H28.2076L23.4662 18.5223C23.1398 18.8143 22.6588 19.1751 22.8993 19.5358L24.1705 20.9273Z" class="marker__text"
						fill="#F2BE9B" />
				</svg>
`;
async function initMap(zoomLevel = null) {
	const mapElement = document.getElementById("map");
	if (!mapElement) {
		console.error("Element with id 'map' not found in DOM");
		return;
	}
	try {
		await loader.load();
		const { Map, LatLngBounds, InfoWindow } = google.maps;
		const { AdvancedMarkerElement } = google.maps.marker;
		const locations = getLocationsFromHTML();
		if (!locations.length) {
			console.error("No locations data available");
			return;
		}
		const map = new Map(mapElement, {
			center: { lat: 50.510546228936136, lng: 30.25336058246422 },
			zoom: zoomLevel || 13,
			mapId: 'AIzaSyAaRQVNcuA1qFSmbXuoKfoLkQ8022o98Wc',
		});
		let activeInfoWindow = null;
		locations.forEach(location => {
			const marker = new AdvancedMarkerElement({
				position: { lat: location.lat, lng: location.lng },
				map: map,
				title: location.title,
				gmpClickable: true,
				content: new DOMParser().parseFromString(customMarkerSVG, 'image/svg+xml').documentElement,
			});

			const contentString = `
                <div class="map-block">
                    <a class="map-block__image ibg" href="${location.url || '#'}">
                        <img src="${location.image || '/src/assets/img/about-company/image02.jpg'}" width="204" height="120" alt="${location.title}">
                    </a>
                    <div class="map-block__content">
                        <a class="map-block__link _hover-link" href="${location.url || '#'}">${location.title}</a>
                        <p class="map-block__text">${location.text || 'Опис відсутній'}</p>
                    </div>
                </div>
            `;

			const infoWindow = new InfoWindow({
				content: contentString,
			});
			marker.addListener("click", () => {
				if (activeInfoWindow) {
					activeInfoWindow.close();
				}
				infoWindow.open(map, marker);
				activeInfoWindow = infoWindow;
			});
		});
		if (!zoomLevel) {
			const bounds = new LatLngBounds();
			locations.forEach(location => {
				bounds.extend({ lat: location.lat, lng: location.lng });
			});
			map.fitBounds(bounds, { padding: 50 });
		}
	} catch (error) {
		console.error("Error initializing Google Maps:", error);
	}
}
document.addEventListener('DOMContentLoaded', async () => {
	const mapElement = document.getElementById("map");
	if (mapElement) {
		await initMap();
	}
});