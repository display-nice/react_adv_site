import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";
import { filter, sort } from "@helpers/filterAndSort";
import { findMinMaxPrices } from "@src/utils/prices";
import { getCookie, addToCookie, removeFromCookie } from "@src/utils/cookies";

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
		addToFav(state, action) {
			state.favProducts.push(action.payload);
			addToCookie('favorites', action.payload["id"])
		},
		removeFromFav(state, action) {
			const i = state.favProducts.findIndex(
				(favProduct) => favProduct["id"] === action.payload["id"]
			);
			state.favProducts.splice(i, 1);
			removeFromCookie('favorites', action.payload["id"])
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsServer = action.payload.products;
			state.productsOnCtg = action.payload.products;
			state.displayedProducts = action.payload.products;

			// Работа с кукисами при инициализации приложения
			// Проверяем, существует ли кука с именем "favorites"
			const cookiedFavorites = getCookie('favorites');
			console.log('cookiedFavorites', cookiedFavorites);
			if (cookiedFavorites) {
				// Кука существует, берём из неё айдишники и по ним ищем продукты
				// ставим их в стейт для отрисовки
				action.payload.products.map(product => {
					if (cookiedFavorites.includes(product["id"])) {
						state.favProducts.push(product)
					}
				})
			} else {
				// Кука не существует, устанавливаем новую (пустой массив с датой действия сегодня + 1 день)
				const favorites = [];
				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 1);
				const favoritesString = JSON.stringify(favorites);
				document.cookie = `favorites=${encodeURIComponent(
					favoritesString
				)}; expires=${expirationDate.toUTCString()}; path=/`;				
			}

			// Поиск и установка минимального и максимального значений цен
			// в выводимых на экран продуктах при инициализации приложения
			const minMaxPrices = findMinMaxPrices(state.displayedProducts);
			state.priceFilter.minBorder = minMaxPrices[0];
			state.priceFilter.maxBorder = minMaxPrices[1];
			state.priceFilter.selectedPrices = minMaxPrices;

			state.page.isLoading = false;
			state.page.error = false;
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
