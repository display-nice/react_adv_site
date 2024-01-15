import { Filters, FiltersXS } from "./Filters/_Filters";
import { Sort, SortXS } from "./Sort";
import { FavoritesXS } from "./Favorites";
import { useAppSelector } from "@src/hook";

export const XS_controls = () => {
	return (
		<div className="xs__controls">
			<FiltersXS />
			<SortXS />
			<FavoritesXS />
		</div>
	);
};
export const XS = () => {
	const filtersVisibility = useAppSelector(state => state.SearchPageReducer.showFiltersXS);
	const sortingVisibility = useAppSelector(state => state.SearchPageReducer.showSortingXS);
	let filtersClasses = "filter";
	if (filtersVisibility === false) {
		filtersClasses += " hidden"
	}
	
	let sortingClasses = "sorting";
	if (sortingVisibility === false) {
		sortingClasses += " hidden";
	}

	return (
		<div className="xs">
			<div className="xs__controls">
				<FiltersXS />
				<SortXS />
				<FavoritesXS />
			</div>

			<div className={filtersClasses}>
				<h2 className="section-title">Фильтры</h2>
				<Filters />
			</div>

			<div className={sortingClasses}>
				<h2 className="section-title">Сортировка</h2>
				<form className="sorting__form">
					<Sort />
				</form>
			</div>

		</div>
	);
};
