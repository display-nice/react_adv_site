import { useAppSelector } from "@src/hook";

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

const createListItems = (data) => {
	const listItems = data.map((item) => {
		return (
			<li className="results__item product">
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
					<div className="product__date">2 часа назад</div>
				</div>
			</li>
		);
	});
	return listItems;
};

export const CardList = () => {

	const productsData = useAppSelector((state) => state.SearchPageReducer.productsData);
	const filteredProductsData = useAppSelector(
		(state) => state.SearchPageReducer.filteredProductsData
	);
	let listItems;
	if (!filteredProductsData) listItems = createListItems(productsData);
	if (filteredProductsData) listItems = createListItems(filteredProductsData);

	return (
		<ul className="results__list">{listItems}</ul>		
	);
};
