/**
	Этот набор утилит отвечает за работу с ценами
*/

// Подставляет пробелы в цену через каждые 3 знака для удобства восприятия
export function addThinSpacesToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");
}

// Ищет минимальную и максимальную цены в массиве объектов
export function findMinMaxPrices(products) {
	let prodPrices = products.map((product) => product["price"]);
	const minPrice = Math.min.apply(null, prodPrices);
	const maxPrice = Math.max.apply(null, prodPrices);
	return [minPrice, maxPrice];
}