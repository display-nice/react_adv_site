import { checkProduct } from "@helpers/productConditions";

/**
	Этот компонент отвечает за фильтрацию и сортировку
	Здесь происходят главные процессы по фильтрации по выбранным фильтрам,
	по сортировке по выбранным типам сортировки,
	и по взаимодействию фильтрации и сортировки
	Функции используются в SearchPageReducer.tsx и Sort.tsx
*/

// Функция фильтрации
export function filter(state, checkedFilters) {
	const { productsServer, productsOnCtg, priceFilter } = state;
	const activeCtg = checkedFilters["category"];
	const selectedPrices = priceFilter.selectedPrices;

	let filteredProducts = [];
	if (activeCtg === "Все") {
		filteredProducts = filterOutByPrices(productsServer);
	} else {
		const suitableForPrices = filterOutByPrices(productsOnCtg);
		suitableForPrices.forEach((product) => {
			if (checkProduct(checkedFilters, product)) filteredProducts.push(product);
		});
	}

	// Вспомогательная функция отфильтровки по ценам
	function filterOutByPrices(products) {
		return products.filter(
			(product) => product.price >= selectedPrices[0] && product.price <= selectedPrices[1]
		);
	}

	return filteredProducts;
}

// Функция сортировки
export function sort(state, checkedFilters) {
	const { sortBy, displayedProducts } = state;

	let sortedProducts;
	switch (sortBy) {
		case "popular":
			sortedProducts = showPopular();
			break;
		case "cheap":
			sortedProducts = showCheap();
			break;
		case "new":
			sortedProducts = showNew();
			break;
	}

	// Варианты сортировки:
	// 1. Популярные.
	// Порядок по умолчанию. Данные в том порядке, в котором они пришли с сервера.
	function showPopular() {
		let popularProducts = filter(state, checkedFilters);

		return popularProducts;
	}
	// 2. Сначала дешёвые.
	// Объявления, отсортированные по возрастанию цены от меньшей к большей.
	function showCheap() {
		// cheapFirstProducts - это массив
		let cheapFirstProducts = displayedProducts.sort((a, b) => a.price - b.price);

		return cheapFirstProducts;
	}
	// 3. Новые.
	// Сортировка по дате публикации объявления, от недавних к поздним.
	function showNew() {
		// newFirstProducts - это массив
		let newFirstProducts = displayedProducts.sort((a, b) => b["publish-date"] - a["publish-date"]);

		return newFirstProducts;
	}

	return sortedProducts;
}
