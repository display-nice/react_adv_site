import { useAppSelector } from "@src/hook";
import { getActiveCtg, getCheckedFilters } from "./modules/Filters/_FiltersReducer";
import { checkEstate, checkLaptop, checkCamera, checkCar } from "./modules/Filters/conditions";

interface checkedFiltersTypes {
	category?: string;
	prices?: number[];
	estateType?: string[];
	minSquare?: string;
	roomsQuantity?: string;
	laptopType?: string[];
	laptopRamValue?: string;
	laptopDiagonal?: string;
	laptopProcType?: string[];
	cameraType?: string[];
	resolutionMatrix?: string;
	resolutionVideo?: string;
	bodyType?: string[];
	minimalYear?: string;
	transmission?: string;
}

// export function filterAndSort(state, checkedFilters) {
// 	const filteredProducts = performFiltration(state, checkedFilters);
// 	const sortedProducts = performSorting(state, checkedFilters);
// 	return sortedProducts
// }

export function performFiltration(state, checkedFilters) {
	console.log('performFiltration started');

	const { productsServer, productsOnCtg, priceFilter } = state;
	const activeCtg = checkedFilters["category"]
	let checkedFilters2 = {...checkedFilters};
	checkedFilters2.prices = priceFilter.selectedPrices;
	// console.log(checkedFilters2);
	// console.log(checkedFilters2.prices[0], checkedFilters2.prices[1]);
	// console.log(activeCtg);

	let filteredProducts = [];
	if (activeCtg === "Все") {
		filteredProducts = productsServer;
	} else {
		productsOnCtg.forEach((product) => {
			switch (activeCtg) {
				case "Недвижимость":
					if (checkEstate(checkedFilters2, product)) filteredProducts.push(product);
					break;
				case "Ноутбук":
					if (checkLaptop(checkedFilters2, product)) filteredProducts.push(product);
					break;
				case "Фотоаппарат":
					if (checkCamera(checkedFilters2, product)) filteredProducts.push(product);
					break;
				case "Автомобиль":
					if (checkCar(checkedFilters2, product)) filteredProducts.push(product);
					break;
			}
		});
	}
	console.log('performFiltration вернула filteredProducts', filteredProducts.length);
	return filteredProducts;
}

export function performSorting(state, checkedFilters) {
	const { sortBy, productsServer, productsOnCtg, filteredProducts, priceFilter, activeCtg } =
		state;
	const selectedPrices = priceFilter.selectedPrices
	// const categories = document.getElementById("prodCatFilter_categories") as HTMLSelectElement;
	// const activeCtg = categories.value;

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
		console.log(filteredProducts);

		let filteredByPrices = filterOutByPrices(filteredProducts);

		console.log("showPopular returned", filteredByPrices.length, "products");

		return filteredByPrices;
	}
	// 2. Сначала дешёвые.
	// Объявления, отсортированные по возрастанию цены от меньшей к большей.
	function showCheap() {
		console.log("showCheap start");
		let filteredByPrices = filterOutByPrices(filteredProducts);

		// let cheapFirstArr = [];
		let cheapFirstArr = filteredByPrices.sort((a, b) => a.price - b.price);
		console.log("showCheap returned", cheapFirstArr.length, "products");
		return cheapFirstArr;

	}
	// 3. Новые.
	// Сортировка по дате публикации объявления, от недавних к поздним.
	function showNew() {
		let filteredByPrices = filterOutByPrices(filteredProducts);

		let newFirstArr = filteredByPrices.sort((a, b) => b["publish-date"] - a["publish-date"]);
		console.log("showNew returned", newFirstArr.length, "products");
		return newFirstArr;
	}

	// Вспомогательная функция отфильтровки по ценам
	function filterOutByPrices(products) {
		console.log('filterOutByPrices start');
		console.log('selectedPrices', selectedPrices);
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
