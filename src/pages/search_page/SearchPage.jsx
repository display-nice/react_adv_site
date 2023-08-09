import React from "react";
import { Filters } from "./modules/Filters/Filters";
import { Sorting } from "./modules/Sorting/Sorting";
import { Results } from "./modules/Results";
import { Popup } from "./modules/Popup";

const PageContent = () => {
	return (
		<section class="onlineshop-app">
			<h1 class="visually-hidden">Главная</h1>
			<div class="onlineshop-app__blueline"></div>
			<div class="onlineshop-app__wrapper">
				<section class="onlineshop-app__filter filter">
					<h2 class="title filter__title">Фильтр</h2>
					<Filters />
				</section>
				<section class="onlineshop-app__results results">
					<div class="results__head">
						<h2 class="title results__title">Результаты</h2>
						<Sorting />
					</div>
					<div class="results__info favourites hidden">
						<p class="favourites__empty-message">
							У вас пока нет избранных товаров. Чтобы отметить товар, кликните
							на сердечко в карточке объявления.
						</p>
						<p class="favourites__notion">
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
	return <PageContent />;
};
