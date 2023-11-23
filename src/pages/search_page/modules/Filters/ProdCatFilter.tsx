import { setActiveCategory } from "./_FiltersReducer";
import { useAppSelector, useAppDispatch } from "@src/hook";
import { SelectCrafter } from "@src/utils/html_elems_craft";
import { findMinMaxPrices} from "@utils/prices";
import { setPriceBorders, setChosenPrices, setProductsOnCtg, setDisplayedProducts, setSortType } from "../../SearchPageReducer";


export const ProdCatFilter = () => {
	const dispatch = useAppDispatch();
	const productsServer = useAppSelector((state) => state.SearchPageReducer.productsServer);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);
	// Используется в ProdCatFilter при выборе категории (option в select'е)
	// Фильтрация по выбранной пользователем категории (по нажатому селекту)
	const selectCategory = (e) => {
		const pressedCtgBtn = e.target.value;
		let productsOnCtg;
		if (pressedCtgBtn === "Все") {
			productsOnCtg = productsServer;
		} else {
			productsOnCtg = productsServer.filter((product) => product["category"] === pressedCtgBtn);
		}

		// Поиск минимального и максимального значений цен в выводимых на экран продуктах
		// и дальнейшая их установка в стейт (т.е. идёт подготовка цен)
		let minMaxPrices = findMinMaxPrices(productsOnCtg);
		dispatch(setPriceBorders([minMaxPrices[0], minMaxPrices[1]]));
		dispatch(setChosenPrices([minMaxPrices[0], minMaxPrices[1]]));

		// Запись в стейт активной категории и продуктов по категории
		// Продукты по категории дальше используются для фильтрации по кнопке "Показать"
		dispatch(setActiveCategory(pressedCtgBtn));
		dispatch(setProductsOnCtg(productsOnCtg));

		// При фильтровании по категории используется порядок по-умолчанию
		// по умолчанию - это так, как прислал сервер.
		dispatch(setDisplayedProducts(productsOnCtg));
		// dispatch(setDefaultSort());
		dispatch(setSortType("popular"));
	};	

	const prodCatData = useAppSelector((state) => state.FiltersReducer.prodCatFilter.categories);
	const prodCatFilter = SelectCrafter(prodCatData, selectCategory);

	return (
		<div className="filter__select-wrapper">
			<legend>Категория товаров</legend>
			{prodCatFilter}
		</div>
	);
};
