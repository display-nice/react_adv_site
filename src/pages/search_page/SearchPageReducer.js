import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";

// Инициализация страницы: подгрузка данных о городах и точках доставки,
// установка их в стейт через extraReducers. Вызывается в компоненте SearchPage.jsx
// Использует асинх. запрос к серверу, вынесенный в отдельный файл SearchPageServices.js
export const initializePage = createAsyncThunk(
	"SearchPageReducer/initializePage",
	async function () {
		const SPServices = new SP_Services();
		let itemsData = await SPServices.loadItemsData();
		console.log(itemsData);
		// return itemsData;
	}
);

const SP_Slice = createSlice({
	name: 'SearchPageSlice',
	initialState: {
		page: {
			isLoading: true,
			error: false
		},	
		itemsData: null,
		
	},
	reducers: {
		
	},
	extraReducers: {
		[initializePage.error]: (state) => {
			state.page.error = true;
			console.log('error');
		},
		[initializePage.fulfilled]: (state, action) => {
			state.itemsData = action.payload;
			state.page.isLoading = false;
			state.page.error = false;
		},
	}

})

export const SP_Reducer = SP_Slice.reducer;
// export const {} = SP_Slice.actions;