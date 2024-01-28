import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CookieConsent from "react-cookie-consent";

import { useAppSelector } from "@src/hook";
import { initializePage } from "./SearchPageReducer";

import { XS_controls } from "./modules/XS_controls";
import { M_controls } from "./modules/M_controls";
import { ProductList } from "@sp_modules/ProductList/_ProductList";
import { ProductCardPopup } from "@sp_modules/ProductList/ProductCardPopup/ProductCardPopup";

import { Spinner } from "@sp_modules/Spinner/Spinner";
import { Hint } from "./modules/Hint/Hint";

/**
	Это главный компонент поисковой страницы, из него состоят всё это приложение
	Разделён на два больших подкомпонента: SearchPage и PageContent
	* Компонент SearchPage производит инициализацию загрузки данных по товарам с сервера
	и решает, что показать: загрузочный спиннер, заглушку при ошибке или основной контент.
	SearchPage экспортируется и используется в App.tsx
	* Компонент PageContent это и есть основной контент страницы.
*/

const PageContent = () => {
	const prodCardIsVis = useAppSelector((state) => state.SearchPageReducer.productCard.isVisible);

	// Если страница ещё загружается - то основной контент показан не будет
	const pageIsLoading = useSelector((state) => state.SearchPageReducer.page.isLoading);
	if (pageIsLoading) {
		return null;
	}

	return (
		<>
			<div className="searchpage__topline"></div>
			{/* <Hint /> */}
			<section className="breakpoints searchpage">
				<h1 className="visually-hidden">Главная</h1>
				<div className="searchpage__container">
					<XS_controls/>
					<M_controls/>
					<ProductList />
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
		</>
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
