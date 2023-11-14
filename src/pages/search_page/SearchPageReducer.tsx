import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";
import { useAppSelector } from "@src/hook";
import { getCheckedFilters } from "./modules/Filters/FiltersReducer";
import { getActiveCategory } from "./modules/Filters/FiltersReducer";
import { performSorting, findMinMaxPrices } from "./SearchPageUtils";

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



// productsData и filteredProductsData - массив объектов
const SearchPageSlice = createSlice({
	name: "SearchPageSlice",
	initialState: {
		page: {
			isLoading: true,
			error: false,
		},
		productsData: null,
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
		sortBy: 'popular' , // popular, cheap, new
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
		sort(state, action) {
			// Устанавливаем состояние нажатой кнопки
			state.sortBy = action.payload;
			// В зависимости от типа нажатой кнопки запускаем нужный фильтр
			state.filteredProductsData = performSorting(state)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsData = action.payload.products;
			state.filteredProductsData = action.payload.products;
			state.page.isLoading = false;
			state.page.error = false;			

			// Поиск и установка минимального и максимального значений цен
			// в выводимых на экран продуктах при инициализации приложения
			const minMaxPrices = findMinMaxPrices(state.filteredProductsData)
			state.priceFilter.minBorder = minMaxPrices[0];
			state.priceFilter.maxBorder = minMaxPrices[1];
			state.priceFilter.selectedPrices = minMaxPrices;
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
	sort,
} = SearchPageSlice.actions;
