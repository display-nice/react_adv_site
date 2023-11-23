import { ProdCatFilter } from "./ProdCatFilter";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { PriceFilter } from "./PriceFilter";

import { useAppSelector, useAppDispatch } from "@src/hook";
import { performSorting, performFiltration } from "../../SearchPageReducer";
import { getCheckedFilters } from "./_FiltersReducer";

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
	const checkedFilters: checkedFiltersTypes = useAppSelector(getCheckedFilters);
	const sortBy = useAppSelector((state) => state.SearchPageReducer.sortBy);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	const Show = (e) => {
		e.preventDefault();
		dispatch(performFiltration(checkedFilters));
		// предотвращение повторной фильтрации
		// повт. фильтр-я предусмотрена в showPopular
		if (sortBy !== "popular") dispatch(performSorting(checkedFilters));
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
