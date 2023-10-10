import React from "react";

const BtnAddToFav = () => {
	return (
		<button className="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
			<svg
				width="22"
				height="20"
				viewBox="0 0 22 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
					stroke="white"
					strokeWidth="2"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};

export const CardList = () => {
	const li = 1;
	return (
		<ul className="results__list">
			<li className="results__item product">
				<BtnAddToFav />
				<div className="product__image">
					<div className="product__image-more-photo hidden">+2 фото</div>
					<img
						src="img/item1.jpg"
						srcSet="http://192.168.0.2/react-adv-site/images_local/house_1_1.png"
						width="318"
						height="220"
						alt="Загородный дом с видом на озеро"
					/>
					<div className="product__image-navigation">
						<span className="product__navigation-item product__navigation-item--active"></span>
						<span className="product__navigation-item"></span>
						<span className="product__navigation-item"></span>
						<span className="product__navigation-item"></span>
						<span className="product__navigation-item"></span>
					</div>
				</div>
				<div className="product__content">
					<h3 className="product__title">
						<a href="/#">Загородный дом с видом на озеро</a>
					</h3>
					<div className="product__price">3 000 000 ₽</div>
					<div className="product__address">Приозёрск, улица Прибрежная</div>
					<div className="product__date">2 часа назад</div>
				</div>
			</li>
		</ul>
		// <ul className="results__list">
		// 	<li className="results__item product">
		// 		<button
		// 			className="product__favourite fav-add"
		// 			type="button"
		// 			aria-label="Добавить в избранное"
		// 		>
		// 			<svg
		// 				width="22"
		// 				height="20"
		// 				viewBox="0 0 22 20"
		// 				fill="none"
		// 				xmlns="http://www.w3.org/2000/svg"
		// 			>
		// 				<path
		// 					fillRule="evenodd"
		// 					clipRule="evenodd"
		// 					d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
		// 					stroke="white"
		// 					strokeWidth="2"
		// 					strokeLinejoin="round"
		// 				/>
		// 			</svg>
		// 		</button>
		// 		<div className="product__image">
		// 			<div className="product__image-more-photo hidden">+2 фото</div>
		// 			<img
		// 				src="img/item1.jpg"
		// 				srcSet="http://192.168.0.2/react-adv-site/images_local/house_1_1.png"
		// 				width="318"
		// 				height="220"
		// 				alt="Загородный дом с видом на озеро"
		// 			/>
		// 			<div className="product__image-navigation">
		// 				<span className="product__navigation-item product__navigation-item--active"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 			</div>
		// 		</div>
		// 		<div className="product__content">
		// 			<h3 className="product__title">
		// 				<a href="/#">Загородный дом с видом на озеро</a>
		// 			</h3>
		// 			<div className="product__price">3 000 000 ₽</div>
		// 			<div className="product__address">Приозёрск, улица Прибрежная</div>
		// 			<div className="product__date">2 часа назад</div>
		// 		</div>
		// 	</li>
		// 	<li className="results__item product">
		// 		<button
		// 			className="product__favourite fav-add"
		// 			type="button"
		// 			aria-label="Добавить в избранное"
		// 		>
		// 			<svg
		// 				width="22"
		// 				height="20"
		// 				viewBox="0 0 22 20"
		// 				fill="none"
		// 				xmlns="http://www.w3.org/2000/svg"
		// 			>
		// 				<path
		// 					fillRule="evenodd"
		// 					clipRule="evenodd"
		// 					d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
		// 					stroke="white"
		// 					strokeWidth="2"
		// 					strokeLinejoin="round"
		// 				/>
		// 			</svg>
		// 		</button>
		// 		<div className="product__image">
		// 			<div className="product__image-more-photo hidden">+2 фото</div>
		// 			<img
		// 				src="img/item2.jpg"
		// 				srcSet="img/item2-2x.jpg 2x"
		// 				width="318"
		// 				height="220"
		// 				alt="Ford Mustang 2020"
		// 			/>
		// 			<div className="product__image-navigation hidden">
		// 				<span className="product__navigation-item product__navigation-item--active"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 			</div>
		// 		</div>
		// 		<div className="product__content">
		// 			<h3 className="product__title">
		// 				<a href="/#">Ford Mustang 2020</a>
		// 			</h3>
		// 			<div className="product__price">2 950 000 ₽</div>
		// 			<div className="product__address">Москва, Нахимовский проспект</div>
		// 			<div className="product__date">3 дня назад</div>
		// 		</div>
		// 	</li>
		// 	<li className="results__item product">
		// 		<button
		// 			className="product__favourite fav-add"
		// 			type="button"
		// 			aria-label="Добавить в избранное"
		// 		>
		// 			<svg
		// 				width="22"
		// 				height="20"
		// 				viewBox="0 0 22 20"
		// 				fill="none"
		// 				xmlns="http://www.w3.org/2000/svg"
		// 			>
		// 				<path
		// 					fillRule="evenodd"
		// 					clipRule="evenodd"
		// 					d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
		// 					stroke="white"
		// 					strokeWidth="2"
		// 					strokeLinejoin="round"
		// 				/>
		// 			</svg>
		// 		</button>
		// 		<div className="product__image">
		// 			<div className="product__image-more-photo hidden">+2 фото</div>
		// 			<img
		// 				src="img/item3.jpg"
		// 				srcSet="img/item3-2x.jpg 2x"
		// 				width="318"
		// 				height="220"
		// 				alt="Фотокамера Canon EOS 5D + объектив"
		// 			/>
		// 			<div className="product__image-navigation hidden">
		// 				<span className="product__navigation-item product__navigation-item--active"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 			</div>
		// 		</div>
		// 		<div className="product__content">
		// 			<h3 className="product__title">
		// 				<a href="/#">Фотокамера Canon EOS 5D + объектив</a>
		// 			</h3>
		// 			<div className="product__price">19 000 ₽</div>
		// 			<div className="product__address">Киров, улица Ленина</div>
		// 			<div className="product__date">1 день назад</div>
		// 		</div>
		// 	</li>
		// 	<li className="results__item product">
		// 		<button
		// 			className="product__favourite fav-add"
		// 			type="button"
		// 			aria-label="Добавить в избранное"
		// 		>
		// 			<svg
		// 				width="22"
		// 				height="20"
		// 				viewBox="0 0 22 20"
		// 				fill="none"
		// 				xmlns="http://www.w3.org/2000/svg"
		// 			>
		// 				<path
		// 					fillRule="evenodd"
		// 					clipRule="evenodd"
		// 					d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
		// 					stroke="white"
		// 					strokeWidth="2"
		// 					strokeLinejoin="round"
		// 				/>
		// 			</svg>
		// 		</button>
		// 		<div className="product__image">
		// 			<div className="product__image-more-photo hidden">+2 фото</div>
		// 			<img
		// 				src="img/item4.jpg"
		// 				srcSet="img/item4-2x.jpg 2x"
		// 				width="318"
		// 				height="220"
		// 				alt="1-комнатная квартира в центре Питера"
		// 			/>
		// 			<div className="product__image-navigation hidden">
		// 				<span className="product__navigation-item product__navigation-item--active"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 			</div>
		// 		</div>
		// 		<div className="product__content">
		// 			<h3 className="product__title">
		// 				<a href="/#">1-комнатная квартира в центре Питера</a>
		// 			</h3>
		// 			<div className="product__price">5 750 000 ₽</div>
		// 			<div className="product__address">
		// 				Санкт-Петербург, Невский проспект
		// 			</div>
		// 			<div className="product__date">5 часов назад</div>
		// 		</div>
		// 	</li>
		// 	<li className="results__item product">
		// 		<button
		// 			className="product__favourite fav-add fav-add--checked"
		// 			type="button"
		// 			aria-label="Добавить в избранное"
		// 		>
		// 			<svg
		// 				width="22"
		// 				height="20"
		// 				viewBox="0 0 22 20"
		// 				fill="none"
		// 				xmlns="http://www.w3.org/2000/svg"
		// 			>
		// 				<path
		// 					fillRule="evenodd"
		// 					clipRule="evenodd"
		// 					d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
		// 					stroke="white"
		// 					strokeWidth="2"
		// 					strokeLinejoin="round"
		// 				/>
		// 			</svg>
		// 		</button>
		// 		<div className="product__image">
		// 			<div className="product__image-more-photo hidden">+2 фото</div>
		// 			<img
		// 				src="img/item5.jpg"
		// 				srcSet="img/item5-2x.jpg 2x"
		// 				width="318"
		// 				height="220"
		// 				alt="Ультрабук HP Spectre X360 2019"
		// 			/>
		// 			<div className="product__image-navigation hidden">
		// 				<span className="product__navigation-item product__navigation-item--active"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 			</div>
		// 		</div>
		// 		<div className="product__content">
		// 			<h3 className="product__title">
		// 				<a href="/#">Ультрабук HP Spectre X360 2019</a>
		// 			</h3>
		// 			<div className="product__price">41 000 ₽</div>
		// 			<div className="product__address">Пермь, проспект Просвещения</div>
		// 			<div className="product__date">7 января</div>
		// 		</div>
		// 	</li>
		// 	<li className="results__item product">
		// 		<button
		// 			className="product__favourite fav-add"
		// 			type="button"
		// 			aria-label="Добавить в избранное"
		// 		>
		// 			<svg
		// 				width="22"
		// 				height="20"
		// 				viewBox="0 0 22 20"
		// 				fill="none"
		// 				xmlns="http://www.w3.org/2000/svg"
		// 			>
		// 				<path
		// 					fillRule="evenodd"
		// 					clipRule="evenodd"
		// 					d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
		// 					stroke="white"
		// 					strokeWidth="2"
		// 					strokeLinejoin="round"
		// 				/>
		// 			</svg>
		// 		</button>
		// 		<div className="product__image">
		// 			<div className="product__image-more-photo">+2 фото</div>
		// 			<img
		// 				src="img/item6.jpg"
		// 				srcSet="img/item6-2x.jpg 2x"
		// 				width="318"
		// 				height="220"
		// 				alt="ВАЗ 2101 на ходу, без документов"
		// 			/>
		// 			<div className="product__image-navigation hidden">
		// 				<span className="product__navigation-item product__navigation-item--active"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 				<span className="product__navigation-item"></span>
		// 			</div>
		// 		</div>
		// 		<div className="product__content">
		// 			<h3 className="product__title">
		// 				<a href="/#">ВАЗ 2101 на ходу, без документов</a>
		// 			</h3>
		// 			<div className="product__price">5 000 ₽</div>
		// 			<div className="product__address">Омск, улица Уездная</div>
		// 			<div className="product__date">30 декабря 2019 года</div>
		// 		</div>
		// 	</li>
		// </ul>
	);
};
