import React from "react";

import { Selector } from "./Selector.tsx";
import { CameraFilter } from "./CameraFilter";
import { CarFilter } from "./CarFilter";
import { EstateFilter } from "./EstateFilter";
import { LaptopFilter } from "./LaptopFilter";
import { RangeFilter } from "./RangeFilter";

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
