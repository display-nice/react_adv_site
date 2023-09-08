import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setFilterParams } from "./FiltersReducer";
import { ulCrafter } from "./utils";

export const LaptopFilter = () => {
	const dispatch = useAppDispatch();
	const changeFilterParams = (e) => {
		dispatch(setFilterParams({
			filter: e.target.dataset.filter,
			type: e.target.type,
			name: e.target.name,
			value: e.target.value
		}))
	}

	// Видимость
	const allFilterIsActive = useAppSelector((state) => state.FiltersReducer.activeFilter.all)
	const laptopsFilterIsActive = useAppSelector((state) => state.FiltersReducer.activeFilter.laptops)
	let filterVisibility = "filter__laptop";
	if (!laptopsFilterIsActive && !allFilterIsActive) filterVisibility += " hidden";

	// Тип ноутбука
	const laptopType = useAppSelector((state) => state.FiltersReducer.laptopFilter.laptopType);	
	const laptopTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--laptop-ram";
	const laptopTypeCheckboxes = ulCrafter(laptopType, 'checkbox', 'laptopFilter', laptopTypeUlClasses, changeFilterParams);

	// Минимальный объем оперативной памяти
	const laptopRamValue = useAppSelector((state) => state.FiltersReducer.laptopFilter.laptopRamValue)
	const laptopRamUlClasses = "filter__radiobuttons-list";
	const laptopRamButtons = ulCrafter(laptopRamValue, 'radio', 'laptopFilter', laptopRamUlClasses, changeFilterParams);

	// Минимальная диагональ экрана
	const laptopDiagonal = useAppSelector((state) => state.FiltersReducer.laptopFilter.laptopDiagonal);
	const laptopDiagonalUlClasses = "filter__radiobuttons-list";
	const laptopDiagonalButtons = ulCrafter(laptopDiagonal, 'radio', 'laptopFilter', laptopDiagonalUlClasses, changeFilterParams);

	// Тип процессора
	const laptopProcType = useAppSelector(state => state.FiltersReducer.laptopFilter.laptopProcType);
	const laptopProcTypeClasses = "filter__checkboxes-list filter__checkboxes-list--laptop-processor";
	const laptopProcTypeButtons = ulCrafter(laptopProcType, 'checkbox', 'laptopFilter', laptopProcTypeClasses, changeFilterParams)

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