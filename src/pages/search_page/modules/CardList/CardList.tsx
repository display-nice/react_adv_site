import React from "react";
import { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { BtnFavCardList } from "./BtnAddToFav";
import { addThinSpacesToNumber, formatPublishDate } from "./utils";
import { setProductCard } from "../../SearchPageReducer";

const Product = ({ item }) => {
	const dispatch = useAppDispatch();
	// Локальные для каждого продукта состояния
	// Видна ли подсказка, какая колонка активна, какая ссылка на изображение
	const [hintIsVisible, setHintIsVisible] = useState<boolean>(false);
	const [activeColumn, setActiveColumn] = useState<boolean | number>(false);
	const [imgLink, setImgLink] = useState<string>(item.photos[0]);

	const activateColumn = (e, image) => {
		const index = Number(e.target.dataset.index);
		setActiveColumn(index);
		setImgLink(image);
		// Для пятой колонки нужно показать инфо-подсказку "+n фото"
		if (index === 4) setHintIsVisible(true);
	};
	const deactivateColumn = (e) => {
		const index = Number(e.target.dataset.index);
		setActiveColumn(false);
		// Для пятой колонки нужно скрыть инфо-подсказку "+n фото"
		if (index === 4) setHintIsVisible(false);
	};

	const changeProductCard = () => {
		dispatch( setProductCard({isVisible: true, data: item}) )
	}

	// Подсчёт общего количества фото в массиве "photos" у каждого продукта в БД
	const photosAmount = item.photos.length;
	let morePhotos = photosAmount > 5 ? photosAmount - 5 : null;

	// Конструктор навигационных колонок для каждого фото.
	// Количество колонок с подсвечивающимися плитками - не больше пяти;
	// На пятой колонке (индекс = 4) показывается инфо-подсказка "+n фото"
	const photoNav = item.photos.map((image, index) => {

		// Обработчики событий и классы присваиваются в зависимости от условий
		let mouseEnterHandler;
		let mouseLeaveHandler;
		let className;

		// Подсвечиваем активную плитку.
		activeColumn === index
			? (className = "product__navigation-column product__navigation-column--active")
			: (className = "product__navigation-column");
		
		// Условия в зависимости от количества фото в объявлении в базе данных
		if (photosAmount > 5) {
			// Нам нужно не более пяти плиток (колонок) на изображении
			// Если мы сейчас на пятой и далее, то ничего не возвращаем
			switch (index) {
				case 0:
				case 1:
				case 2:
				case 3:
					mouseEnterHandler = (e) => activateColumn(e, image);
					mouseLeaveHandler = (e) => deactivateColumn(e);
					break;
				case 4:
					return (
						<React.Fragment key={item.name + "_photo_" + index + "_fifth-column"}>
							<div
								onMouseEnter={(e) => activateColumn(e, image)}
								onMouseLeave={(e) => deactivateColumn(e)}
								className={className + " product__navigation-column--fifth"}
								data-index={index}
							>
								<span></span>
							</div>
							{hintIsVisible && <div className="product__image-more-photo">+{morePhotos} фото</div>}
						</React.Fragment>
					);
				default:
					return;
				// Ничего не делать для всех других случаев (index > 4)
			}
		}
		// Нам нужно не более пяти плиток (колонок) на изображении
		else if (photosAmount >= 0 && photosAmount <= 5) {
			mouseEnterHandler = (e) => {
				activateColumn(e, image);
			};
			mouseLeaveHandler = (e) => {
				deactivateColumn(e);
			};
		}
		return (
			<div
				key={item.name + "_photo_" + index}
				onMouseEnter={mouseEnterHandler}
				onMouseLeave={mouseLeaveHandler}
				className={className}
				data-index={index}
			>
				<span></span>
			</div>
		);
	});

	return (
		<li className="results__item product" key={item.name + "_key"}>
			<BtnFavCardList />
			
			<div className="product__image" onClick={changeProductCard}>
				<img src={imgLink} width="318" height="220" alt={item.name} />
				<div className="product__image-navigation">{photoNav}</div>
			</div>
			<div className="product__content">
				<h3 className="product__title" onClick={changeProductCard}>
					<a href="/#">{item.name}</a>
				</h3>
				<div className="product__price">{addThinSpacesToNumber(item.price)} ₽</div>
				<div className="product__address">{item.address.city + ", " + item.address.street}</div>
				<div className="product__date">{formatPublishDate(item["publish-date"])}</div>
			</div>
		</li>
	);
};

export const CardList = () => {
	// Инициализация.
	// Если ещё не нажимали кнопку "показать" (то есть если нет фильтрованных данных по продуктам),
	// то показываем все продукты, пришедшие с сервера, в том порядке, в котором они пришли.
	// при этом для состояния по-умолчанию показываем только 7 продуктов (такое ТЗ)
	const dispatch = useAppDispatch();
	const page = useAppSelector((state) => state.SearchPageReducer.page);
	const filteredProductsData = useAppSelector(
		(state) => state.SearchPageReducer.filteredProductsData
	);
	const firstLaunchProdData = useAppSelector(state => state.SearchPageReducer.firstLaunchProdData)
	
	let products = []; // массив объектов
	// Для состояния по-умолчанию нам нужны только первые 7 продуктов (такое ТЗ)
	// они устанавливаются в extraReducers в SearchPageReducer при инициализации приложения
	if (!filteredProductsData && !page.isLoading && !page.error) {
		products = firstLaunchProdData;
	}

	// Если пользователь уже нажимал кнопку "Показать", то показываем все найденные продукты
	if (filteredProductsData) products = filteredProductsData;	

	return (
		<ul className="results__list">
			{products.map((item, index) => {
				return <Product key={item.name + "_product_key_" + index} item={item} />;
			})}
		</ul>
	);
};