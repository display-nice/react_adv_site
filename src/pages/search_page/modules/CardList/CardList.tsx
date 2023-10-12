import { useAppSelector } from "@src/hook";
import { BtnAddToFav } from "./BtnAddToFav";
import { formatPublishDate } from "./utils";

const createListItems = (data) => {
	const listItems = data.map((item) => {
		return (
			<li className="results__item product" key={item.name + "_key"}>
				<BtnAddToFav />
				<div className="product__image">
					<div className="product__image-more-photo hidden">+2 фото</div>
					<img
						src="img/item1.jpg"
						srcSet={item.photos[0]}
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
						<a href="/#">{item.name}</a>
					</h3>
					<div className="product__price">{item.price} ₽</div>
					<div className="product__address">
						{item.address.city + ", " + item.address.street + ", " + item.address.building}
					</div>
					<div className="product__date">{formatPublishDate(item["publish-date"])}</div>
				</div>
			</li>
		);
	});
	return listItems;
};

export const CardList = () => {
	// Инициализация. 
	// Если ещё не нажимали кнопку "показать" (то есть если нет фильтрованных данных по продуктам),
	// то показываем все продукты, пришедшие с сервера, в том порядке, в котором они пришли
	const productsData = useAppSelector((state) => state.SearchPageReducer.productsData);
	const filteredProductsData = useAppSelector(
		(state) => state.SearchPageReducer.filteredProductsData
	);
	let listItems;
	if (!filteredProductsData) listItems = createListItems(productsData);
	if (filteredProductsData) listItems = createListItems(filteredProductsData);

	return <ul className="results__list">{listItems}</ul>;
};


