import ReactSlider from "react-slider";
import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { setRangeSliderValue } from "../FiltersReducer";

export const RangeFilter = () => {

	const dispatch = useAppDispatch();
	const selectedPrices = useAppSelector(state => state.FiltersReducer.rangeFilter.selectedPrices)
	const minPrice = useAppSelector(state => state.FiltersReducer.rangeFilter.minPrice)
	const maxPrice = useAppSelector(state => state.FiltersReducer.rangeFilter.maxPrice)
	
	const changeValue = (value) => {
		// console.log(`onChange: ${JSON.stringify({ value, index })}`)
		dispatch(setRangeSliderValue(value))
	}

	// const renderThumbTest = (props, state) => {
	// 	console.log(props);
	// 	console.log(state);
	// 	return (
	// 		<div {...props}>{state.valueNow}</div>
	// 	)
	// }

	return (		
		<div className="filter__range">
			{/* <label htmlFor="range">Цена, ₽</label> */}
			<div>Цена, ₽</div>
			<input type="text" id="sampleSlider" style={{'display': 'none'}}/>			
			<div className="rs-tooltip-container">
				<div className="rs-tooltip">от {selectedPrices[0]}</div>
				<div className="rs-tooltip">до {selectedPrices[1]}</div>
			</div>
			<ReactSlider
				className="rs-container"
				thumbClassName="rs-thumb"
				trackClassName="rs-colored-line"
				min={minPrice}
  				max={maxPrice}
				value={selectedPrices}
				// defaultValue={[0, 100]}
				onChange={changeValue}
				// renderThumb={renderThumbTest}
				ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
				ariaLabel={["Lower thumb", "Upper thumb"]}
				pearling
				minDistance={10}
			/>			
		</div>
	);
};
