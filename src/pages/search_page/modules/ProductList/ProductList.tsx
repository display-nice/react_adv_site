import React from "react";
import { useState } from "react";

import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { addToFav, removeFromFav } from "@search_page/SearchPageReducer";
import { BtnFavList, BtnFavCard } from "./BtnAddToFav";
import { addThinSpacesToNumber } from "@src/utils/prices";
import { formatPublishDate } from "@src/utils/date";
import { setProductCard } from "@search_page/SearchPageReducer";

const Product = ({ item }) => {
	const dispatch = useAppDispatch();
	const favProducts = useAppSelector(state => state.SearchPageReducer.favProducts)
	// Локальные для каждого продукта состояния
	// Видна ли подсказка, какая колонка активна, какая ссылка на изображение
	const [hintIsVisible, setHintIsVisible] = useState<boolean>(false);
	const [activeColumn, setActiveColumn] = useState<boolean | number>(false);
	const [imgLink, setImgLink] = useState<string>(item.photos[0]);
	
	//! избранные
	const isInFavorites = Boolean(favProducts.find((product) => product["id"] === item["id"]))
	const toggleFavBtn = () => {
		isInFavorites === false ? dispatch(addToFav(item)) : dispatch(removeFromFav(item))
	}

	/**
	 * Этот комментарий используется для документации кода
	 * 
 	*/
	// TODO: Сделать что-то важное

	const activateColumn = (e, image) => {
		const index = Number(e.target.dataset.index);
		setActiveColumn(index);
		setImgLink(image);
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
			<BtnFavList favBtnActive={isInFavorites} toggleFavBtn={toggleFavBtn}/>

			<div className="product__image" onClick={showProductCard}>
				<img src={imgLink} width="318" height="220" alt={item.name} />
				<div className="product__image-navigation">{photoNav}</div>
			</div>
			<div className="product__content">
				<h3 className="product__title" onClick={showProductCard}>
					<a href="/#">{item.name}</a>
				</h3>
				<div className="product__price">{addThinSpacesToNumber(item.price)} ₽</div>
				<div className="product__address">{item.address.city + ", " + item.address.street}</div>
				<div className="product__date">{formatPublishDate(item["publish-date"])}</div>
			</div>
		</li>
	);
};

export const ProductList = () => {
	// Инициализация.
	// Если ещё не нажимали кнопку "показать" (то есть если нет фильтрованных данных по продуктам),
	// то показываем все продукты, пришедшие с сервера, в том порядке, в котором они пришли.
	const displayedProducts = useAppSelector((state) => state.SearchPageReducer.displayedProducts);
	const favProducts = useAppSelector((state) => state.SearchPageReducer.favProducts);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	// Если кнопка "Избранные" активна, то показываем избранные
	// либо заглушку избранных, если кнопка активна, но избранных нет

	if (favIsActive) {
		// console.log("Избранные нажаты");
		if (favProducts && favProducts.length > 0) {
			// console.log("Выводим избранные на экран...");
			return (
				<ul className="results__list">
					{favProducts.map((item, index) => (
						<Product key={item.name + "_product_key_" + index} item={item} />
					))}
				</ul>
			);
		} else {
			// console.log("Но избранных продуктов нет");
			return (
				<div className="results__info favourites">
					<p className="favourites__empty-message">
						У вас пока нет избранных товаров. Чтобы отметить товар, кликните на сердечко в карточке
						объявления.
					</p>
					<p className="favourites__notion">
						Вы можете вернуться к списку всех товаров, кликнув ещё раз на&nbsp;«Показать избранные»
					</p>
				</div>
			);
		}
	} else {
		// console.log("Избранные отключены, пробуем вывести обычные продукты");
		// console.log("всего их штук:", displayedProducts.length);
		if (displayedProducts && displayedProducts.length > 0) {
			// console.log("Обычные найдены, отрисовываем...");
			return (
				<ul className="results__list">
					{displayedProducts.map((item, index) => (
						<Product key={item.name + "_product_key_" + index} item={item} />
					))}
				</ul>
			);
		} else {
			// console.log("обычных не найдено, показываем заглушку");
			return (
				<div className="results__list">
					<div className="results__info results__info--empty-block">
						<p className="results__empty-message">Мы не нашли товары по вашему запросу.</p>
						<p className="results__notion">
							Попробуйте поменять фильтры настройки объявлений в блоке слева
						</p>
					</div>
				</div>
			);
		}
	}
};