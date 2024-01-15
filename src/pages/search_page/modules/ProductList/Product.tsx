import React from "react";
import { useState } from "react";

import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { addToFav, removeFromFav, setProductCard } from "@search_page/SearchPageReducer";
import { BtnFavList } from "./BtnAddToFav";
import { addThinSpacesToNumber } from "@src/utils/prices";
import { formatPublishDate } from "@src/utils/date";
import { imgPathChanger } from "@src/utils/imgPathChanger";

/**
	Этот компонент отвечает за показ лист-айтема <li></li>, одного продукта в списке продуктов
	Используется в компоненте _ProductList.tsx
*/

export const Product = ({ item }) => {
	const dispatch = useAppDispatch();
	// Локальные для каждого продукта состояния
	// Видна ли подсказка, какая колонка активна, какая ссылка на изображение
	const [hintIsVisible, setHintIsVisible] = useState<boolean>(false);
	const [activeColumn, setActiveColumn] = useState<boolean | number>(false);
	const [imgLink, setImgLink] = useState<string>(imgPathChanger(item.photos[0], "320px", "jpg"));
	// const imgLink = '/visuals/img/products_images_local/520px/apt_1_1.jpg'
	// Кнопка "избранные"
	const favProducts = useAppSelector((state) => state.SearchPageReducer.favProducts);
	const isInFavorites = Boolean(favProducts.find((product) => product["id"] === item["id"]));
	const toggleFavBtn = () => {
		isInFavorites === false ? dispatch(addToFav(item)) : dispatch(removeFromFav(item));
	};

	const activateColumn = (e, imgPath) => {
		const index = Number(e.target.dataset.index);
		setActiveColumn(index);
		const newPath = imgPathChanger(imgPath, "320px", "jpg");
		setImgLink(newPath);
		// Для пятой колонки показывается инфо-подсказка "+n фото"
		if (index === 4) setHintIsVisible(true);
	};
	const deactivateColumn = (e) => {
		const index = Number(e.target.dataset.index);
		setActiveColumn(false);
		// Для пятой колонки нужно скрывается инфо-подсказка "+n фото"
		if (index === 4) setHintIsVisible(false);
	};

	// Видимость полноэкранной карточки товара
	const showProductCard = () => {
		dispatch(setProductCard({ isVisible: true, data: item }));
	};

	// Подсчёт общего количества фото в массиве "photos" у каждого продукта в БД
	const photosAmount = item.photos.length;
	let morePhotos = photosAmount > 5 ? photosAmount - 5 : null;

	// Конструктор навигационных колонок для каждого фото.
	// Количество колонок с подсвечивающимися плитками - не больше пяти;
	// На пятой колонке (индекс = 4) показывается инфо-подсказка "+n фото"
	const photoNav = item.photos.map((imgPath, index) => {
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
					mouseEnterHandler = (e) => activateColumn(e, imgPath);
					mouseLeaveHandler = (e) => deactivateColumn(e);
					break;
				case 4:
					return (
						<React.Fragment key={item.name + "_photo_" + index + "_fifth-column"}>
							<div
								onMouseEnter={(e) => activateColumn(e, imgPath)}
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
				activateColumn(e, imgPath);
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
		<li className="product" key={item.name + "_key"}>
			
			<div className="product__image" onClick={showProductCard}>
				<BtnFavList favBtnActive={isInFavorites} toggleFavBtn={toggleFavBtn} />
				<img src={imgLink} alt={item.name} />
				<div className="product__image-navigation">{photoNav}</div>
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
