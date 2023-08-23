import React from "react";

import { Selector } from "./components/Selector.tsx";
import { CameraFilter } from "./components/CameraFilter";
import { CarFilter } from "./components/CarFilter";
import { EstateFilter } from "./components/EstateFilter";
import { LaptopFilter } from "./components/LaptopFilter";
import { RangeFilter } from "./components/RangeFilter";

export const Filters = () => {
	return (
		<form className="filter__form" action="#" method="post">
			<Selector/>
			<RangeFilter/>
			<EstateFilter/>
			<CameraFilter/>
			<LaptopFilter/>
			<CarFilter/>
			<button className="button filter__button" type="submit">
				Показать
			</button>
		</form>
	);
};
