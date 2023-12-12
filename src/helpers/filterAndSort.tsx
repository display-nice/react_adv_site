import { checkProduct } from "@helpers/productConditions";

/**
	Этот компонент отвечает за фильтрацию и сортировку
	Здесь происходят главные процессы по фильтрации по выбранным фильтрам,
	по сортировке по выбранным типам сортировки,
	и по взаимодействию фильтрации и сортировки
	Функции используются в SearchPageReducer.tsx и Sort.tsx
*/

export function filterAndSort(state, checkedFilters) {
	const sortBy = state.sortBy;
	const filteredProducts = filter(state, checkedFilters);
	const sortedProducts = sort(sortBy, filteredProducts);
	return sortedProducts;
}

// ------------------------------- Фильтрация ------------------------------------
function filter(state, checkedFilters) {
	const { productsFromServer, productsAfterCtgSelect, priceFilter } = state;
	const selectedPrices = priceFilter.selectedPrices;
	const activeCtg = checkedFilters["category"];

	// Вспомогательная функция отфильтровки по ценам
	function filterOutByPrices(products) {
		return products.filter(
			(product) => product.price >= selectedPrices[0] && product.price <= selectedPrices[1]
		);
	}

	// Непосредственно фильтрация (и по ценам, и по всем фильтрам)
	let filteredProducts = [];
	if (activeCtg === "Все") {
		filteredProducts = filterOutByPrices(productsFromServer);
	} else {
		const suitableForPrices = filterOutByPrices(productsAfterCtgSelect);
		suitableForPrices.forEach((product) => {
			if (checkProduct(checkedFilters, product)) filteredProducts.push(product);
		});
	}
	return filteredProducts;
}

/**
	----------------------------- Сортировка --------------------------------
		Варианты сортировки:
		1. Популярные.
		Порядок по умолчанию. Данные в том порядке, в котором они пришли с сервера.
		2. Сначала дешёвые.
		Объявления, отсортированные по возрастанию цены от меньшей к большей.
		3. Новые.
		Сортировка по дате публикации объявления, от недавних к поздним.
	*/
function sort(sortBy, products) {
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

	function showPopular() {
		return products;
	}
	function showCheap() {
		let cheapFirstProducts = products.sort((a, b) => a.price - b.price); // массив
		return cheapFirstProducts;
	}
	function showNew() {
		let newFirstProducts = products.sort((a, b) => b["publish-date"] - a["publish-date"]); // массив
		return newFirstProducts;
	}
	return sortedProducts;
}
