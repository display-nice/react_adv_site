// ------------- DESCRIPTION --------------
// ulCrafter's incoming parameters:
// items: array of objects from state, like this:
// laptopType: [
// 	{name: "laptopType", text: 'Ультрабук', value: 'ultra', checked: false},
// 	{name: "laptopType", text: 'Домашний ноутбук', value: 'home', checked: false},
// 	{name: "laptopType", text: 'Игровой ноутбук', value: 'gaming', checked: false}
// ]
// inputType: "checkbox" or "radio"
// filter: name of the filter in state, one of this:
// cameraFilter, carFilter, laptopFilter, estateFilter
// ulClass: special css class for <ul> tag.
// eventHandler: function to handle events.

export const ulCrafter = (items, inputType, filter, ulClasses, eventHandler) => {

	let liClasses;
	switch (inputType) {
		case 'checkbox':
			liClasses = "filter__checkboxes-item"; break;
		case 'radio':
			liClasses = "filter__radiobuttons-item"; break;
	}

	const list = items.map(item => {
		return (
			<li className={liClasses} key={item.name + "_" + item.value + "_key"}>
				<input
					className="visually-hidden"
					type={inputType}
					name={item.name}
					value={item.value}
					id={`${item.name + '_' + item.value}`}
					data-filter={filter}
					onChange={eventHandler}
					checked={item.checked ? true : false}
				/>
				<label htmlFor={`${item.name + '_' + item.value}`}>{item.text}</label>
			</li>
		)
	})

	return (
		<ul className={ulClasses}>
			{list}
		</ul>
	)
}