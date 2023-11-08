import { ProductCategoryFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";

import { useAppSelector, useAppDispatch } from "@src/hook";
import { checkLaptop, checkEstate, checkCamera, checkCar } from "./conditions";
import { setFilteredProductsData, setPriceBorders, setChosenPrices } from "../../SearchPageReducer";
import { getCheckedFilters, setActiveCategory } from "./FiltersReducer";
import { showPopular, showCheap, showNew } from "../../SearchPageReducer";


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

export const Filters = () => {
	const dispatch = useAppDispatch();
	const productsData = useAppSelector((state) => state.SearchPageReducer.productsData);
	const selectedPrices = useAppSelector(
		(state) => state.SearchPageReducer.priceFilter.selectedPrices
	);
	const sortState = useAppSelector((state) => state.SearchPageReducer.sort);

	// добавляем выбранные цены в набор активных фильтров
	let checkedFilters: checkedFiltersTypes = useAppSelector(getCheckedFilters);
	checkedFilters.prices = selectedPrices;

	const performFiltration = () => {
		const singleCtgProducts = productsData.filter(
			(product) => product["category"] === checkedFilters["category"]
		);
		let filteredProducts = [];

		singleCtgProducts.forEach((product) => {
			switch (checkedFilters["category"]) {
				case "Недвижимость":
					if (checkEstate(checkedFilters, product)) filteredProducts.push(product);
					break;
				case "Ноутбук":
					if (checkLaptop(checkedFilters, product)) filteredProducts.push(product);
					break;
				case "Фотоаппарат":
					if (checkCamera(checkedFilters, product)) filteredProducts.push(product);
					break;
				case "Автомобиль":
					if (checkCar(checkedFilters, product)) filteredProducts.push(product);
					break;
			}
		});
		return filteredProducts;
	};

	// Используется в ProdCatFilter при выборе категории (option в select'е)
	const filterOnSelect = (category) => {
		let productsOnCtg;
		if (category === "Все") {
			productsOnCtg = productsData;
		} else {
			productsOnCtg = productsData.filter((product) => product["category"] === category);
		}
		// Поиск минимального и максимального значений цен в выводимых на экран продуктах
		let prodPrices = productsOnCtg.map((product) => product["price"]);
		const minPrice = Math.min.apply(null, prodPrices);
		const maxPrice = Math.max.apply(null, prodPrices);

		dispatch(setPriceBorders([minPrice, maxPrice]));
		dispatch(setChosenPrices([minPrice, maxPrice]));
		dispatch(setActiveCategory(category));
		dispatch(setFilteredProductsData(productsOnCtg));
	};

	const showBtnClick = (e) => {
		e.preventDefault();
		// 1. Получаем продукты, отфильтрованные согласно активным фильтрам
		const filteredProducts = performFiltration();
		// dispatch(performSorting(e.target.value));
		// 2. Сортируем продукты, согласно активному фильтру сортировки
		// 2.1 определяем активный фильтр
		let sortedFilteredProducts;
		let activeSortType;
		for (let key in sortState) {
			if (sortState[key] === true) {
				activeSortType = key;
				break;
			}
		}
		switch (activeSortType) {
			case "popular":
				sortedFilteredProducts = showPopular('showBtn', filteredProducts);
				break;
			case "cheap":
				sortedFilteredProducts = showCheap(filteredProducts);
				break;
			case "new":
				sortedFilteredProducts = showNew(filteredProducts);
				break;
		}
		// 3. Фильтрованные и сортированные продукты отправляем в стейт
		// при изменении этого стейта Реакт отрисует их в компоненте CardList
		dispatch(setFilteredProductsData(sortedFilteredProducts));
	};

	return (
		<form className="filter__form" action="#" method="post">
			<ProductCategoryFilter filterOnSelect={filterOnSelect} />
			<PriceFilter />
			<EstateFilter />
			<CameraFilter />
			<LaptopFilter />
			<CarFilter />
			<button onClick={showBtnClick} className="button filter__button" type="submit">
				Показать
			</button>
		</form>
	);
};
