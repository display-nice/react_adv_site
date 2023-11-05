import ReactSlider from "react-slider";
import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { setChosenPrices } from "@src/pages/search_page/SearchPageReducer";
import { addThinSpacesToNumber } from "../../CardList/utils";

export const PriceFilter = () => {

	const dispatch = useAppDispatch();
	const selectedPrices = useAppSelector(state => state.SearchPageReducer.priceFilter.selectedPrices)
	const minBorder = useAppSelector(state => state.SearchPageReducer.priceFilter.minBorder)
	const maxBorder = useAppSelector(state => state.SearchPageReducer.priceFilter.maxBorder)
	
	const changeSelectedPrices = (value) => {
		dispatch(setChosenPrices(value))
	}

	return (		
		<div className="filter__range">
			<label>Цена, ₽</label>
			{/* <label htmlFor="range">Цена, ₽</label> */}
			{/* <div>Цена, ₽</div> */}
			<input type="text" id="sampleSlider" style={{'display': 'none'}}/>			
			<div className="rs-tooltip-container">
				<div className="rs-tooltip">от {addThinSpacesToNumber(selectedPrices[0])}</div>
				<div className="rs-tooltip">до {addThinSpacesToNumber(selectedPrices[1])}</div>
			</div>
			<ReactSlider
				className="rs-container"
				thumbClassName="rs-thumb"
				trackClassName="rs-colored-line"
				min={minBorder}
  				max={maxBorder}
				value={selectedPrices}
				// defaultValue={[0, 100]}
				onChange={changeSelectedPrices}
				// renderThumb={renderThumbTest}
				ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
				ariaLabel={["Lower thumb", "Upper thumb"]}
				pearling
				minDistance={10}
			/>			
		</div>
	);
};
