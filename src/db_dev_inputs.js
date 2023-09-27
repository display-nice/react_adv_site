export const db_dev_inputs = {	
	'categories': [
		{ value: 'Все', forFilter: "all", checked: false, text: "Все", filter: 'prodCatFilter', subfilter: 'categories'},
		{ value: "Недвижимость", forFilter: "estateFilter", checked: true, text: "Недвижимость", filter: 'prodCatFilter', subfilter: 'categories'},
		{ value: 'Ноутбук', forFilter: "laptopFilter", checked: false, text: "Ноутбуки", filter: 'prodCatFilter', subfilter: 'categories'},
		{ value: 'Фотоаппарат', forFilter: "cameraFilter", checked: false, text: "Фотоаппараты", filter: 'prodCatFilter', subfilter: 'categories'},
		{ value: 'Автомобиль', forFilter: "carFilter", checked: false, text: "Автомобили", filter: 'prodCatFilter', subfilter: 'categories'},
	],	
	'cameraType': [
		{value: 'mirror', checked: false, text: 'Зеркальный', filter: 'cameraFilter', subfilter: 'cameraType'},
		{value: 'digital', checked: false, text: 'Цифровой', filter: 'cameraFilter', subfilter: 'cameraType'},
		{value: 'mirrorless', checked: false, text: 'Беззеркальный', filter: 'cameraFilter', subfilter: 'cameraType'},
	],
	'resolutionMatrix': [
		{value: '1mp', checked: false, text: '1 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
		{value: '3mp', checked: false, text: '3 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
		{value: '5mp', checked: false, text: '5 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
		{value: '7mp', checked: false, text: '7 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
		{value: '10mp', checked: false, text: '10 МП', filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
	],
	'resolutionVideo': [
		{value: 'any', checked: false, text: 'Любое', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
		{value: 'HD', checked: false, text: 'HD', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
		{value: 'FullHD', checked: false, text: 'Full HD', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
		{value: '4K', checked: false, text: '4K', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
		{value: '5K', checked: false, text: '5K', filter: 'cameraFilter', subfilter: 'resolutionVideo'},
	],	
	'minimalYear': [
		{value: '1900', checked: true, text: '1900', filter: 'carFilter', subfilter: 'minimalYear'},
		{value: '1940', checked: false, text: '1940', filter: 'carFilter', subfilter: 'minimalYear'},
		{value: '1960', checked: false, text: '1960', filter: 'carFilter', subfilter: 'minimalYear'},
		{value: '1980', checked: false, text: '1980', filter: 'carFilter', subfilter: 'minimalYear'},
		{value: '2000', checked: false, text: '2000', filter: 'carFilter', subfilter: 'minimalYear'},
	],
	'transmission': [
		{value: 'any', checked: false, text: 'Любая', filter: 'carFilter', subfilter: 'transmission'},
		{value: 'mechanic', checked: false, text: 'Механика', filter: 'carFilter', subfilter: 'transmission'},
		{value: 'auto', checked: false, text: 'Автомат', filter: 'carFilter', subfilter: 'transmission'},
	],
	'bodyType': [
		{value: 'sedan', checked: false, text: 'Седан', filter: 'carFilter', subfilter: 'bodyType'},
		{value: 'universal', checked: false, text: 'Универсал', filter: 'carFilter', subfilter: 'bodyType'},
		{value: 'hatchback', checked: false, text: 'Хэтчбэк', filter: 'carFilter', subfilter: 'bodyType'},
		{value: 'suv', checked: false, text: 'Внедорожник', filter: 'carFilter', subfilter: 'bodyType'},
		{value: 'cupe', checked: false, text: 'Купэ', filter: 'carFilter', subfilter: 'bodyType'},
	],	
	'laptopType': [
		{ value: "ultra", checked: false, text: "Ультрабук", filter: 'laptopFilter', subfilter: 'laptopType'},
		{ value: "home", checked: false, text: "Домашний ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
		{ value: "gaming", checked: false, text: "Игровой ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
	],
	'laptopRamValue': [
		{ value: "any", checked: true, text: "Любой", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
		{ value: "4gb", checked: false, text: "4 Гб", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
		{ value: "8gb", checked: false, text: "8 Гб", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
		{ value: "16gb", checked: false, text: "16 Гб", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
	],
	'laptopDiagonal': [
		{ value: "any", checked: true, text: "Любая", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
		{ value: "13in", checked: false, text: "13″",  filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
		{ value: "14in", checked: false, text: "14″", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
		{ value: "15in", checked: false, text: "15″", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
		{ value: "16in", checked: false, text: "17″", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
	],
	'laptopProcType': [
		{ value: "i3", checked: false, text: "Intel Core i3", filter: 'laptopFilter', subfilter: 'laptopProcType'},
		{ value: "i5", checked: false, text: "Intel Core i5", filter: 'laptopFilter', subfilter: 'laptopProcType'},
		{ value: "i7", checked: false, text: "Intel Core i7", filter: 'laptopFilter', subfilter: 'laptopProcType'},
	],			
	'estateType': [
		{ value: "house", checked: false, text: "Дом", filter: 'estateFilter', subfilter: 'estateType'},
		{ value: "flat", checked: false, text: "Квартира", filter: 'estateFilter', subfilter: 'estateType'},
		{ value: "apartment", checked: false, text: "Апартаменты", filter: 'estateFilter', subfilter: 'estateType'},
	],
	'minSquare': [
		{value: '', checked: true, filter: 'estateFilter', subfilter: 'minSquare'}
	],
	'roomsQuantity': [
		{ value: "any", checked: false, text: "Любое", filter: 'estateFilter', subfilter: 'roomsQuantity'},
		{ value: "one", checked: false, text: "1", filter: 'estateFilter', subfilter: 'roomsQuantity'},
		{ value: "two", checked: false, text: "2", filter: 'estateFilter', subfilter: 'roomsQuantity'},
		{ value: "three", checked: false, text: "3", filter: 'estateFilter', subfilter: 'roomsQuantity'},
		{ value: "four", checked: false, text: "4", filter: 'estateFilter', subfilter: 'roomsQuantity'},
		{ value: "fivemore", checked: false, text: "5+", filter: 'estateFilter', subfilter: 'roomsQuantity'},
	],		
	
}