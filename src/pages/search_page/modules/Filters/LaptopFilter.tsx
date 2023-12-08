import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setUlParams, getActiveCategory } from "./_FiltersReducer";
import { UlCrafter } from "@src/utils/html_elems_craft";

/**
	Этот компонент отвечает за фильтр "Ноутбуки"
	Используется в _Filters.tsx
*/

export const LaptopFilter = () => {
	const dispatch = useAppDispatch();
	const changeUlParams = (e) => {
		dispatch(
			setUlParams({
				type: e.target.type,
				filter: e.target.dataset.filter,
				subfilter: e.target.dataset.subfilter,
				value: e.target.value,
			})
		);
	};

	// Видимость
	const prodCatFilter = useAppSelector((state) => state.FiltersReducer.prodCatFilter);
	const activeFilter = getActiveCategory(prodCatFilter);
	let filterClasses = "filter__laptop";
	if (activeFilter !== "Ноутбук" || activeFilter === "Все") filterClasses += " hidden";

	// Тип ноутбука
	const laptopTypeData = useAppSelector((state) => state.FiltersReducer.laptopFilter.laptopType);
	const laptopTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--laptop-ram ";
	const laptopTypeCheckboxes = UlCrafter(
		"checkbox",
		laptopTypeData,
		laptopTypeUlClasses,
		changeUlParams
	);

	// Минимальный объем оперативной памяти
	const laptopRamData = useAppSelector((state) => state.FiltersReducer.laptopFilter.laptopRamValue);
	const laptopRamUlClasses = "filter__radiobuttons-list";
	const laptopRamButtons = UlCrafter("radio", laptopRamData, laptopRamUlClasses, changeUlParams);

	// Минимальная диагональ экрана
	const laptopDiagonalData = useAppSelector(
		(state) => state.FiltersReducer.laptopFilter.laptopDiagonal
	);
	const laptopDiagonalUlClasses = "filter__radiobuttons-list";
	const laptopDiagonalButtons = UlCrafter(
		"radio",
		laptopDiagonalData,
		laptopDiagonalUlClasses,
		changeUlParams
	);

	// Тип процессора
	const laptopProcTypeData = useAppSelector(
		(state) => state.FiltersReducer.laptopFilter.laptopProcType
	);
	const laptopProcTypeClasses =
		"filter__checkboxes-list filter__checkboxes-list--laptop-processor ";
	const laptopProcTypeButtons = UlCrafter(
		"checkbox",
		laptopProcTypeData,
		laptopProcTypeClasses,
		changeUlParams
	);

	return (
		<div className={filterClasses}>
			<fieldset className="filter__type filter__type--laptop">
				<legend>Тип ноутбука</legend>
				{laptopTypeCheckboxes}
			</fieldset>
			<fieldset className="filter__radiobuttons filter__radiobuttons--ram">
				<legend>Минимальный объем оперативной памяти</legend>
				{laptopRamButtons}
			</fieldset>
			<fieldset className="filter__radiobuttons filter__radiobuttons--diagonal">
				<legend>Минимальная диагональ экрана</legend>
				{laptopDiagonalButtons}
			</fieldset>
			<fieldset className="filter__type filter__type--laptop-processor">
				<legend>Тип процессора</legend>
				{laptopProcTypeButtons}
			</fieldset>
		</div>
	);
};
