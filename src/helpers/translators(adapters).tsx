// Функция-переводчик с языка БД на язык для пользователей, имеет свой словарь
// Используется для отрисовки характеристик внутри карточки товара
// filter - это один из фильтров "filters" в товаре в БД
// подаётся на вход в виде массива, сделанного из объекта (после работы Object.Entries)
// filter[0] - это ключ, filter[1] - значение
// Используется в ProductCardPopup.tsx
export function translateChars(category, type, filter) {	
	const dictionary = {
		"Недвижимость": {
			header: {
				"type": "Тип недвижимости",
				"area": "Площадь, м2",
				"rooms-count": "Количество комнат",
			},
			value: {
				"type": {
					"house": "Дом",
					"flat": "Квартира",
					"apartment": "Апартаменты",
				},
				get "area"() {return filter[1]},
				get "rooms-count"() {return filter[1]},
			}			
		},
		"Автомобиль": {
			header: {
				"production-year": "Год выпуска",
				"transmission": "Коробка передач",
				"body-type": "Тип кузова",
			},
			value: {
				get "production-year"() {return filter[1]},
				"transmission": {
					"auto": "Автоматическая",
					"mechanic": "Механическая",
				},
				"body-type": {
					"sedan": "Седан",
					"universal": "Универсал",
					"hatchback": "Хэтчбэк",
					"suv": "Внедорожник",
					"cupe": "Купе",				
				},
			}
		},
		"Ноутбук": {
			header: {
				"type": "Тип ноутбука",
				"ram-value": "Объём оперативной памяти",
				"screen-size": "Диагональ экрана",
				"cpu-type": "Тип процессора",
			},
			value: {
				"type": {
					"ultra": "Ультрабук",
					"home": "Домашний ноутбук",
					"gaming": "Игровой ноутбук",
				},
				get "ram-value"() {return `${filter[1]} Гб`},
				get "screen-size"() {return filter[1]},
				get "cpu-type"() {return `Intel Core ${filter[1]}`},
			}			
		},
		"Фотоаппарат": {
			header: {
				"type": "Тип фотоаппарата",
				"matrix-resolution": "Разрешение матрицы",
				"supporting": "Разрешение видео",
			},
			value: {
				"type": {
					"slr": "Зеркальный",
					"digital": "Цифровой",
					"mirrorless": "Беззеркальный"
				},
				get "matrix-resolution"() {return filter[1]},
				"supporting": {
					"HD": "HD",
					"FullHD": "Full HD",
					"full-hd": "Full HD",
					"4K": "4K",
					"5K": "5K",
				},
			}
		},
	}

	switch (type) {
		case 'header':
			const translatedHeader = dictionary[category][type][filter[0]];
			return translatedHeader;
		case 'value':
			const tempValue = dictionary[category][type][filter[0]];
			switch (typeof(tempValue)) {
				case 'number':
				case 'string':					
					return tempValue
				case 'object':
					return tempValue[filter[1]]		
			}
		}	
}

// Адаптирует названия переменных из состояния к соответствующим названиям
// из базы данных по продуктам (json), приходящей с сервера
// используется в SearchPageReducer.ts
export const dbKeysAdapter = (direction, value) => {			
	const keyNames = {
		category: 'category',
		price: 'price',
		estateType: "type",
		minSquare: "area",
		roomsQuantity: "rooms-count",
		laptopType: "type",
		laptopRamValue: "ram-value",
		laptopDiagonal: "screen-size",				
		laptopProcType: "cpu-type",
		cameraType: "type",
		resolutionMatrix: "matrix-resolution",
		resolutionVideo: "supporting",
		bodyType: "body-type",
		minimalYear: "production-year",
		transmission: "transmission",
	}
	switch(direction) {
		case 'toDB':
			return keyNames[value]					
		case 'toState':
			for (const key in keyNames) {
				if (keyNames[key] === value) {
				  return key;
				}
			}
	}			
}