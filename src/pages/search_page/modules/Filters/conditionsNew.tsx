// Функция проверяет каждый продукт на соответствие выбранным пользаком фильтрам
// Один product - это один объект из базы данных с сервера
// Функция запускается каждый раз для каждого продукта там, где это требуется
// требуется это главным образом в _Filters.tsx при нажатии кнопки "Показать"

export const checkProduct = (filters, product) => {
	console.log("checkProduct start, проверяем", product.name);

	// В зависимости от активной категории выбирается проверочная функция
	let performCheckup;
	const activeCtg = filters["category"];
	switch (activeCtg) {
		case "Недвижимость":
			performCheckup = checkEstate;
			break;
		case "Ноутбук":
			performCheckup = checkLaptop;
			break;
		case "Фотоаппарат":
			performCheckup = checkCamera;
			break;
		case "Автомобиль":
			performCheckup = checkCar;
			break;
	}

	// checkupFlags = то "флаги проверки", массив с true\false значениями
	// одно значение - результат одной проверки продукта на фильтры (oneFilterCheckupResult)
	let checkupFlags = [];

	// Проверяем фильтр на соответствие условиям
	for (let key in filters) {
		// Не нужно проверять "category", она уже проверена
		if (key !== "category") {
			// Для остальных фильтров: если длина значения фильтра равна нулю, это значит,
			// что значение фильтра - либо пустая строка, либо пустой массив, а это значит,
			// что пользователь не выбирал этот фильтр, либо выбирал значение "Любое",
			// а значит этот фильтр не ограничивает нам выборку,
			// поэтому этот product сразу нам подходит, получает true и цикл идёт к следующему фильтру
			let value = filters[key];
			// ? дописать " || value === '-' " или нет? Для обработки случаев, когда присылают прочерк
			// ? вроде где-то в фотоаппаратах такое было. аа, писать это надо не здесь, а внутри продуктовой проверки
			if (value.length === 0) {
				checkupFlags.push(true);
				continue;
			}
			//
			// console.log("key = ", key, ", value = ", value);
			let oneFilterCheckupResult = performCheckup(key, value, product);
			// console.log("результат проверки: ", oneFilterCheckupResult);
			checkupFlags.push(oneFilterCheckupResult);
		}
	}

	// Применяем функцию reduce для сложения всех элементов массива checkupFlags (а они все булевые)
	// т.е. checkupFlags - это массив результатов проверки продукта, подходит продукт под фильтры или нет
	// Выведет false, если в массиве есть хотя бы одно значение false 
	// если false - то product не подошёл под фильтры
	console.log("checkupFlags после всех проверок = ", checkupFlags);
	let result = checkupFlags.reduce(function (accumulator, currentValue) {
		return accumulator && currentValue;
	});
	console.log("result", result);
	return result;
};

export const checkLaptop = (filtersKey, filtersValue, product) => {
	console.log("проверка одного ноутбука...");
	let checkupFlag;
	switch (filtersKey) {
		// Тип ноутбука
		case "type":
			filtersValue.some((elem) => elem === product.filters["type"])
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Минимальный объём оперативной памяти, гб
		case "ram-value":
			product.filters["ram-value"] >= Number(filtersValue)
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Минимальная диагональ экрана в дюймах
		case "screen-size":
			product.filters["screen-size"] >= Number(filtersValue)
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Тип процессора
		case "cpu-type":
			filtersValue.some((elem) => elem === product.filters["cpu-type"])
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
	}
	return checkupFlag;
};

export const checkEstate = (filtersKey, filtersValue, product) => {
	let checkupFlag;
	switch (filtersKey) {
		// Тип недвижимости
		case "type":
			filtersValue.some((elem) => elem === product.filters["type"])
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Минимальная площадь, м2
		case "area":
			product.filters["area"] >= Number(filtersValue)
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Количество комнат
		case "rooms-count":
			if (filtersValue === "5+") {
				product.filters["rooms-count"] >= Number(filtersValue.match(/\d/))
					? (checkupFlag = true)
					: (checkupFlag = false);
				break;
			}
			product.filters["rooms-count"] === Number(filtersValue.match(/\d/))
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
	}
	return checkupFlag;
};

export const checkCamera = (filtersKey, filtersValue, product) => {
	let checkupFlag;
	switch (filtersKey) {
		// Тип фотоаппарата
		case "type":
			filtersValue.some((elem) => elem === product.filters["type"])
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Минимальное разрешение матрицы
		case "matrix-resolution":
			if (!Number(filtersValue)) {
				checkupFlag = false;
				break;
			} else {
				product.filters["matrix-resolution"] >= Number(filtersValue)
					? (checkupFlag = true)
					: (checkupFlag = false);
				break;
			}
		// Минимальное разрешение видео
		case "supporting":
			// Значения в фильтрах и в базе данных товаров различаются
			// И напрямую не сравнить что больше, 4К или HD, поэтому всё переводим в "вес"
			// и уже веса значений сравниваем между собой
			const resWeight = {
				"-": 0,
				HD: 1,
				FullHD: 2,
				"full-hd": 2,
				"4K": 3,
				"5K": 4,
			};
			const filtersResWeight = resWeight[filtersValue];
			const productResWeight = resWeight[product.filters["supporting"]];
			productResWeight >= filtersResWeight ? (checkupFlag = true) : (checkupFlag = false);
			break;
	}
	return checkupFlag;
};

export const checkCar = (filtersKey, filtersValue, product) => {
	let checkupFlag;
	switch (filtersKey) {
		// Минимальный год выпуска
		case "production-year":
			product.filters["production-year"] >= Number(filtersValue)
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Коробка передач
		case "transmission":
			product.filters["transmission"] === filtersValue
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
		// Тип кузова
		case "body-type":
			filtersValue.some((elem) => elem === product.filters["body-type"])
				? (checkupFlag = true)
				: (checkupFlag = false);
			break;
	}
	return checkupFlag;
};