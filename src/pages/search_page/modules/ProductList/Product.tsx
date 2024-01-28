import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { addToFav, removeFromFav, setProductCard } from "@search_page/SearchPageReducer";
import { BtnFavList } from "./BtnAddToFav";
import { addThinSpacesToNumber } from "@src/utils/prices";
import { formatPublishDate } from "@src/utils/date";

/**
	Этот компонент отвечает за показ лист-айтема <li></li>, одного продукта в списке продуктов
	Используется в компоненте _ProductList.tsx
*/

export const Product = ({ item }) => {
	const dispatch = useAppDispatch();
	// Локальные для каждого продукта состояния
	// Видна ли подсказка, какая колонка активна, какая ссылка на изображение
	const [hintIsVisible, setHintIsVisible] = useState<boolean>(false);
	const [activeColumn, setActiveColumn] = useState<number>(0);
	const [imgLink, setImgLink] = useState<string>(item.photos[0]);
	// Кнопка "избранные"
	const favProducts = useAppSelector((state) => state.SearchPageReducer.favProducts);
	const isInFavorites = Boolean(favProducts.find((product) => product["id"] === item["id"]));
	const toggleFavBtn = () => {
		isInFavorites === false ? dispatch(addToFav(item)) : dispatch(removeFromFav(item));
	};

	const changeColumnByMouse = (e, imgPath) => {
		const index = Number(e.target.dataset.index);
		setActiveColumn(index);
		setImgLink(imgPath);
		// Для пятой колонки показывается инфо-подсказка "+n фото"
		// Если колонка не пятая, то подсказка скрывается.
		// Благодаря тому, что управление подсказкой завязано на колонку, подсказка не скрывается, если пользователь уведёт мышь с объявления
		index === 4 ? setHintIsVisible(true) : setHintIsVisible(false);
	};

	const changeColumnBySwipe = (eventData) => {
		// В зависимости от направления свайпа определяем номер следующей колонки
		// сразу же расставляются границы: нельзя свайпнуть на колонку с индексом меньше нуля и больше четырёх
		let nextActiveColumn;
		switch (eventData.dir) {
			case "Right":
				activeColumn - 1 < 0 ? (nextActiveColumn = 0) : (nextActiveColumn = activeColumn - 1);
				break;
			case "Left":
				activeColumn + 1 > 4 ? (nextActiveColumn = 4) : (nextActiveColumn = activeColumn + 1);
				break;
		}
		// Обновляем состояние и показ подсказки только если мы не пытались выйти за границы 0 и 4.
		if (activeColumn !== nextActiveColumn) {
			setActiveColumn(nextActiveColumn);
			setImgLink(item.photos[nextActiveColumn]);
			nextActiveColumn === 4 ? setHintIsVisible(true) : setHintIsVisible(false);
		}
	};
	// Видимость полноэкранной карточки товара
	const showProductCard = () => {
		dispatch(setProductCard({ isVisible: true, data: item }));
	};

	// Подсчёт общего количества фото в массиве "photos" у каждого продукта в БД
	const photosAmount = item.photos.length;
	let morePhotos = photosAmount > 5 ? photosAmount - 5 : null;

	const swipeHandlers = useSwipeable({
		onSwipedLeft: (eventData) => changeColumnBySwipe(eventData),
		onSwipedRight: (eventData) => changeColumnBySwipe(eventData),
	});

	// ! Конструктор навигационных колонок для каждого фото.
	// Количество колонок с подсвечивающимися плитками - не больше пяти;
	// На пятой колонке (индекс = 4) показывается инфо-подсказка "+n фото"
	// imgPath - это каждое по очереди значение из item.photos в базе данных
	const photoNav = item.photos.map((imgPath, index) => {
		let className;
		activeColumn === index
			? (className = "product__navigation-column product__navigation-column--active")
			: (className = "product__navigation-column");

		// Условия в зависимости от количества фото в объявлении в базе данных
		// Нам нужно не более пяти плиток (колонок) на изображении
		if (photosAmount > 5 && index <= 4) {
			return (
				<React.Fragment key={item.name + "_photo_" + index + "_fifth-column"}>
					<div
						onMouseEnter={(e) => changeColumnByMouse(e, imgPath)}
						className={className + " product__navigation-column--fifth"}
						data-index={index}
					>
						<span></span>
					</div>
					{hintIsVisible && (
						<div className="product__image-more-photo-text">
							+{morePhotos} фото
							<div className="product__image-more-photo-bg"></div>
						</div>
					)}
				</React.Fragment>
			);
		} else if (photosAmount >= 0 && photosAmount <= 5) {
			return (
				<div
					key={item.name + "_photo_" + index}
					onMouseEnter={(e) => changeColumnByMouse(e, imgPath)}
					className={className}
					data-index={index}
				>
					<span></span>
				</div>
			);
		}
	});

	return (
		<li className="product" key={item.name + "_key"}>
			<div className="product__image" onClick={showProductCard}>
				<BtnFavList favBtnActive={isInFavorites} toggleFavBtn={toggleFavBtn} />
				<img src={imgLink} alt={item.name} />
				<div className="product__image-navigation" {...swipeHandlers}>
					{photoNav}
				</div>
			</div>

			<div className="product__content">
				<h3 className="product__title-link" onClick={showProductCard}>
					{item.name}
				</h3>
				<div className="product__price">{addThinSpacesToNumber(item.price)} ₽</div>
				<div className="product__address">{item.address.city + ", " + item.address.street}</div>
				<div className="product__date">{formatPublishDate(item["publish-date"])}</div>
			</div>
		</li>
	);
};
