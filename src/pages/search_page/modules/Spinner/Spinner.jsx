import "./Spinner.css";

/**
	Этот компонент отвечает за показ спиннера, пока страница загружается
	Используется в компоненте SearchPage.jsx, т.е. на уровне страницы
*/

// Спиннер простой. Вся магия делается через CSS
export const Spinner = () => {
	return (
		<div className="loadingio-spinner">
			<div className="ldio">
				<div></div>
			</div>
		</div>
	);
};
