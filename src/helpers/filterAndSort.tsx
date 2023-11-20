import { checkProduct } from "@helpers/productConditions";

// Функция фильтрации
export function filter(state, checkedFilters) {
	console.log("performFiltration started");
	console.log("checkedFilters", checkedFilters);

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
	console.log("performFiltration вернула popularProducts", filteredProducts.length);

	// Вспомогательная функция отфильтровки по ценам
	function filterOutByPrices(products) {
		console.log("filterOutByPrices start");
		console.log("selectedPrices", selectedPrices);
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
			console.log("popular");
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
		console.log("showPopular start");

		let popularProducts = filter(state, checkedFilters);

		console.log("showPopular returned", popularProducts.length, "products");
		return popularProducts;
	}
	// 2. Сначала дешёвые.
	// Объявления, отсортированные по возрастанию цены от меньшей к большей.
	function showCheap() {
		console.log("showCheap start");
		// cheapFirstProducts - это массив
		let cheapFirstProducts = displayedProducts.sort((a, b) => a.price - b.price);
		console.log("showCheap returned", cheapFirstProducts.length, "products");
		return cheapFirstProducts;
	}
	// 3. Новые.
	// Сортировка по дате публикации объявления, от недавних к поздним.
	function showNew() {
		console.log("showNew start");
		// newFirstProducts - это массив
		let newFirstProducts = displayedProducts.sort((a, b) => b["publish-date"] - a["publish-date"]);

		console.log("showNew returned", newFirstProducts.length, "products");
		return newFirstProducts;
	}

	return sortedProducts;
}