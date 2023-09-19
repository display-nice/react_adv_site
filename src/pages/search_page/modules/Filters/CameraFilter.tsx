import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setUlParams, setSelectParams, getActiveCategory } from "./FiltersReducer";
import { ulCrafter, selectCrafter } from "./utils";

export const CameraFilter = () => {
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
	const prodCatFilter = useAppSelector((state) => state.FiltersReducer.prodCatFilter)
	const activeFilter = getActiveCategory(prodCatFilter)
	let filterClasses = "filter__camera";
	if (activeFilter[0] !== 'cameraFilter' && activeFilter[0] !== 'all' ) filterClasses += " hidden";

	// Тип фотоаппарата
	const cameraTypeData = useAppSelector((state) => state.FiltersReducer.cameraFilter.cameraType);
	const cameraTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--camera";
	const cameraTypeFilter = ulCrafter(
		"checkbox",
		"cameraFilter",
		"cameraType",
		cameraTypeData,
		cameraTypeUlClasses,
		changeUlParams
	);

	// Минимальное разрешение матрицы
	const resMatrixData = useAppSelector(
		(state) => state.FiltersReducer.cameraFilter.resolutionMatrix
	);
	const resMatrixFilter = selectCrafter(
		"cameraFilter",
		"resolutionMatrix",
		resMatrixData,
		changeSelectParams
	);

	// Минимальное разрешение видео
	const resVideoData = useAppSelector((state) => state.FiltersReducer.cameraFilter.resolutionVideo);
	const resVideoFilter = selectCrafter(
		"cameraFilter",
		"resolutionVideo",
		resVideoData,
		changeSelectParams
	);

	return (
		<div className={filterClasses}>
			<fieldset className="filter__type filter__type--camera">
				<legend>Тип фотоаппарата</legend>
				{cameraTypeFilter}
			</fieldset>
			<div className="filter__select-wrapper filter__select-wrapper--min-resolution">
				<legend>Минимальное разрешение матрицы</legend>
				{resMatrixFilter}
			</div>
			<div className="filter__select-wrapper">
				<legend>Минимальное разрешение видео</legend>
				{resVideoFilter}
			</div>
		</div>
	);
};
