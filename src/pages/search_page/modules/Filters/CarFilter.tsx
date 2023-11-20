import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setUlParams, setSelectParams, getActiveCategory } from "./_FiltersReducer";
import { ulCrafter, selectCrafter } from "@src/utils/html_elems_craft";

export const CarFilter = () => {
	const dispatch = useAppDispatch();
	const changeUlParams = (e): void => {
		dispatch(
			setUlParams({
				filter: e.target.dataset.filter,
				type: e.target.type,
				subfilter: e.target.dataset.subfilter,
				value: e.target.value,
			})
		);
	};
	const changeSelectParams = (e): void => {
		dispatch(
			setSelectParams({
				filter: e.target.selectedOptions[0].dataset.filter,
				subfilter: e.target.selectedOptions[0].dataset.subfilter,
				value: e.target.value,
			})
		);
		// console.log(e.target.options[e.target.selectedIndex]);
		// console.log(e.target.selectedIndex);
	};

	// Видимость
	const prodCatFilter = useAppSelector((state) => state.FiltersReducer.prodCatFilter);
	const activeFilter = getActiveCategory(prodCatFilter);
	let filterClasses = "filter__car";
	if (activeFilter !== "Автомобиль" || activeFilter === "Все") filterClasses += " hidden";

	// Минимальный год выпуска
	const minYearData = useAppSelector((state) => state.FiltersReducer.carFilter.minimalYear);
	const minimalYearFilter = selectCrafter(minYearData, changeSelectParams);

	// Коробка передач
	const transmissionData = useAppSelector((state) => state.FiltersReducer.carFilter.transmission);
	const transFilterUlClasses = "filter__radiobuttons-list";
	const transmissionFilter = ulCrafter(
		"radio",
		transmissionData,
		transFilterUlClasses,
		changeUlParams
	);

	// Тип кузова
	const bodyTypeData = useAppSelector((state) => state.FiltersReducer.carFilter.bodyType);
	const bodyTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--car-body";
	const bodyTypeFilter = ulCrafter("checkbox", bodyTypeData, bodyTypeUlClasses, changeUlParams);

	return (
		<div className={filterClasses}>
			<div className="filter__select-wrapper">
				<legend>Минимальный год выпуска</legend>
				{minimalYearFilter}
			</div>
			<fieldset className="filter__radiobuttons filter__radiobuttons--transmission">
				<legend>Коробка передач</legend>
				{transmissionFilter}
			</fieldset>
			<fieldset className="filter__type filter__type--car-body">
				<legend>Тип кузова</legend>
				{bodyTypeFilter}
			</fieldset>
		</div>
	);
};
