import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setMinSquare, setFilterParams } from "./FiltersReducer";
import { ulCrafter } from "./utils";

export const EstateFilter = () => {
	const dispatch = useAppDispatch();
	const changeFilterParams = (e) => {
		dispatch(
			setFilterParams({
				filter: e.target.dataset.filter,
				type: e.target.type,
				name: e.target.name,
				value: e.target.value,
			})
		);
	};

	// Видимость
	const allFilterIsActive = useAppSelector(
		(state) => state.FiltersReducer.productCategoryFilter.activeCategory.all
	);
	const estateFilterIsActive = useAppSelector(
		(state) => state.FiltersReducer.productCategoryFilter.activeCategory.estate
	);
	let filterVisibility = "filter__estate";
	if (!estateFilterIsActive && !allFilterIsActive) filterVisibility += " hidden";

	// Минимальная площадь
	const minSquare = useAppSelector((state) => state.FiltersReducer.estateFilter.minSquare);
	const changeMinSquare = (e) => {
		dispatch(setMinSquare(e.target.value));
	};

	// Тип недвижимости
	const estateType = useAppSelector((state) => state.FiltersReducer.estateFilter.estateType);
	const estateTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--estate ";
	const estateTypeBtns = ulCrafter(
		estateType,
		"checkbox",
		"estateFilter",
		estateTypeUlClasses,
		changeFilterParams
	);

	// Количество комнат
	const roomsQuantity = useAppSelector((state) => state.FiltersReducer.estateFilter.roomsQuantity);
	const roomsQuantityUlClasses = "filter__ram-list";
	const roomsQuantityBtns = ulCrafter(
		roomsQuantity,
		"radio",
		"estateFilter",
		roomsQuantityUlClasses,
		changeFilterParams
	);

	return (
		<div className={filterVisibility}>
			<fieldset className="filter__type filter__type--estate">
				<legend>Тип недвижимости</legend>
				{estateTypeBtns}
			</fieldset>
			<div className="filter__min-square">
				<label htmlFor="square">
					Минимальная площать, м<sup>2</sup>
				</label>
				<input
					onChange={changeMinSquare}
					type="number"
					id="square"
					name="min-square"
					min="0"
					value={minSquare}
					placeholder="0"
				/>
			</div>
			<fieldset className="filter__radiobuttons filter__radiobuttons--ram">
				<legend>Количество комнат</legend>
				{roomsQuantityBtns}
			</fieldset>
		</div>
	);
};
