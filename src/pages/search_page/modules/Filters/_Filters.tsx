import { ProdCatFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { PriceFilter } from "./PriceFilter";

import { useAppSelector, useAppDispatch } from "@src/hook";
import { performFiltration } from "@search_page/SearchPageReducer";

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
