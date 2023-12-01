import { addToFav, removeFromFav } from "@search_page/SearchPageReducer";
import { useAppSelector, useAppDispatch } from "@src/hook.ts";

const Btn = (classes, toggleFavBtn) => {	
	const handleClick = () => {
		toggleFavBtn();
	}

	return (
		<button className={classes} onClick={handleClick} type="button" aria-label="Добавить в избранное">
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

export const BtnFavList = ({favBtnActive, toggleFavBtn}) => {
	const basicClass = "product__favourite fav-add";
	let classes;
	if (favBtnActive === true) classes = basicClass + " fav-add__active";
	else classes = basicClass;
	return Btn(classes, toggleFavBtn);
};

export const BtnFavCard = ({favBtnActive, toggleFavBtn}) => {
	const basicClass = "gallery__favourite fav-add";
	let classes;
	if (favBtnActive) classes = basicClass + " fav-add__active";
	else classes = basicClass;
	return Btn(classes, toggleFavBtn);
};
