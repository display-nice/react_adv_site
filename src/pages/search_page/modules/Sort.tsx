import { useAppSelector, useAppDispatch } from "@src/hook";
import { performSorting } from "../SearchPageReducer";

// Варианты сортировки:
// Популярные.
// Порядок по умолчанию. Данные в том порядке, в котором они пришли с сервера.

// Сначала дешёвые. 
// Объявления, отсортированные по возрастанию цены от меньшей к большей. 
// При этом учитываются цены из ценового фильтра (для всех категорий товаров кроме «Все»).

// Новые. 
// Сортировка по дате публикации объявления, от недавних к поздним.

export const Sort = () => {
	const dispatch = useAppDispatch();
	const sortState = useAppSelector(state => state.SearchPageReducer.sort);

	const showSorted = (e) => {
		dispatch(performSorting(e.target.value))
	}

	return (
		<fieldset className="sorting__order">
			<legend>Показать сначала:</legend>
			<ul className="sorting__order-list">
				<li className="sorting__order-tab">
					<input
						className="visually-hidden"
						type="radio"
						name="sorting-order"
						value="popular"
						id="sort-popular"
						checked = {sortState.popular === true ? true : false}
						onChange={showSorted}
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
						checked = {sortState.cheap === true ? true : false}
						onChange={showSorted}
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
						checked = {sortState.new === true ? true : false}
						onChange={showSorted}
					/>
					<label htmlFor="sort-new">Новые</label>
				</li>
			</ul>
		</fieldset>
	);
};
