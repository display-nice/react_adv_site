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
	const selectedPrices = useAppSelector((state) => state.SearchPageReducer.priceFilter.selectedPrices);
	
	// добавляем выбранные цены в набор активных фильтров
	let checkedFilters: checkedFiltersTypes = useAppSelector(getCheckedFilters);
	checkedFilters.prices = selectedPrices;
	console.log('checkedFilters', checkedFilters);

	const performSearch = () => {
		const singleCtgProducts = productsData.filter(
			(product) => product["category"] === checkedFilters["category"]
		);
		let filteredProducts = [];
		// console.log('checkedFilters', checkedFilters);
		singleCtgProducts.forEach((product) => {
			switch (checkedFilters["category"]) {
				case "Недвижимость":
					if (checkEstate(checkedFilters, product))
						// filteredProducts.push(product['name']);					
						filteredProducts.push(product);					
				break;
				case "Ноутбук":
					if (checkLaptop(checkedFilters, product))
						// filteredProducts.push(product['name']);					
						filteredProducts.push(product);					
				break;
				case "Фотоаппарат":
					if (checkCamera(checkedFilters, product))
						// filteredProducts.push(product['name']);
						filteredProducts.push(product);
				break;
				case "Автомобиль":
					if (checkCar(checkedFilters, product))
						// filteredProducts.push(product['name']);
						filteredProducts.push(product);
				break;
			}
		});
		// console.log("filteredProducts", filteredProducts);
		return filteredProducts;
	};

	const handleClick = (e) => {
		e.preventDefault();
		const filteredProducts = performSearch();
		dispatch(setFilteredProductsData(filteredProducts));
	};

	const filterOnCategory = (category) => {
		let productsOnCtg;
		if (category === 'Все') {
			productsOnCtg = productsData;
		} else {
			productsOnCtg = productsData.filter(
				(product) => product["category"] === category
			);
		}
		// Поиск минимального и максимального значений цен в выводимых на экран продуктах
		let prodPrices = productsOnCtg.map(product => product["price"]);
		const minPrice = Math.min.apply(null, prodPrices);
		const maxPrice = Math.max.apply(null, prodPrices);
		
		dispatch(setPriceBorders([minPrice, maxPrice]));
		dispatch(setChosenPrices([minPrice, maxPrice]));	 	
		dispatch(setActiveCategory(category));
		dispatch(setFilteredProductsData(productsOnCtg));
	}

	return (
		<form className="filter__form" action="#" method="post">
			<ProductCategoryFilter filterOnCategory={filterOnCategory}/>
			<PriceFilter />
			<EstateFilter />
			<CameraFilter />
			<LaptopFilter />
			<CarFilter />
			<button onClick={handleClick} className="button filter__button" type="submit">
				Показать
			</button>
		</form>
	);
};
