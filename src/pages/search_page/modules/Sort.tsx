import { useAppSelector, useAppDispatch } from "@src/hook";
import { sort } from "../SearchPageReducer";
import { getCheckedFilters } from "./Filters/_FiltersReducer";

// Варианты сортировки:
// Популярные.
// Порядок по умолчанию. Данные в том порядке, в котором они пришли с сервера.

// Сначала дешёвые. 
// Объявления, отсортированные по возрастанию цены от меньшей к большей.

// Новые. 
// Сортировка по дате публикации объявления, от недавних к поздним.

export const Sort = () => {
	const dispatch = useAppDispatch();
	const sortBy = useAppSelector(state => state.SearchPageReducer.sortBy);
	const checkedFilters = useAppSelector(getCheckedFilters)

	const showSorted = (e) => {
		const data = {
			sortBy: e.target.value,
			checkedFilters
		}
		dispatch(sort(data))
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
						checked={sortBy === 'popular'}
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
						checked={sortBy === 'cheap'}
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
						checked={sortBy === 'new'}
						onChange={showSorted}
					/>
					<label htmlFor="sort-new">Новые</label>
				</li>
			</ul>
		</fieldset>
	);
};
