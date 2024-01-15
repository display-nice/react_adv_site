import { ProdCatFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { PriceFilter } from "./PriceFilter";

import { useAppSelector, useAppDispatch } from "@src/hook";
import { performFiltration, toggleShowFiltersXS, toggleShowSortingXS } from "@search_page/SearchPageReducer";

/**
	Это компонент-агрегатор всех фильтров и кнопки "Применить"
	Используется в SearchPageReducer.tsx
*/

export const Filters = () => {
	const dispatch = useAppDispatch();
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	// Кнопка "Применить"
	const Apply = (e) => {
		e.preventDefault();
		dispatch(performFiltration());
	};

	return (
		<form className="filter__form" action="#" method="post">
			<ProdCatFilter />
			<PriceFilter />
			<EstateFilter />
			<CameraFilter />
			<LaptopFilter />
			<CarFilter />
			<button
				onClick={Apply}
				className="button filter__button"
				type="submit"
				disabled={favIsActive === true}
			>
				Применить
			</button>
		</form>
	);
};

export const FiltersXS = () => {
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(toggleShowFiltersXS())
	}
	return (
		<button className="xs__filter-btn" onClick={handleClick}>
			<h2 className="xs__header-btn">Фильтры</h2>
			<svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
				/>
			</svg>
		</button>
	);
};
