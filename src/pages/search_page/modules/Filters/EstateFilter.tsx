import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setMinSquare, setEstateType, setRoomQuantity } from "./FiltersReducer";

export const EstateFilter = () => {
	const dispatch = useAppDispatch();
	
	// Видимость
	const allFilterIsActive = useAppSelector((state) => state.FiltersReducer.activeFilter.all)
	const estateFilterIsActive = useAppSelector((state) => state.FiltersReducer.activeFilter.estate)
	let filterVisibility = "filter__estate";
	if (!estateFilterIsActive && !allFilterIsActive) filterVisibility += " hidden";		

	const minSquare = useAppSelector(state => state.FiltersReducer.estateFilter.minSquare)
	const changeMinSquare = (e) => {
		dispatch(setMinSquare(e.target.value));
	}

	const estTypes = useAppSelector((state) => state.FiltersReducer.estateFilter.estTypes);	
	const changeEstateType = (e) => {
		dispatch(setEstateType(e.target.value));
	}
	const typeCheckboxes = estTypes.map((item) => {
		let value = item['value'];
		if (value === '') { return }
		let text = item['text'];
		return (
			<li className="filter__checkboxes-item" key={value + "_key"}>
				<input
					className="visually-hidden"
					type="checkbox"
					name="estate-type"
					value={value}
					id={value}
				/>
				<label htmlFor={value}>{text}</label>
			</li>
		)
	})

	const roomsQuantity = useAppSelector((state) => state.FiltersReducer.estateFilter.roomsQuantity);
	const changeRoomQuantity = (e) => {
		e.preventDefault();
		dispatch(setRoomQuantity(e.target.value))
	}
	const roomsQuantityBtns = roomsQuantity.map((item) => {
		return (
			<li className="filter__radiobuttons-item" key={item.value + '_key'}>
				<input
					className="visually-hidden"
					type="radio"
					name="rooms"
					value={item.value}
					id={`${item.value + '_room'}`}
					checked={item.checked === true ? true : false}
					onClick={changeRoomQuantity}
				/>
				<label htmlFor={`${item.value + '_room'}`}>{item.text}</label>
			</li>
		)
	})
	
	return (
		<div className={filterVisibility}>
			<fieldset className="filter__type filter__type--estate">
				<legend>Тип недвижимости</legend>
				<ul className="filter__checkboxes-list filter__checkboxes-list--estate " onChange={changeEstateType}>
					{typeCheckboxes}					
				</ul>			
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
			<fieldset className="filter__radiobuttons filter__radiobuttons--ram" >
				<legend>Количество комнат</legend>
				<ul className="filter__ram-list" >
					{roomsQuantityBtns}
				</ul>
			</fieldset>
		</div>
	);
};
