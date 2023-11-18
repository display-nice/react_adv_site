// Здесь несколько функций, одна разобрана детально с комментариями, остальные сделаны точно так же.
// Из-за этого получилось некоторое кол-во дублированного кода.
// Конечно, его можно сократить, собрав из 4х функций одну.
// Однако так проще читать, воспринимать код и отлаживать его.

// Функция проверяет каждый продукт на соответствие выбранным пользаком фильтрам
// Один product - это один объект из базы данных с сервера
// Функция запускается каждый раз для каждого продукта там, где это требуется
// требуется это главным образом в _Filters.tsx при нажатии кнопки "Показать"
export const checkLaptop = (filters, product) => {
	// array - это служебный накопитель для результатов проверки, записывается сюда true \ false;
	let array = [];
	// Проверяем фильтр на соответствие условиям
	for (let key in filters) {
		// Нет смысла проверять "category", т.к. функция уже прописана только для одной категории
		if (key !== "category") {
			// Для остальных фильтров: если длина значения фильтра равна нулю, это значит,
			// Что значение фильтра - либо пустая строка, либо пустой массив, это значит,
			// что пользователь не выбирал этот фильтр, либо выбирал значение "Любое",
			// а значит этот фильтр не ограничивает нам выборку,
			// значит этот product сразу нам подходит и получает true и цикл идёт к следующему фильтру
			let value = filters[key];
			if (value.length === 0) {
				array.push(true);
				continue;
			}
			// Если фильтр не отсеялся раньше, значит он был выбран пользаком
			// и подлежит полноценной проверке
			switch (key) {
				// Цена
				case 'prices':
					product.price >= value[0] && product.price <= value[1] ?
					array.push(true) : array.push(false)
					break;
				// Тип ноутбука
				case "type":
					value.some((elem) => elem === product.filters["type"])
						? array.push(true)
						: array.push(false);
					break;
				// Минимальный объём оперативной памяти, гб
				case "ram-value":
					product.filters["ram-value"] >= Number(value) ? array.push(true) : array.push(false);
					break;
				// Минимальная диагональ экрана в дюймах
				case "screen-size":
					product.filters["screen-size"] >= Number(value) ? array.push(true) : array.push(false);
					break;
				// Тип процессора
				case "cpu-type":
					value.some((elem) => elem === product.filters["cpu-type"])
						? array.push(true)
						: array.push(false);
					break;
			}
		}
	}
	// Применяем функцию reduce для сложения всех элементов массива (а они все булевые)
	// Выведет false, если в массиве есть хотя бы одно значение false
	// если false - то product не подошёл под условия
	let result = array.reduce(function (accumulator, currentValue) {
		return accumulator && currentValue;
	});
	return result;
};

export const checkEstate = (filters, product) => {
	let array = [];
	for (let key in filters) {
		if (key !== "category") {
			let value = filters[key];
			if (value.length === 0) {
				array.push(true);
				continue;
			}
			switch (key) {
				// Цена
				case 'prices':
					product.price >= value[0] && product.price <= value[1] ?
					array.push(true) : array.push(false)
					break;
				// Тип недвижимости
				case "type":
					value.some((elem) => elem === product.filters["type"])
						? array.push(true)
						: array.push(false);
					break;
				// Минимальная площадь, м2
				case "area":
					product.filters["area"] >= Number(value) ? array.push(true) : array.push(false);
					break;
				// Количество комнат
				case "rooms-count":
					if (value === "5+") {
						product.filters["rooms-count"] >= Number(value.match(/\d/))
							? array.push(true)
							: array.push(false);
						break;
					}
					product.filters["rooms-count"] === Number(value.match(/\d/))
						? array.push(true)
						: array.push(false);
					break;
			}
		}
	}
	let result = array.reduce(function (accumulator, currentValue) {
		return accumulator && currentValue;
	});
	return result;
};

export const checkCamera = (filters, product) => {
	let array = [];
	for (let key in filters) {
		if (key !== "category") {
			let value = filters[key];
			if (value.length === 0) {
				array.push(true);
				continue;
			}
			switch (key) {
				// Цена
				case 'prices':
					product.price >= value[0] && product.price <= value[1] ?
					array.push(true) : array.push(false)
					break;
				// Тип фотоаппарата
				case "type":
					value.some((elem) => elem === product.filters["type"])
						? array.push(true)
						: array.push(false);
					break;
				// Минимальное разрешение матрицы
				case "matrix-resolution":
					if (!Number(value)) {
						array.push(false);
						break;
					} else {
						product.filters["matrix-resolution"] >= Number(value)
							? array.push(true)
							: array.push(false);
						break;
					}
				// Минимальное разрешение видео
				case "supporting":
					// Значения в фильтрах и в базе данных товаров различаются
					// Плюс напрямую не сравнить что больше, 4К или HD, поэтому всё переводим в "вес"
					// и уже веса значений сравниваем между собой
					const resWeight = {
						"-": 0,
						HD: 1,
						FullHD: 2,
						"full-hd": 2,
						"4K": 3,
						"5K": 4,
					};
					const filtersResWeight = resWeight[value];
					const productResWeight = resWeight[product.filters["supporting"]];
					productResWeight >= filtersResWeight ? array.push(true) : array.push(false);
					break;
			}
		}
	}
	let result = array.reduce(function (accumulator, currentValue) {
		return accumulator && currentValue;
	});
	return result;
};

export const checkCar = (filters, product) => {
	let array = [];
	for (let key in filters) {
		if (key !== "category") {
			let value = filters[key];
			if (value.length === 0) {
				array.push(true);
				continue;
			}
			switch (key) {
				// Цена
				case 'prices':
					product.price >= value[0] && product.price <= value[1] ?
					array.push(true) : array.push(false)
					break;
				// Минимальный год выпуска
				case "production-year":
					product.filters["production-year"] >= Number(value)
						? array.push(true)
						: array.push(false);
					break;
				// Коробка передач
				case "transmission":
					product.filters["transmission"] === value ? array.push(true) : array.push(false);
					break;
				// Тип кузова
				case "body-type":
					value.some((elem) => elem === product.filters["body-type"])
						? array.push(true)
						: array.push(false);
					break;
			}
		}
	}
	let result = array.reduce(function (accumulator, currentValue) {
		return accumulator && currentValue;
	});
	return result;
};
