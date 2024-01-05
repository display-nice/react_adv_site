import { useAppSelector } from "@src/hook.ts";
import { Product } from "./Product";

/**
	Этот компонент отвечает за список продуктов
	Используется в компоненте SearchPage.jsx, т.е. на уровне страницы
*/

export const ProductList = () => {
	// Инициализация.
	// Если ещё не нажимали кнопку "показать" (то есть если нет фильтрованных данных по продуктам),
	// то показываем все продукты, пришедшие с сервера, в том порядке, в котором они пришли.
	const displayedProducts = useAppSelector((state) => state.SearchPageReducer.displayedProducts);
	const favProducts = useAppSelector((state) => state.SearchPageReducer.favProducts);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	// Если кнопка "Избранные" активна, то показываем избранные
	// либо заглушку избранных (если кнопка активна, но избранных нет)
	if (favIsActive) {
		if (favProducts && favProducts.length > 0) {
			// Кнопка "Показать избранные" нажата
			// Если есть что в избранных, то выводим их на экран
			return (
				<section className="results__list">
					<ul>
						{favProducts.map((item, index) => (
							<Product key={item.name + "_product_key_" + index} item={item} />
						))}
					</ul>
				</section>
			);
		} else {
			// Кнопка "Показать избранные" нажата
			// Но избранных продуктов нет. Тогда показываем заглушку.
			return (
				<section className="results__list results__info favourites">
					<p className="favourites__empty-message">
						У вас пока нет избранных товаров. Чтобы отметить товар, кликните на сердечко в карточке
						объявления.
					</p>
					<p className="favourites__notion">
						Вы можете вернуться к списку всех товаров, кликнув ещё раз на&nbsp;«Показать избранные»
					</p>
				</section>
			);
		}
	} else {
		// Кнопка "Показать избранные" не активна
		// В этом случае занимаемся обычными продуктами
		if (displayedProducts && displayedProducts.length > 0) {
			// Кнопка "Показать избранные" не активна
			// Обычные продукты есть, отрисовываем
			return (
				<section className="results__list">
					<ul>
						{displayedProducts.map((item, index) => (
							<Product key={item.name + "_product_key_" + index} item={item} />
						))}
					</ul>
				</section>
			);
		} else {
			// Кнопка "Показать избранные" не активна
			// Обычных продуктов не найдено, показываем заглушку
			return (
				<section className="results__list">
					<div className="results__info results__info--empty-block">
						<p className="results__empty-message">Мы не нашли товары по вашему запросу.</p>
						<p className="results__notion">
							Попробуйте поменять фильтры настройки объявлений в блоке слева
						</p>
					</div>
				</section>
			);
		}
	}
};