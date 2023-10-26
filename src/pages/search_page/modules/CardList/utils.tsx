// Функция-переводчик с языка БД на язык пользователей, имеет свой словарь
// Используется для отрисовки характеристик внутри карточки товара
// filter - это один из фильтров "filters" в товаре в БД
// подаётся на вход уже в виде массива (после работы Object.Entries)
// filter[0] - это ключ, filter[1] - значение
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
					"cupe": "Купэ",				
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

// Подставляет пробелы в цену через каждые 3 знака для удобства восприятия
export function addThinSpacesToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");
}

// Берёт таймштамп из БД и преобразует его в дату
// в соответствии с бизнес-условиями
export function formatPublishDate(timestamp: string): string {
	const timestampNumber = Number(timestamp); // Преобразуем строку в число
	// const timestampNumber = new Date(2023, 9, 11, 11).getTime(); // Для тестов
	const currentDate = new Date();
	const publishDate = new Date(timestampNumber);
	const timeDiff = currentDate.getTime() - publishDate.getTime();
	// console.log(new Date(2023, 9, 12, 10).getTime());
	// "1696809600000"  9 октября 2023
	// "1576773899132" 19 декабря 2019
	// "1697086800000" 12 октября 2023, 10 часов утра
	// console.log("Итог: ", formatPublishDate("1697086800000"));
	// console.log("Итог: ", formatPublishDate());

	// Если часы равны, выводим "менее часа назад"
	const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
	if (hoursDiff === 0) {
		return "менее часа назад";
	}

	// Если опубликовали менее 24 часов назад, то выводим количество часов
	if (hoursDiff > 0 && hoursDiff < 24) {
		let hoursSuffix;
		if ([1, 21].includes(hoursDiff)) hoursSuffix = "час";
		else if ([2, 3, 4, 22, 23].includes(hoursDiff)) hoursSuffix = "часа";
		else hoursSuffix = "часов";
		return `${hoursDiff} ${hoursSuffix} назад`;
	}

	// Если объявление опубликовано менее недели назад, выводим кол-во дней
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	if (daysDiff > 0 && daysDiff <= 7) {
		console.log("daysDiff", daysDiff);
		let daysSuffix;
		if (daysDiff == 1) daysSuffix = "день";
		else if ([2, 3, 4].includes(daysDiff)) daysSuffix = "дня";
		else daysSuffix = "дней";
		return `${daysDiff} ${daysSuffix} назад`;
	}

	const dateOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	};

	// Если годы одинаковы, значит выводим только дату и месяц
	if (currentDate.getFullYear() === publishDate.getFullYear()) {
		const shortDateRus = new Date(timestampNumber)
			.toLocaleDateString("ru", dateOptions)
			.replace(/\d+ г\.$/, "");
		return shortDateRus;
	}
	// Если разница дат более 1 года
	if (currentDate.getFullYear() - publishDate.getFullYear() > 0) {
		const fullDateRus = new Date(timestampNumber)
			.toLocaleDateString("ru", dateOptions)
			.replace(/г\.$/, "года");
		return fullDateRus;
	}
}
