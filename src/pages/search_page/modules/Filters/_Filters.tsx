import { ProdCatFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";

import { useAppSelector, useAppDispatch } from "@src/hook";
import { checkLaptop, checkEstate, checkCamera, checkCar } from "./conditions";
import {
	setProductsOnCtg,
	setFilteredProducts,
	setPriceBorders,
	setChosenPrices,
	setDefaultSort,
} from "../../SearchPageReducer";
import { getCheckedFilters, setActiveCategory } from "./_FiltersReducer";
import { performSorting, findMinMaxPrices } from "../../SearchPageUtils";

import { performFiltration } from "../../SearchPageUtils";

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
	const productsServer = useAppSelector((state) => state.SearchPageReducer.productsServer);
	const productsOnCtg = useAppSelector((state) => state.SearchPageReducer.productsOnCtg);
	const selectedPrices = useAppSelector(
		(state) => state.SearchPageReducer.priceFilter.selectedPrices
	);
	const checkedFilters: checkedFiltersTypes = useAppSelector(getCheckedFilters);
	// checkedFilters.prices = selectedPrices;
	const activeCtg = checkedFilters["category"];

	const filterLocal = () => {
		const state = {
			productsServer,
			productsOnCtg,
			priceFilter: {
				selectedPrices,
			},
			activeCtg
		};
		const filteredProducts = performFiltration(state, checkedFilters);
		// let filteredProducts = [];
		// console.log("checkedFilters", checkedFilters);
		// console.log("productsOnCtg", productsOnCtg);
		return filteredProducts;
	};

	const sortLocal = (products) => {
		const state = {
			sortBy,
			productsServer,
			productsOnCtg,
			filteredProducts: products,
			priceFilter: {
				selectedPrices,
			},
			activeCtg
		};
		console.log('sortLocal priceFilter', state.priceFilter);
		let sortedProducts = performSorting(state, checkedFilters);
		return sortedProducts;
	};

	const ShowBtnClick = (e) => {
		e.preventDefault();
		// 1. Получаем продукты, отфильтрованные согласно активным фильтрам
		const filteredProducts = filterLocal();
		console.log("performFiltration returned", filteredProducts.length, "products");

		// 2. Сортируем продукты согласно активному фильтру сортировки
		const sortedProducts = sortLocal(filteredProducts);
		console.log("sortedProducts returned", sortedProducts.length, "products");

		// 3. Фильтрованные и сортированные продукты отправляем в стейт
		// при изменении этого стейта Реакт отрисует их в компоненте CardList
		dispatch(setFilteredProducts(sortedProducts));
	};

	// Используется в ProdCatFilter при выборе категории (option в select'е)
	const selectCtg = (pressedCtgBtn) => {
		// Фильтрация по выбранной пользователем категории (по нажатому селекту)
		let productsOnCtg;
		if (pressedCtgBtn === "Все") {
			productsOnCtg = productsServer;
		} else {
			productsOnCtg = productsServer.filter((product) => product["category"] === pressedCtgBtn);
		}

		// Поиск минимального и максимального значений цен в выводимых на экран продуктах
		let minMaxPrices = findMinMaxPrices(productsOnCtg);

		dispatch(setPriceBorders([minMaxPrices[0], minMaxPrices[1]]));
		dispatch(setChosenPrices([minMaxPrices[0], minMaxPrices[1]]));
		dispatch(setActiveCategory(pressedCtgBtn));
		dispatch(setProductsOnCtg(productsOnCtg));
		dispatch(setFilteredProducts(productsOnCtg));
		dispatch(setDefaultSort());
	};

	return (
		<form className="filter__form" action="#" method="post">
			<ProdCatFilter selectCtg={selectCtg} />
			<PriceFilter />
			<EstateFilter />
			<CameraFilter />
			<LaptopFilter />
			<CarFilter />
			<button onClick={ShowBtnClick} className="button filter__button" type="submit">
				Показать
			</button>
		</form>
	);
};
