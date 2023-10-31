import React, { useState } from "react";

import { setProductCard } from "../../SearchPageReducer";
import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { formatPublishDate, addThinSpacesToNumber, translateChars } from "./utils";
import { BtnFavProdCard } from "./BtnAddToFav";

function GalleryItem({ photo, index, gai, setGai }) {
	// gai - это galleryActiveItem, переменная состояния в ProductCardPopup
	const classes = gai === index ? "gallery__item gallery__item--active" : "gallery__item";
	const changeGai = () => {
		setGai(index);
	};
	return (
		<li className={classes} onClick={changeGai}>
			<img src={photo} alt={"Фото №" + index} width="124" height="80" />
		</li>
	);
}

function Characteristics({ cardData }) {
	// фильтры в БД приходят в виде объекта, удобней обработать в виде массива
	const filtersArr = Object.entries(cardData["filters"]);

	const characteristics = filtersArr.map((filter, index) => {
		// Если значение фильтра пустое или прочерк, то нам не нужно отрисовывать его
		if (filter[1] === "" || filter[1] === "-") return;

		// Если значение есть, то переводим его и отрисовываем
		let header = translateChars(cardData["category"], "header", filter);
		let value = translateChars(cardData["category"], "value", filter);
		return (
			<li className="chars__item" key={"chars_key_" + index}>
				<div className="chars__name">{header}</div>
				<div className="chars__value">{value}</div>
			</li>
		);
	});
	return characteristics;
}

// Меняет классы для рейтинга продавца в зависимости от этого рейтинга
function sellerClasses(rating) {
	let classes = "popup__seller seller";
	if (rating >= 4.8) {
		classes += " seller--good";
		return classes;
	} else if (rating >= 4 && rating < 4.8) {
		return classes;
	} else if (rating < 4) {
		classes += " seller--bad";
		return classes;
	}
}

export const ProductCardPopup = () => {
	const [galleryActiveItem, setGalleryActiveItem] = useState<number>(0);
	const cardData = useAppSelector((state) => state.SearchPageReducer.productCard.data);
	const dispatch = useAppDispatch();

	// Закрывает продуктовую карточку (попап)
	// либо при нажатии на тёмный фон (первый "иф"), либо при нажатии на крестик (второй "иф")
	const closeProductCard = (e) => {
		if (
			e.target.firstElementChild &&
			e.target.firstElementChild.classList.value === "popup__inner"
		) {
			dispatch(setProductCard({ isVisible: false, data: {} }));
		} else if (e.target.closest(".popup__close")) {
			dispatch(setProductCard({ isVisible: false, data: {} }));
		}
	};
	const fullAddress =
		cardData["address"]["city"] +
		", " +
		cardData["address"]["street"] +
		", " +
		cardData["address"]["building"];

	return (
		<section className="popup" onClick={(e) => closeProductCard(e)}>
			<div className="popup__inner">
				<button
					onClick={(e) => closeProductCard(e)}
					className="popup__close"
					type="button"
					aria-label="Закрыть"
				>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"
						/>
					</svg>
				</button>
				<div className="popup__date">{formatPublishDate(cardData["publish-date"])}</div>
				<h3 className="popup__title">{cardData["name"]}</h3>
				<div className="popup__price">{addThinSpacesToNumber(cardData["price"])} ₽</div>
				<div className="popup__columns">
					<div className="popup__left">
						<div className="popup__gallery gallery">
							<BtnFavProdCard />
							<div className="gallery__main-pic">
								<img
									src={cardData["photos"][galleryActiveItem]}
									srcSet="img/car-big-2x.jpg 2x"
									width="520"
									height="340"
									alt="Ford Mustang 2020"
								/>
							</div>
							<ul className="gallery__list">
								{cardData["photos"].map((photo, index) => {
									return (
										<GalleryItem
											key={"galleryItem_key_" + index}
											photo={photo}
											index={index}
											gai={galleryActiveItem}
											setGai={setGalleryActiveItem}
										/>
									);
								})}
							</ul>
						</div>
						<ul className="popup__chars chars">
							<Characteristics cardData={cardData} />
						</ul>
						<div className={sellerClasses(cardData["seller"]["rating"])}>
							<h3>Продавец</h3>
							<div className="seller__inner">
								<a className="seller__name" href="/#">
									{cardData["seller"]["fullname"]}
								</a>
								<div className="seller__rating">
									<span>{cardData["seller"]["rating"]}</span>
								</div>
							</div>
						</div>
						<div className="popup__description">
							<h3>Описание товара</h3>
							<p>{cardData["description"]}</p>
						</div>
					</div>
					<div className="popup__right">
						<div className="popup__map">
							<img src="img/map.jpg" width="268" height="180" alt={fullAddress} />
						</div>
						<div className="popup__address">{fullAddress}</div>
					</div>
				</div>
			</div>
		</section>
	);
};