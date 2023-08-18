import "./Spinner.css";

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