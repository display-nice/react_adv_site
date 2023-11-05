import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";
import { useAppDispatch } from "@src/hook";


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
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsData = action.payload.products;
			state.page.isLoading = false;
			state.page.error = false;

			// Для состояния по-умолчанию нам нужны только первые 7 продуктов (такое ТЗ)
			let products = []; // массив объектов
			for(let i = 0; i < 7; ++i) {
				products.push(action.payload.products[i])
			}
			state.firstLaunchProdData = products;

			// Поиск и установка минимального и максимального значений цен 
			// в выводимых на экран продуктах при инициализации приложения (первые 7)
			let prodPrices = products.map((product) => product["price"]);
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
export const { setFilteredProductsData, setProductCard, setChosenPrices, setPriceBorders } = SearchPageSlice.actions;
