import { useState } from "react";
import { getCookie, setCookie } from "@src/utils/cookies";

/**
	Компонент согласия на cookies
	Это замена npm-пакета "react-cookie-consent" после перехода на Vite.
	Повторяет поведение прежнего пакета: баннер скрыт, если кука CookieConsent уже есть;
	по клику на кнопку кука ставится на 365 дней и баннер исчезает.
	Дефолтные инлайн-стили пакета сохранены - их дополняют классы CC_* из cookieConsent.css
	Используется в SearchPage.jsx
*/

const COOKIE_NAME = "CookieConsent";
const COOKIE_EXPIRES = 365;

export const CookieConsent = ({ children, buttonText, containerClasses, contentClasses, buttonClasses }) => {
	// Баннер виден, только если пользователь ещё не согласился ( Куки ещё нет )
	const [isVisible, setIsVisible] = useState(() => !getCookie(COOKIE_NAME));

	const acceptHandler = () => {
		setCookie(COOKIE_NAME, "true", COOKIE_EXPIRES);
		setIsVisible(false);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div
			className={containerClasses}
			style={{
				alignItems: "baseline",
				background: "#353535",
				color: "white",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "space-between",
				left: "0",
				bottom: "0",
				position: "fixed",
				width: "100%",
				zIndex: "999",
			}}
		>
			<div
				style={{
					flex: "1 0 300px",
					margin: "15px",
				}}
				className={contentClasses}
			>
				{children}
			</div>
			<div>
				<button
					type="button"
					id="rcc-confirm-button"
					aria-label="Accept cookies"
					className={buttonClasses}
					style={{
						background: "#ffd42d",
						border: "0",
						borderRadius: "0px",
						boxShadow: "none",
						color: "black",
						cursor: "pointer",
						flex: "0 0 auto",
						padding: "5px 10px",
						margin: "15px",
					}}
					onClick={acceptHandler}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
};
