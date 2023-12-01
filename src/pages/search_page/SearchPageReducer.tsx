import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";
import { filter, sort } from "@helpers/filterAndSort";
import { findMinMaxPrices } from "@src/utils/prices";

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

// productsServer и displayedProducts - массив объектов
const SearchPageSlice = createSlice({
	name: "SearchPageSlice",
	initialState: {
		page: {
			isLoading: true,
			error: false,
		},
		productsServer: null,
		productsOnCtg: null,
		displayedProducts: null,
		priceFilter: {
			minBorder: 1,
			maxBorder: 100,
			selectedPrices: [1, 100],
		},
		productCard: {
			isVisible: false,
			data: {},
		},
		sortBy: "popular", // Возможные значения: "popular", "cheap", "new"
		favIsActive: false,
		favProducts: [],
	},
	reducers: {
		setProductsOnCtg(state, action) {
			state.productsOnCtg = action.payload;
		},
		setDisplayedProducts(state, action) {
			state.displayedProducts = action.payload;
			console.log("state.displayedProducts", state.displayedProducts);
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
		performFiltration(state, action) {
			const checkedFilters = action.payload;
			state.displayedProducts = filter(state, checkedFilters);
		},
		performSorting(state, action) {
			const checkedFilters = action.payload;
			state.displayedProducts = sort(state, checkedFilters);
		},
		setSortType(state, action) {
			state.sortBy = action.payload;
		},
		toggleFavIsActive(state) {
			state.favIsActive = !state.favIsActive;
			console.log(state.favIsActive);
		},
		// setFavProducts(state, action) {
		// 	switch (action.payload.action) {
		// 		case "add":
		// 			console.log("setFavProducts, ADD");
		// 			state.favProducts.push(action.payload.product);
		// 			console.log("state.favProducts = ", [...state.favProducts]);
		// 			break;
		// 		case "remove":
		// 			console.log("setFavProducts, REMOVE");
		// 			state.favProducts.splice(action.payload.i, 1);
		// 			break;
		// 	}
		// },
		addToFav(state, action) {
			console.log("старт работы addToFav");
			state.favProducts.push(action.payload);
			console.log("state.favProducts = ", [...state.favProducts]);
		},
		removeFromFav(state, action) {
			console.log("старт работы removeFromFav");
			const i = state.favProducts.findIndex(
				(favProduct) => favProduct["id"] === action.payload["id"]
			);
			state.favProducts.splice(i, 1);
			console.log("state.favProducts = ", [...state.favProducts]);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsServer = action.payload.products;
			state.productsOnCtg = action.payload.products;
			state.displayedProducts = action.payload.products;
			state.page.isLoading = false;
			state.page.error = false;

			// Поиск и установка минимального и максимального значений цен
			// в выводимых на экран продуктах при инициализации приложения
			const minMaxPrices = findMinMaxPrices(state.displayedProducts);
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
	setDisplayedProducts,
	setProductCard,
	setChosenPrices,
	setPriceBorders,
	performFiltration,
	performSorting,
	setSortType,
	toggleFavIsActive,
	// setFavProducts,
	addToFav,
	removeFromFav,
} = SearchPageSlice.actions;
