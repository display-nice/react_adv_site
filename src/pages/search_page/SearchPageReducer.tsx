import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";
import { useAppSelector } from "@src/hook";
import { getCheckedFilters } from "./modules/Filters/FiltersReducer";
import { getActiveCategory } from "./modules/Filters/FiltersReducer";

// Инициализация страницы: подгрузка данных о городах и точках доставки,
// установка их в стейт через extraReducers. Вызывается в компоненте SearchPage.jsx
// Использует асинх. запрос к серверу, вынесенный в отдельный файл SearchPageServices.js
export const initializePage = createAsyncThunk(
	"SearchPageReducer/initializePage",
	async function () {
		try {
			const SPServices = new SP_Services();
			let productsData = await SPServices.loadItemsData();
			return productsData;
		} catch (error) {
			throw error;
		}
	}
);

// Варианты сортировки:
// Популярные.
// Порядок по умолчанию. Данные в том порядке, в котором они пришли с сервера.
export function showPopular(mode, productsData) {
	console.log("showPopular start");
	if (mode === 'initializePage') return productsData;
	if (mode === 'sortingBtn') {
		const categories = document.getElementById('prodCatFilter_categories') as HTMLSelectElement;
		const activeCtg = categories.value;
		if (activeCtg === 'Все') {
			return productsData
		} else {
			const singleCtgProducts = productsData.filter(
				(product) => product["category"] === activeCtg
			);		
			return singleCtgProducts
		}
	}
	if (mode === 'showBtn') {
		// Если нажата кнопка "Показать", то productsData - это уже фильтрованные продукты
		return productsData
	}
}
// Сначала дешёвые.
// Объявления, отсортированные по возрастанию цены от меньшей к большей.
// При этом учитываются цены из ценового фильтра (для всех категорий товаров кроме «Все»).
export function showCheap(filteredProductsData) {
	console.log("showCheap start");
	let cheapFirstArr = filteredProductsData.sort((a, b) => a.price - b.price);
	return cheapFirstArr;
}
// Новые.
// Сортировка по дате публикации объявления, от недавних к поздним.
export function showNew(filteredProductsData) {
	console.log("showNew ok");
	let newestFirstArr = filteredProductsData.sort(
		(a, b) => b["publish-date"] - a["publish-date"]
	);
	return newestFirstArr;
}

const SearchPageSlice = createSlice({
	name: "SearchPageSlice",
	initialState: {
		page: {
			isLoading: true,
			error: false,
		},
		productsData: null,
		firstLaunchProdData: null,
		filteredProductsData: null,
		priceFilter: {
			minBorder: 1,
			maxBorder: 100,
			selectedPrices: [1, 100],
		},
		productCard: {
			isVisible: false,
			data: {},
		},
		sort: {
			popular: true,
			cheap: false,
			new: false,
		},
	},
	reducers: {
		setFilteredProductsData(state, action) {
			state.filteredProductsData = action.payload;
			console.log("state.filteredProductsData", state.filteredProductsData);
		},
		setProductCard(state, action) {
			state.productCard.isVisible = action.payload.isVisible;
			state.productCard.data = action.payload.data;
		},
		setChosenPrices(state, action: PayloadAction<number[]>): void {
			state.priceFilter.selectedPrices = action.payload;
			// console.log(state.rangeFilter.selectedPrices)
		},
		setPriceBorders(state, action: PayloadAction<number[]>): void {
			state.priceFilter.minBorder = action.payload[0];
			state.priceFilter.maxBorder = action.payload[1];
			// console.log(state.rangeFilter.selectedPrices)
		},
		performSorting(state, action) {
			// Устанавливаем состояние нажатой кнопки
			for (let key in state.sort) {
				key === action.payload ? (state.sort[key] = true) : (state.sort[key] = false);
			}
			// В зависимости от типа нажатой кнопки запускаем нужный фильтр
			switch (action.payload) {
				case "popular":
					state.filteredProductsData = showPopular('sortingBtn', state.productsData);
					break;
				case "cheap":
					state.filteredProductsData = showCheap(state.filteredProductsData);
					break;
				case "new":
					state.filteredProductsData = showNew(state.filteredProductsData);
					break;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsData = action.payload.products;
			state.page.isLoading = false;
			state.page.error = false;

			// Для состояния по-умолчанию нам нужны только первые 7 продуктов (такое ТЗ)
			// let products = []; // массив объектов
			// for(let i = 0; i < 7; ++i) {
			// 	products.push(action.payload.products[i])
			// }
			state.filteredProductsData = showPopular('initializePage', state.productsData);

			// Поиск и установка минимального и максимального значений цен
			// в выводимых на экран продуктах при инициализации приложения (первые 7)
			let prodPrices = state.filteredProductsData.map((product) => product["price"]);
			const minPrice = Math.min.apply(null, prodPrices);
			const maxPrice = Math.max.apply(null, prodPrices);
			state.priceFilter.minBorder = minPrice;
			state.priceFilter.maxBorder = maxPrice;
			state.priceFilter.selectedPrices = [minPrice, maxPrice];
			// console.log("state.initialProductPrices = ", [minPrice, maxPrice]);
		});
		builder.addCase(initializePage.rejected, (state, action) => {
			state.page.error = true;
			console.log("initializePage.rejected error");
			// state.error = action.error.message; здесь можно получить доступ к сообщению об ошибке
		});
	},
});

export const SearchPageReducer = SearchPageSlice.reducer;
export const {
	setFilteredProductsData,
	setProductCard,
	setChosenPrices,
	setPriceBorders,
	performSorting,
} = SearchPageSlice.actions;
