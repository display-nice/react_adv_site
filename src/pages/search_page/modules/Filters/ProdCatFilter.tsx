import { useAppSelector, useAppDispatch } from "@src/hook";
import { SelectCrafter } from "@src/utils/html_elems_craft";
import { findMinMaxPrices } from "@utils/prices";
import {
	setPriceBorders,
	setChosenPrices,
	setProductsAfterCtgSelect,
	performFiltration,
	setActiveCategory,
} from "@search_page/SearchPageReducer";

/**
	Этот компонент отвечает за фильтр "Категория товаров"
	Используется в _Filters.tsx
*/

export const ProdCatFilter = () => {
	const dispatch = useAppDispatch();
	const productsFromServer = useAppSelector((state) => state.SearchPageReducer.productsFromServer);

	// Фильтрация по выбранной пользователем категории (по нажатому селекту)
	const selectCategory = (e) => {
		const pressedCtgBtn = e.target.value;
		let productsAfterCtgSelect;
		if (pressedCtgBtn === "Все") {
			productsAfterCtgSelect = productsFromServer;
		} else {
			productsAfterCtgSelect = productsFromServer.filter(
				(product) => product["category"] === pressedCtgBtn
			);
		}

		// Поиск минимального и максимального значений цен в выводимых на экран продуктах
		// и дальнейшая их установка в стейт (т.е. идёт подготовка цен)
		let minMaxPrices = findMinMaxPrices(productsAfterCtgSelect);
		dispatch(setPriceBorders([minMaxPrices[0], minMaxPrices[1]]));
		dispatch(setChosenPrices([minMaxPrices[0], minMaxPrices[1]]));

		// Запись в стейт активной категории и продуктов по категории
		// Продукты по категории дальше используются для фильтрации по кнопке "Показать"
		dispatch(setActiveCategory(pressedCtgBtn));
		dispatch(setProductsAfterCtgSelect(productsAfterCtgSelect));

		// При фильтрации по категории используется порядок по-умолчанию
		// по умолчанию - это так, как прислал сервер.
		dispatch(performFiltration());
	};

	const prodCatData = useAppSelector((state) => state.SearchPageReducer.prodCatFilter.categories);
	const prodCatFilter = SelectCrafter(prodCatData, selectCategory);

	return (
		<div className="filter__select-wrapper">
			<legend>Категория товаров</legend>
			{prodCatFilter}
		</div>
	);
};
