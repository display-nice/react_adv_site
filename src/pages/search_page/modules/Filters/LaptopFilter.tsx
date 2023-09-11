import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setUlParams } from "./FiltersReducer";
import { ulCrafter } from "./utils";

export const LaptopFilter = () => {
	const dispatch = useAppDispatch();
	const changeUlParams = (e) => {
		dispatch(
			setUlParams({
				type: e.target.type,
				filter: e.target.dataset.filter,
				subfilter: e.target.name,
				value: e.target.value,
			})
		);
	};
	

	// Видимость
	const allFilterIsActive = useAppSelector((state) => state.FiltersReducer.productCategoryFilter.activeCategory.all);
	const laptopsFilterIsActive = useAppSelector(
		(state) => state.FiltersReducer.productCategoryFilter.activeCategory.laptops
	);	
	let filterVisibility = "filter__laptop";
	if (!laptopsFilterIsActive && !allFilterIsActive) filterVisibility += " hidden";

	// Тип ноутбука
	const laptopTypeData = useAppSelector((state) => state.FiltersReducer.laptopFilter.laptopType);
	const laptopTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--laptop-ram";
	const laptopTypeCheckboxes = ulCrafter(		
		"checkbox",		
		"laptopFilter",
		"laptopType",
		laptopTypeData,
		laptopTypeUlClasses,
		changeUlParams
	);

	// Минимальный объем оперативной памяти
	const laptopRamData = useAppSelector(
		(state) => state.FiltersReducer.laptopFilter.laptopRamValue
	);
	const laptopRamUlClasses = "filter__radiobuttons-list";
	const laptopRamButtons = ulCrafter(
		"radio",
		"laptopFilter",
		"laptopRamValue",
		laptopRamData,
		laptopRamUlClasses,
		changeUlParams
	);

	// Минимальная диагональ экрана
	const laptopDiagonalData = useAppSelector(
		(state) => state.FiltersReducer.laptopFilter.laptopDiagonal
	);
	const laptopDiagonalUlClasses = "filter__radiobuttons-list";
	const laptopDiagonalButtons = ulCrafter(
		"radio",
		"laptopFilter",
		"laptopDiagonal",
		laptopDiagonalData,
		laptopDiagonalUlClasses,
		changeUlParams
	);

	// Тип процессора
	const laptopProcTypeData = useAppSelector(
		(state) => state.FiltersReducer.laptopFilter.laptopProcType
	);
	const laptopProcTypeClasses = "filter__checkboxes-list filter__checkboxes-list--laptop-processor";
	const laptopProcTypeButtons = ulCrafter(
		"checkbox",
		"laptopFilter",
		"laptopProcType",
		laptopProcTypeData,
		laptopProcTypeClasses,
		changeUlParams
	);

	return (
		<div className={filterVisibility}>
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
