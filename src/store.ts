import { configureStore } from "@reduxjs/toolkit";

import { SearchPageReducer } from "./pages/search_page/SearchPageReducer.tsx";
import { FiltersReducer } from "./pages/search_page/modules/Filters/FiltersReducer.ts"

// Для создания стора нужно обязательно предварительно провести combinereducers
// Либо использовать запись ниже, передав в configureStore объект с одним редьюсером
// потому что конфигстор умеет комбайнить редьюсеры именно в такой записи
export const store = configureStore({
	reducer: {
		SearchPageReducer,
		FiltersReducer
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;