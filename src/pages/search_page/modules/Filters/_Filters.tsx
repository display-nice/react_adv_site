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

		// Смотрим активные категории, по которым будем искать объявление
		const allCtgList = ["Недвижимость", "Ноутбуки", "Фотоаппараты", "Автомобили"];
		let categories;
		if (checkedFilters[0]["category"] === "Все") {
			categories = allCtgList;
		} else categories = checkedFilters[0]["category"];

		// checkedFilters.forEach(item => {

		// })

		// Для каждой активной категории готовим список активных фильтров
		// и переводим его на язык базы данных
		// в итоге получаем объект с точными параметрами для поиска:
		// категория, filters
		// let etalon = [{ category: "Недвижимость", type: ["flat"], area: 20, "rooms-count": 2 }];
		

		// productsData.products.forEach((item) => {
		// 	switch (item.category) {
		// 		case "Недвижимость":
		// 			const area = item.filters.area
		// 			if (
		// 				etalon[0]["type"].includes(item.filters.type) &&
		// 				item.filters.area >= etalon[0]["area"] &&
		// 				item.filters["rooms-count"] == etalon[0]["rooms-count"]
		// 			) {
		// 				console.log(item);
		// 			}
		// 	}
		// });
		
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
