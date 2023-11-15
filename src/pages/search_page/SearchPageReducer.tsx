import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";
import { performSorting, findMinMaxPrices, performFiltration } from "./SearchPageUtils";

// Инициализация страницы: подгрузка данных о городах и точках доставки,
// установка их в стейт через extraReducers. Вызывается в компоненте SearchPage.jsx
// Использует асинх. запрос к серверу, вынесенный в отдельный файл SearchPageServices.js
export const initializePage = createAsyncThunk(
	"SearchPageReducer/initializePage",
	async function () {
		try {
			const SPServices = new SP_Services();
			let productsServer = await SPServices.loadItemsData();
			return productsServer;
		} catch (error) {
			throw error;
		}
	}
);

// productsServer и filteredProducts - массив объектов
const SearchPageSlice = createSlice({
	name: "SearchPageSlice",
	initialState: {
		page: {
			isLoading: true,
			error: false,
		},
		productsServer: null,
		productsOnCtg: null,
		filteredProducts: null,
		priceFilter: {
			minBorder: 1,
			maxBorder: 100,
			selectedPrices: [1, 100],
		},
		productCard: {
			isVisible: false,
			data: {},
		},
		sortBy: "popular", // popular, cheap, new
	},
	reducers: {
		setProductsOnCtg(state, action) {
			state.productsOnCtg = action.payload;
		},
		setFilteredProducts(state, action) {
			state.filteredProducts = action.payload;
			console.log("state.filteredProducts", state.filteredProducts);
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
			state.sortBy = action.payload.sortBy;
			const checkedFilters = action.payload.checkedFilters
			// В зависимости от типа нажатой кнопки запускаем нужный фильтр
			state.filteredProducts = performFiltration(state, checkedFilters);
			state.filteredProducts = performSorting(state, checkedFilters);
		},
		
		setDefaultSort(state) {
			state.sortBy = "popular";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsServer = action.payload.products;
			state.productsOnCtg = action.payload.products;
			state.filteredProducts = action.payload.products;
			state.page.isLoading = false;
			state.page.error = false;

			// Поиск и установка минимального и максимального значений цен
			// в выводимых на экран продуктах при инициализации приложения
			const minMaxPrices = findMinMaxPrices(state.filteredProducts);
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
	setProductsOnCtg,
	setFilteredProducts,
	setProductCard,
	setChosenPrices,
	setPriceBorders,
	sort,
	setDefaultSort,
} = SearchPageSlice.actions;
