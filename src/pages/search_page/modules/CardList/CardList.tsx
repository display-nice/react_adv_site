import { useAppSelector } from "@src/hook";
import { BtnAddToFav } from "./BtnAddToFav";
import { addThinSpacesToNumber, formatPublishDate } from "./utils";
import { useState, useCallback } from "react";

const Product = ({ item }) => {
	const [isHintVisible, setIsHintVisible] = useState(false);

	const activate = (e) => {
		e.target.className = "product__navigation-column product__navigation-column--active";
	};
	const deactivate = (e) => {
		e.target.className = "product__navigation-column";
	};

	const photosAmount = item.photos.length;
	let morePhotos = photosAmount > 5 ? photosAmount - 5 : null;

	// const fifthColumnMouseEnter = useCallback((e) => {
	// 	// activate(e);
	// 	setIsHintVisible(true);
	// }, []);

	// const fifthColumnMouseLeave = useCallback((e) => {
	// 	// deactivate(e);
	// 	setIsHintVisible(false);
	// }, []);

	const fifthColumnMouseEnter = useCallback((e) => {
		// activate(e);
		setIsHintVisible(true);
	}, []);

	const fifthColumnMouseLeave = useCallback((e) => {
		// deactivate(e);
		setIsHintVisible(false);
		// console.log('пятая колонка');
	}, []);

	const test = (e) => {
		// console.log("хинт");
		// console.log(e.target.getAttribute("data-index"))
	}
	const test2 = (e) => {
		console.log("колонка");
	}

	const photoNav = item.photos.map((image, index) => {
		let mouseEnterHandler;
		let mouseLeaveHandler;
		let className;
		// Подсвечиваем активную плитку. По-умолчанию активной должна быть первая.
		index === 0
			? (className = "product__navigation-column product__navigation-column--active")
			: (className = "product__navigation-column");
		// Условия в зависимости от количества фото в объявлении в базе данных
		if (photosAmount >= 2 && photosAmount <= 5) {
			mouseEnterHandler = activate;
			mouseLeaveHandler = deactivate;
		} else if (photosAmount > 5) {
			// Нам нужно не более пяти плиток (колонок) на изображении
			// Если мы сейчас на пятой и далее, то ничего не возвращаем
			if (index >= 1 && index <= 3) {
				mouseEnterHandler = activate;
				mouseLeaveHandler = deactivate;
			}
			if (index === 4) {
				return (
					<>
						<div
							key={item.name + "_photo_" + index + "_fifth-column"}
							onMouseEnter={fifthColumnMouseEnter}
							onMouseLeave={fifthColumnMouseLeave}
							className={className += " product__navigation-column--fifth"}
							data-index={index}
						>
							<span></span>
						</div>
						{isHintVisible && <div className="product__image-more-photo">
							+{morePhotos} фото
						</div>}
					</>
				);
			}
			if (index > 4) return;
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
			<BtnAddToFav />
			<div className="product__image">
				{/* <div className="product__image-more-photo hidden">+{morePhotos} фото</div> */}
				
				<img
					src="img/item1.jpg"
					srcSet={item.photos[0]}
					width="318"
					height="220"
					alt="Загородный дом с видом на озеро"
				/>
				<div className="product__image-navigation">{photoNav}</div>
			</div>
			<div className="product__content">
				<h3 className="product__title">
					<a href="/#">{item.name}</a>
				</h3>
				<div className="product__price">{addThinSpacesToNumber(item.price)} ₽</div>
				<div className="product__address">{item.address.city + ", " + item.address.street}</div>
				<div className="product__date">{formatPublishDate(item["publish-date"])}</div>
			</div>
		</li>
		
	);
};

export const CardList = () => {
	// Инициализация.
	// Если ещё не нажимали кнопку "показать" (то есть если нет фильтрованных данных по продуктам),
	// то показываем все продукты, пришедшие с сервера, в том порядке, в котором они пришли
	const productsData = useAppSelector((state) => state.SearchPageReducer.productsData);
	const filteredProductsData = useAppSelector(
		(state) => state.SearchPageReducer.filteredProductsData
	);
	let products;
	if (!filteredProductsData) products = productsData;
	if (filteredProductsData) products = filteredProductsData;

	return (
		<ul className="results__list">
			{products.map((item, index) => {
				return <Product key={item.name + "_key_photo_" + index} item={item} />;
			})}
		</ul>
	);
};

// <div
// 	key={item.name + "_photo_" + index}
// 	onMouseEnter={activate}
// 	onMouseLeave={deactivate}
// 	className="product__navigation-column product__navigation-column--active"
// >
// 	<span></span>
// </div>;

{
	/* <div
							onMouseEnter={activate}
							onMouseLeave={deactivate}
							className="product__navigation-column product__navigation-column--active"
						>
							<span></span>
						</div>

						<div
							onMouseEnter={activate}
							onMouseLeave={deactivate}
							className="product__navigation-column"
						>
							<span></span>
						</div>

						<div
							onMouseEnter={activate}
							onMouseLeave={deactivate}
							className="product__navigation-column"
						>
							<span></span>
						</div>

						<div
							onMouseEnter={activate}
							onMouseLeave={deactivate}
							className="product__navigation-column"
						>
							<span></span>
						</div>

						<div
							onMouseEnter={activate}
							onMouseLeave={deactivate}
							className="product__navigation-column"
						>
							<span></span>
						</div> */
}
