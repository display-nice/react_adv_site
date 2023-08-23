import { configureStore } from "@reduxjs/toolkit";

import { SP_Reducer } from "@search_page/SearchPageReducer.js";
import { Filters_Reducer } from "@sp_modules/Filters/FiltersReducer.tsx";

// Для создания стора нужно обязательно предварительно провести combinereducers
// Либо использовать запись ниже, передав в configureStore объект с одним редьюсером
// потому что конфигстор умеет комбайнить редьюсеры именно в такой записи
export const store = configureStore({
	reducer: {
		SP_Reducer,
		Filters_Reducer
	}
})

