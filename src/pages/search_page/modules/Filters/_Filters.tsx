import { ProductCategoryFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { PriceFilter } from "./RangeFilter/RangeFilter";

import { useAppSelector, useAppDispatch } from "@src/hook";
import { getCheckedFilters } from "./FiltersReducer";
import { checkLaptop, checkEstate, checkCamera, checkCar } from "./conditions";
import { setFilteredProductsData } from "../../SearchPageReducer";

export const Filters = () => {
	const dispatch = useAppDispatch();
	const productsData = useAppSelector((state) => state.SearchPageReducer.productsData);
	const currentFilters = useAppSelector(getCheckedFilters);

	const performSearch = () => {
		const singleCtgProducts = productsData.filter(
			(product) => product["category"] === currentFilters["category"]
		);
		let filteredProducts = [];
		console.log('currentFilters', currentFilters);
		singleCtgProducts.forEach((product) => {
			switch (currentFilters["category"]) {
				case "Недвижимость":
					if (checkEstate(currentFilters, product))
						// filteredProducts.push(product['name']);					
						filteredProducts.push(product);					
				break;
				case "Ноутбук":
					if (checkLaptop(currentFilters, product))
						// filteredProducts.push(product['name']);					
						filteredProducts.push(product);					
				break;
				case "Фотоаппарат":
					if (checkCamera(currentFilters, product))
						// filteredProducts.push(product['name']);
						filteredProducts.push(product);
				break;
				case "Автомобиль":
					if (checkCar(currentFilters, product))
						// filteredProducts.push(product['name']);
						filteredProducts.push(product);
				break;
			}
		});
		console.log("filteredProducts", filteredProducts);
		return filteredProducts;
	};

	const handleClick = (e) => {
		e.preventDefault();
		const filteredProducts = performSearch();
		dispatch(setFilteredProductsData(filteredProducts));
	};

	return (
		<form className="filter__form" action="#" method="post">
			<ProductCategoryFilter />
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
