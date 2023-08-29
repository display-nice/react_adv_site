import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { initializePage } from "@search_page/SearchPageReducer";
import { initializePage } from "./SearchPageReducer";

// import { Filters } from "@sp_modules/Filters/Filters.jsx";
import { Filters } from "./modules/Filters/_Filters";

import { Sorting } from "@sp_modules/Sorting/Sorting";
import { Results } from "@sp_modules/Results";
import { Popup } from "@sp_modules/Popup";
import { Spinner } from "@sp_modules/Spinner/Spinner";

const PageContent = () => {

	// Если страница ещё загружается - то основной контент показан не будет
	const pageIsLoading = useSelector((state) => state.SearchPageReducer.page.isLoading);
	if (pageIsLoading) {
		return null;
	}

	return (
		<section className="onlineshop-app">
			<h1 className="visually-hidden">Главная</h1>
			<div className="onlineshop-app__blueline"></div>
			<div className="onlineshop-app__wrapper">
				<section className="onlineshop-app__filter filter">
					<h2 className="title filter__title">Фильтр</h2>
					<Filters />
				</section>
				<section className="onlineshop-app__results results">
					<div className="results__head">
						<h2 className="title results__title">Результаты</h2>
						<Sorting />
					</div>
					<div className="results__info favourites hidden">
						<p className="favourites__empty-message">
							У вас пока нет избранных товаров. Чтобы отметить товар, кликните
							на сердечко в карточке объявления.
						</p>
						<p className="favourites__notion">
							Вы можете вернуться к списку всех товаров, кликнув ещё раз
							на&nbsp;«Показать избранные»
						</p>
					</div>
					<Results />
				</section>
				<Popup/>
			</div>
		</section>
	);
};

export const SearchPage = () => {
	const page = useSelector((state) => state.SearchPageReducer.page);
	const dispatch = useDispatch();

	// 1. Инициализация всей страницы
	// Получение с сервера данных по городам
	useEffect(() => {
		dispatch(initializePage());
	}, [dispatch]);

	// 2. Контент динамический и зависит от состояния: идёт ли инициализация, есть ли ошибка.
	// Если всё ок - можно показать основной контент
	let content;
	if (page.isLoading) content = <Spinner />;
	if (page.error)
		content = (
			<h1>
				Ошибка получения данных с сервера. 
				<br />
				Обновите страницу.
			</h1>
		);
	if (!page.isLoading && !page.error) content = <PageContent />;
	return <>{content}</>
};
