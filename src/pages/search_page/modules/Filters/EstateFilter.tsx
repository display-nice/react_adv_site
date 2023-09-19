import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setMinSquare, setUlParams, getActiveCategory } from "./FiltersReducer";
import { ulCrafter } from "./utils";

export const EstateFilter = () => {
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
	const prodCatFilter = useAppSelector((state) => state.FiltersReducer.prodCatFilter)
	const activeFilter = getActiveCategory(prodCatFilter)
	let filterClasses = "filter__estate";
	if (activeFilter[0] !== 'estateFilter' && activeFilter[0] !== 'all' ) filterClasses += " hidden";

	// Минимальная площадь
	const minSquare = Number(useAppSelector((state) => state.FiltersReducer.estateFilter.minSquare[0].value));
	const changeMinSquare = (e) => {
		dispatch(setMinSquare(e.target.value));
	};

	// Тип недвижимости
	const estateTypeData = useAppSelector((state) => state.FiltersReducer.estateFilter.estateType);
	const estateTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--estate ";
	const estateTypeBtns = ulCrafter(
		"checkbox",
		"estateFilter",
		"estateType",
		estateTypeData,
		estateTypeUlClasses,
		changeUlParams
	);

	// Количество комнат
	const roomsQuantityData = useAppSelector((state) => state.FiltersReducer.estateFilter.roomsQuantity);
	const roomsQuantityUlClasses = "filter__ram-list";
	const roomsQuantityBtns = ulCrafter(
		"radio",
		"estateFilter",
		"roomsQuantity",
		roomsQuantityData,
		roomsQuantityUlClasses,
		changeUlParams
	);

	return (
		<div className={filterClasses}>
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
