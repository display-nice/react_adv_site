import { useAppSelector, useAppDispatch } from "@src/hook";
import { performFiltration, setSortType, toggleShowSortingXS } from "../SearchPageReducer";
import classNames from "classnames";

/**
	Этот компонент отвечает за работу кнопок сортировки
	Используется в компоненте SearchPage.jsx, т.е. на уровне страницы

	Варианты сортировки:
		Популярные.
		Порядок по умолчанию. Данные в том порядке, в котором они пришли с сервера.

		Сначала дешёвые. 
		Объявления, отсортированные по возрастанию цены от меньшей к большей.

		Новые. 
		Сортировка по дате публикации объявления, от недавних к поздним.
*/

export const Sort = () => {
	const dispatch = useAppDispatch();
	const sortBy = useAppSelector((state) => state.SearchPageReducer.sortBy);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	const showSorted = (e) => {
		dispatch(setSortType(e.target.value));
		dispatch(performFiltration());
	};

	return (
		<fieldset className="sorting__order">
			<legend className="section-subtitle">Показать сначала</legend>
			<ul className="sorting__order-list">
				<li className="sorting__order-tab">
					<input
						className="visually-hidden"
						type="radio"
						name="sorting-order"
						value="popular"
						id="sort-popular"
						onChange={showSorted}
						checked={sortBy === "popular"}
						disabled={favIsActive === true}
					/>
					<label htmlFor="sort-popular">Популярные</label>
				</li>
				<li className="sorting__order-tab">
					<input
						className="visually-hidden"
						type="radio"
						name="sorting-order"
						value="cheap"
						id="sort-cheap"
						onChange={showSorted}
						checked={sortBy === "cheap"}
						disabled={favIsActive === true}
					/>
					<label htmlFor="sort-cheap">Дешёвые</label>
				</li>
				<li className="sorting__order-tab">
					<input
						className="visually-hidden"
						type="radio"
						name="sorting-order"
						value="new"
						id="sort-new"
						onChange={showSorted}
						checked={sortBy === "new"}
						disabled={favIsActive === true}
					/>
					<label htmlFor="sort-new">Новые</label>
				</li>
			</ul>
		</fieldset>
	);
};
export const SortXS = () => {
	const dispatch = useAppDispatch();
	const showSortingXS = useAppSelector(state => state.SearchPageReducer.showSortingXS);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);
	const btnClass = classNames({
		"xs__control-btn": true,
		"xs__control-btn--pressed": showSortingXS,
		// "xs__control-btn--disabled": favIsActive
	});
	const handleClick = () => {
		dispatch(toggleShowSortingXS())
	}
	return (
		<button className={btnClass} onClick={handleClick} disabled={favIsActive === true}>
			<h2>Сортировка</h2>
			<svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
				/>
			</svg>
		</button>
	);
};
