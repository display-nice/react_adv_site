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
	const productsData = useAppSelector((state) => state.SearchPageReducer.productsData);
	const checkedFilters = useAppSelector(getCheckedFilters);

	const performSearch = () => {
		// Смотрим активные категории, по которым будем искать объявление
		const allCtgList = ["Недвижимость", "Ноутбуки", "Фотоаппараты", "Автомобили"];
		let categories;
		if (checkedFilters[0]["category"] === "Все") {
			categories = allCtgList;
		} else categories = checkedFilters[0]["category"];		
	};

	const handleClick = (e) => {
		e.preventDefault();
		performSearch();
		// const results = performSearch();
		// console.log(results);
	};

	return (
		<form className="filter__form" action="#" method="post">
			<ProductCategoryFilter />
			<RangeFilter />
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
