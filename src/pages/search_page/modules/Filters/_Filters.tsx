import React from "react";

import { ProductCategoryFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { RangeFilter } from "./RangeFilter/RangeFilter";

import { useAppSelector } from "@src/hook";
import { getCheckedFilters } from "./FiltersReducer";

export const Filters = () => {
	const productsData = useAppSelector(state => state.SearchPageReducer.productsData);
	// const filteredData = useAppSelector(getCheckedFilters);
	const checkedFilters = useAppSelector(getCheckedFilters);

	const performSearch = () => {		
		// function adapterFDB(activeFilter) {			
		// 	const filterToCtg = {
		// 		all: 'Все',
		// 		estateFilter: "Недвижимость",
		// 		laptopFilter: "Ноутбук",
		// 		cameraFilter: "Фотоаппарат",
		// 		carFilter: "Автомобиль",
		// 	}
		// 	let category = filterToCtg[activeFilter[0]]
		// 	return category
		// }
		// const category = adapterFDB(checkedFilters)
		// console.log(checkedFilters[0]['category']);
		// console.log(checkedFilters['category']);

		let founds = [];
		productsData.products.forEach(item => {
			console.log(item['category']);
			if (item['category'] === checkedFilters[0]['category']) {
				founds.push(item)
			}
		})
		return founds;
	}

	const handleClick = (e) => {
		e.preventDefault();
		const results = performSearch()
		console.log(results);
		// console.log('checkedFilters:');
		// console.log(checkedFilters);
	};

	return (
		<form className="filter__form" action="#" method="post">
			<ProductCategoryFilter/>
			<RangeFilter/>
			<EstateFilter/>
			<CameraFilter/>
			<LaptopFilter/>
			<CarFilter/>
			<button onClick={handleClick} className="button filter__button" type="submit">
				Показать
			</button>
		</form>
	);
};
