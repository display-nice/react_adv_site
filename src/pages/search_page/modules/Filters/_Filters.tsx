import { ProdCatFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { PriceFilter } from "./PriceFilter";

import { useAppSelector, useAppDispatch } from "@src/hook";
import { performFiltration } from "@search_page/SearchPageReducer";

/**
	Это компонент-агрегатор всех фильтров и кнопки "Показать"
	Используется в SearchPageReducer.tsx
*/

export const Filters = () => {
	const dispatch = useAppDispatch();
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	// Кнопка "Показать"
	const Show = (e) => {
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
				onClick={Show}
				className="button filter__button"
				type="submit"
				disabled={favIsActive === true}
			>
				Показать
			</button>
		</form>
	);
};
