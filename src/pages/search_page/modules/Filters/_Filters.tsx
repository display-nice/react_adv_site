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
import { performSorting } from "../../SearchPageUtils";

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
	const sortBy = useAppSelector((state) => state.SearchPageReducer.sortBy);
	const productsData = useAppSelector((state) => state.SearchPageReducer.productsData);
	const selectedPrices = useAppSelector(
		(state) => state.SearchPageReducer.priceFilter.selectedPrices
	);

	// добавляем выбранные цены в набор активных фильтров
	let checkedFilters: checkedFiltersTypes = useAppSelector(getCheckedFilters);
	checkedFilters.prices = selectedPrices;

	const performFiltration = () => {
		let filteredProducts = [];
		if (checkedFilters["category"] === "Все") {
			filteredProducts = productsData;
		} else {
			const singleCtgProducts = productsData.filter(
				(product) => product["category"] === checkedFilters["category"]
			);
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
		}

		return filteredProducts;
	};
	// performFiltration и sort несогласованы?
	const sort = (products) => {
		const state = {
			sortBy,
			productsData,
			priceFilter: {
				selectedPrices
			},			
			filteredProductsData: products
		}
		let sortedProducts = performSorting(state);
		return sortedProducts;
	};

	const showBtnClick = (e) => {
		e.preventDefault();
		// 1. Получаем продукты, отфильтрованные согласно активным фильтрам
		const filteredProducts = performFiltration();

		// 2. Сортируем продукты согласно активному фильтру сортировки
		const sortedProducts = sort(filteredProducts);

		// 3. Фильтрованные и сортированные продукты отправляем в стейт
		// при изменении этого стейта Реакт отрисует их в компоненте CardList
		dispatch(setFilteredProductsData(sortedProducts));
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
