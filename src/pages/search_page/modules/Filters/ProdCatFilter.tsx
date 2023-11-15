import { setActiveCategory } from "./_FiltersReducer";
import { useAppSelector, useAppDispatch } from "@src/hook";
import { selectCrafter } from "./utils";

export const ProdCatFilter = ({ selectCtg }) => {
	const selectCategory = (e): void => {
		selectCtg(e.target.value);
	};

	const prodCatData = useAppSelector((state) => state.FiltersReducer.prodCatFilter.categories);
	const prodCatFilter = selectCrafter(prodCatData, selectCategory);

	return (
		<div className="filter__select-wrapper">
			<legend>Категория товаров</legend>
			{prodCatFilter}
		</div>
	);
};
