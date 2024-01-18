import { Filters } from "./Filters/_Filters";
import { Sort } from "./Sort";
import { Favorites } from "./Favorites";
import { useAppSelector } from "@src/hook";

export const M_controls = () => {
	return (
		<>
			<div className="m-filters">
				<section className="filter">
					<h2 className="section-title">Фильтры</h2>
					<Filters />
				</section>
			</div>
			<div className="m-sortfavs">
				<section className="sorting">
					<h2 className="section-title">Сортировка</h2>
					<form className="sorting__form">
						<Sort />
					</form>
				</section>
				<Favorites />
			</div>
		</>
	);
};
