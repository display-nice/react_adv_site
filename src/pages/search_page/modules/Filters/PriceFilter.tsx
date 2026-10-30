import * as Slider from "@radix-ui/react-slider";
import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { setChosenPrices } from "@src/pages/search_page/SearchPageReducer";
import { addThinSpacesToNumber } from "@src/utils/prices";

/**
	Этот компонент отвечает за фильтр "Цена"
	Использует сторонний npm-пакет "@radix-ui/react-slider"
	(замена "react-slider" после перехода на Vite)
	Сам используется в _Filters.tsx
*/

// Минимальная дистанция между пальцами, как в прежнем react-slider
const MIN_DISTANCE = 10;

export const PriceFilter = () => {
	const dispatch = useAppDispatch();
	const selectedPrices = useAppSelector(
		(state) => state.SearchPageReducer.priceFilter.selectedPrices
	);
	const minBorder = useAppSelector((state) => state.SearchPageReducer.priceFilter.minBorder);
	const maxBorder = useAppSelector((state) => state.SearchPageReducer.priceFilter.maxBorder);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	const changeSelectedPrices = (values: number[]) => {
		const [newLow, newHigh] = values;
		const [oldLow, oldHigh] = selectedPrices;

		// Воспроизведение поведения pearling из react-slider:
		// палец, упирающийся в соседний, толкает его перед собой
		if (newLow > oldLow && newLow > newHigh - MIN_DISTANCE) {
			// Толкаем верхний палец вслед за нижним
			const pushedHigh = Math.min(newLow + MIN_DISTANCE, maxBorder);
			const clampedLow = Math.max(pushedHigh - MIN_DISTANCE, minBorder);
			dispatch(setChosenPrices([clampedLow, pushedHigh]));
			return;
		}
		if (newHigh < oldHigh && newHigh < newLow + MIN_DISTANCE) {
			// Толкаем нижний палец вслед за верхним
			const pushedLow = Math.max(newHigh - MIN_DISTANCE, minBorder);
			const clampedHigh = Math.min(pushedLow + MIN_DISTANCE, maxBorder);
			dispatch(setChosenPrices([pushedLow, clampedHigh]));
			return;
		}
		dispatch(setChosenPrices([newLow, newHigh]));
	};

	const sliderIsDisabled = favIsActive === true;

	return (
		<div className="filter__range">
			<label>Цена, ₽</label>
			<div className="rs-tooltip-container">
				<div className="rs-tooltip">от {addThinSpacesToNumber(selectedPrices[0])}</div>
				<div className="rs-tooltip">до {addThinSpacesToNumber(selectedPrices[1])}</div>
			</div>
			<Slider.Root
				className={sliderIsDisabled ? "rs-container disabled" : "rs-container"}
				min={minBorder}
				max={maxBorder}
				value={selectedPrices}
				onValueChange={changeSelectedPrices}
				disabled={sliderIsDisabled}
			>
				<Slider.Track className="rs-track">
					<Slider.Range className="rs-colored-line" />
				</Slider.Track>
				<Slider.Thumb
					className="rs-thumb"
					aria-label="Lower thumb"
					aria-valuetext={`Thumb value ${selectedPrices[0]}`}
				/>
				<Slider.Thumb
					className="rs-thumb"
					aria-label="Upper thumb"
					aria-valuetext={`Thumb value ${selectedPrices[1]}`}
				/>
			</Slider.Root>
		</div>
	);
};
