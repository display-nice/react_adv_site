/**
	Этот компонент отвечает за создание инпутов с типом checkbox, radio, select
	Используется во всех фильтрах, кроме фильтра цены	
*/

import { useAppSelector } from "@src/hook";

/**
	UlCrafter. Делает чекбоксы и радиокнопки.
	На вход принимает:
		inputType: "checkbox" или "radio"
		data: массив с объектами из стейта, например:
			laptopType: [
				{ value: "ultra", checked: false, text: "Ультрабук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "home", checked: false, text: "Домашний ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "gaming", checked: false, text: "Игровой ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			],
		ulClasses: специфичные для места расположения css-классы
		eventHandler: функция-обработчик событий
*/

export const UlCrafter = (inputType, data, ulClasses, eventHandler) => {
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);
	let liClasses;
	switch (inputType) {
		case "checkbox":
			liClasses = "filter__checkboxes-item";
			break;
		case "radio":
			liClasses = "filter__radiobuttons-item";
			break;
	}

	const list = data.map((item) => {
		return (
			<li className={liClasses} key={item.subfilter + "_" + item.value + "_key"}>
				<input
					className="visually-hidden"
					type={inputType}
					value={item.value}
					id={`${item.subfilter + "_" + item.value}`}
					onChange={eventHandler}
					data-filter={item.filter}
					data-subfilter={item.subfilter}
					checked={item.checked === true}
					disabled={favIsActive === true}
				/>
				<label htmlFor={`${item.subfilter + "_" + item.value}`}>{item.text}</label>
			</li>
		);
	});

	return <ul className={ulClasses}>{list}</ul>;
};

/**
	SelectCrafter. Делает инпуты с типом Селект.
	На вход принимает:		
		data: массив с объектами из стейта, например:
			laptopType: [
				{ value: "ultra", checked: false, text: "Ультрабук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "home", checked: false, text: "Домашний ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "gaming", checked: false, text: "Игровой ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			],
		eventHandler: функция-обработчик событий
*/
export const SelectCrafter = (data, eventHandler) => {
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);
	const options = data.map((item) => (
		<option
			key={item.subfilter + "_" + item.value + "_key"}
			id={`${item.subfilter + "_" + item.value}`}
			value={item.value}
			data-filter={item.filter}
			data-subfilter={item.subfilter}
		>
			{item.text}
		</option>
	));
	// Находим активный элемент и устанавливаем его по-умолчанию на весь <select>, делая компонент управляемым.
	// Ставить defaultValue={item.checked ? item.value : undefined} на сам <option> здесь бесполезно.
	const activeValue = data.find((item) => item.checked)?.value || "";
	return (
		<select
			value={activeValue}
			title={data[0].subfilter}
			id={data[0].filter + "_" + data[0].subfilter}
			name={data[0].subfilter}
			onChange={eventHandler}
			disabled={favIsActive === true}
		>
			{options}
		</select>
	);
};
