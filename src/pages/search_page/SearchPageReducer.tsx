import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";

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
		}
		catch (error) {
			throw error
		}
	}
);

const SearchPageSlice = createSlice({
	name: 'SearchPageSlice',
	initialState: {
		page: {
			isLoading: true,
			error: false
		},	
		productsData: null,
		filteredProductsData: null,
	},
	reducers: {
		setFilteredProductsData(state, action) {
			state.filteredProductsData = action.payload;
			console.log('state.filteredProductsData', state.filteredProductsData);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsData = action.payload.products;
			state.page.isLoading = false;
			state.page.error = false;
			console.log(state.productsData);
		});
		builder.addCase(initializePage.rejected, (state, action) => {
			state.page.error = true;
			console.log('initializePage.rejected error');
			// state.error = action.error.message; здесь можно получить доступ к сообщению об ошибке
		});
		// [initializePage.error]: (state) => {
		// 	state.page.error = true;
		// 	console.log('error');
		// },
		// [initializePage.fulfilled]: (state, action) => {
		// 	state.productsData = action.payload;
		// 	state.page.isLoading = false;
		// 	state.page.error = false;
		// },
	}
})

export const SearchPageReducer = SearchPageSlice.reducer;
export const {setFilteredProductsData} = SearchPageSlice.actions;