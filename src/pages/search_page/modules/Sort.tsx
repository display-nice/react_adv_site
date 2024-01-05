import { useAppSelector, useAppDispatch } from "@src/hook";
import { performFiltration, setSortType } from "../SearchPageReducer";

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
