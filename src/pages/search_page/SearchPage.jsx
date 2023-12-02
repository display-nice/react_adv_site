import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAppSelector, useAppDispatch } from "@src/hook";
// import { initializePage } from "@search_page/SearchPageReducer";
import { initializePage } from "./SearchPageReducer";
import CookieConsent from "react-cookie-consent";

import { Filters } from "@sp_modules/Filters/_Filters";

import { Favorites } from "@sp_modules/Favorites";
import { Sort } from "@sp_modules/Sort";
import { ProductList } from "@sp_modules/ProductList/ProductList";
import { ProductCardPopup } from "@sp_modules/ProductList/ProductCardPopup/ProductCardPopup";
import { Spinner } from "@sp_modules/Spinner/Spinner";

const PageContent = () => {
	const prodCardIsVis = useAppSelector((state) => state.SearchPageReducer.productCard.isVisible);

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
						<div className="results__sorting sorting">
							<form className="sorting__form">
								<Sort />
								<Favorites />
							</form>
						</div>
					</div>
					<ProductList />
				</section>
			</div>
			{/* Управление видимостью <ProductCardPopup/> */}
			{prodCardIsVis && <ProductCardPopup />}
			<CookieConsent
				buttonText="Понятно"
				containerClasses="CC_style"
				contentClasses="CC_contentClasses"
				buttonClasses="CC_buttonStyle"				
			>
				Избранные сохраняются в cookies
			</CookieConsent>
		</section>
	);
};

export const SearchPage = () => {
	const page = useSelector((state) => state.SearchPageReducer.page);
	const dispatch = useDispatch();

	// 1. Инициализация всей страницы
	// Получение с сервера данных по продуктам
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
	return <>{content}</>;
};
