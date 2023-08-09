import React from "react";

export const Results = () => {
	return (
		<ul class="results__list">
			<li class="results__item product">
				<button
					class="product__favourite fav-add"
					type="button"
					aria-label="Добавить в избранное"
				>
					<svg
						width="22"
						height="20"
						viewBox="0 0 22 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
							stroke="white"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="product__image">
					<div class="product__image-more-photo hidden">+2 фото</div>
					<img
						src="img/item1.jpg"
						srcset="img/item1-2x.jpg 2x"
						width="318"
						height="220"
						alt="Загородный дом с видом на озеро"
					/>
					<div class="product__image-navigation">
						<span class="product__navigation-item product__navigation-item--active"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
					</div>
				</div>
				<div class="product__content">
					<h3 class="product__title">
						<a href="/#">Загородный дом с видом на озеро</a>
					</h3>
					<div class="product__price">3 000 000 ₽</div>
					<div class="product__address">Приозёрск, улица Прибрежная</div>
					<div class="product__date">2 часа назад</div>
				</div>
			</li>
			<li class="results__item product">
				<button
					class="product__favourite fav-add"
					type="button"
					aria-label="Добавить в избранное"
				>
					<svg
						width="22"
						height="20"
						viewBox="0 0 22 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
							stroke="white"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="product__image">
					<div class="product__image-more-photo hidden">+2 фото</div>
					<img
						src="img/item2.jpg"
						srcset="img/item2-2x.jpg 2x"
						width="318"
						height="220"
						alt="Ford Mustang 2020"
					/>
					<div class="product__image-navigation hidden">
						<span class="product__navigation-item product__navigation-item--active"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
					</div>
				</div>
				<div class="product__content">
					<h3 class="product__title">
						<a href="/#">Ford Mustang 2020</a>
					</h3>
					<div class="product__price">2 950 000 ₽</div>
					<div class="product__address">Москва, Нахимовский проспект</div>
					<div class="product__date">3 дня назад</div>
				</div>
			</li>
			<li class="results__item product">
				<button
					class="product__favourite fav-add"
					type="button"
					aria-label="Добавить в избранное"
				>
					<svg
						width="22"
						height="20"
						viewBox="0 0 22 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
							stroke="white"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="product__image">
					<div class="product__image-more-photo hidden">+2 фото</div>
					<img
						src="img/item3.jpg"
						srcset="img/item3-2x.jpg 2x"
						width="318"
						height="220"
						alt="Фотокамера Canon EOS 5D + объектив"
					/>
					<div class="product__image-navigation hidden">
						<span class="product__navigation-item product__navigation-item--active"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
					</div>
				</div>
				<div class="product__content">
					<h3 class="product__title">
						<a href="/#">Фотокамера Canon EOS 5D + объектив</a>
					</h3>
					<div class="product__price">19 000 ₽</div>
					<div class="product__address">Киров, улица Ленина</div>
					<div class="product__date">1 день назад</div>
				</div>
			</li>
			<li class="results__item product">
				<button
					class="product__favourite fav-add"
					type="button"
					aria-label="Добавить в избранное"
				>
					<svg
						width="22"
						height="20"
						viewBox="0 0 22 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
							stroke="white"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="product__image">
					<div class="product__image-more-photo hidden">+2 фото</div>
					<img
						src="img/item4.jpg"
						srcset="img/item4-2x.jpg 2x"
						width="318"
						height="220"
						alt="1-комнатная квартира в центре Питера"
					/>
					<div class="product__image-navigation hidden">
						<span class="product__navigation-item product__navigation-item--active"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
					</div>
				</div>
				<div class="product__content">
					<h3 class="product__title">
						<a href="/#">1-комнатная квартира в центре Питера</a>
					</h3>
					<div class="product__price">5 750 000 ₽</div>
					<div class="product__address">Санкт-Петербург, Невский проспект</div>
					<div class="product__date">5 часов назад</div>
				</div>
			</li>
			<li class="results__item product">
				<button
					class="product__favourite fav-add fav-add--checked"
					type="button"
					aria-label="Добавить в избранное"
				>
					<svg
						width="22"
						height="20"
						viewBox="0 0 22 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
							stroke="white"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="product__image">
					<div class="product__image-more-photo hidden">+2 фото</div>
					<img
						src="img/item5.jpg"
						srcset="img/item5-2x.jpg 2x"
						width="318"
						height="220"
						alt="Ультрабук HP Spectre X360 2019"
					/>
					<div class="product__image-navigation hidden">
						<span class="product__navigation-item product__navigation-item--active"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
					</div>
				</div>
				<div class="product__content">
					<h3 class="product__title">
						<a href="/#">Ультрабук HP Spectre X360 2019</a>
					</h3>
					<div class="product__price">41 000 ₽</div>
					<div class="product__address">Пермь, проспект Просвещения</div>
					<div class="product__date">7 января</div>
				</div>
			</li>
			<li class="results__item product">
				<button
					class="product__favourite fav-add"
					type="button"
					aria-label="Добавить в избранное"
				>
					<svg
						width="22"
						height="20"
						viewBox="0 0 22 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
							stroke="white"
							stroke-width="2"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="product__image">
					<div class="product__image-more-photo">+2 фото</div>
					<img
						src="img/item6.jpg"
						srcset="img/item6-2x.jpg 2x"
						width="318"
						height="220"
						alt="ВАЗ 2101 на ходу, без документов"
					/>
					<div class="product__image-navigation hidden">
						<span class="product__navigation-item product__navigation-item--active"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
						<span class="product__navigation-item"></span>
					</div>
				</div>
				<div class="product__content">
					<h3 class="product__title">
						<a href="/#">ВАЗ 2101 на ходу, без документов</a>
					</h3>
					<div class="product__price">5 000 ₽</div>
					<div class="product__address">Омск, улица Уездная</div>
					<div class="product__date">30 декабря 2019 года</div>
				</div>
			</li>
		</ul>
	);
};
