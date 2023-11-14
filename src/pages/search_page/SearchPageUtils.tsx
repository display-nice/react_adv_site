export function performSorting(state) {
	const sortBy = state.sortBy;
	const productsData = state.productsData;
	const selectedPrices = state.priceFilter.selectedPrices;
	const filteredProducts = state.filteredProductsData;
	const categories = document.getElementById("prodCatFilter_categories") as HTMLSelectElement;
	const activeCtg = categories.value;

	let sortedProducts;
	switch (sortBy) {
		case "popular":
			sortedProducts = showPopular(productsData);
			break;
		case "cheap":
			sortedProducts = showCheap(filteredProducts);
			break;
		case "new":
			sortedProducts = showNew(filteredProducts);
			break;
	}

	// Варианты сортировки:
	// 1. Популярные.
	// Порядок по умолчанию. Данные в том порядке, в котором они пришли с сервера.
	function showPopular(productsData) {
		// console.log("showPopular start");

		let productsByCtg;
		if (activeCtg === "Все") {
			productsByCtg = productsData;
		} else {
			productsByCtg = productsData.filter((product) => product["category"] === activeCtg);
		}

		let filteredByPrices = filterOutByPrices(productsByCtg)

		console.log('showPopular returned', filteredByPrices.length, 'products');

		return filteredByPrices;
	}
	// 2. Сначала дешёвые.
	// Объявления, отсортированные по возрастанию цены от меньшей к большей.
	function showCheap(products) {
		let filteredByPrices = filterOutByPrices(products)

		let cheapFirstArr = filteredByPrices.sort((a, b) => a.price - b.price);
		console.log('showCheap returned', cheapFirstArr.length, 'products');
		return cheapFirstArr;
	}
	// 3. Новые.
	// Сортировка по дате публикации объявления, от недавних к поздним.
	function showNew(products) {
		let filteredByPrices = filterOutByPrices(products)

		let newFirstArr = filteredByPrices.sort((a, b) => b["publish-date"] - a["publish-date"]);
		console.log('showNew returned', newFirstArr.length, 'products');
		return newFirstArr;
	}

	function filterOutByPrices(products) {
		return products.filter(
			(product) => product.price >= selectedPrices[0] && product.price <= selectedPrices[1]
		);
	}

	return sortedProducts;
}

export function findMinMaxPrices(products) {
	let prodPrices = products.map((product) => product["price"]);
	const minPrice = Math.min.apply(null, prodPrices);
	const maxPrice = Math.max.apply(null, prodPrices);
	return [minPrice, maxPrice];
}
