export function getCookie(name) {
	const cookies = document.cookie.split(";");

	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.trim().split("=");

		if (cookieName === name) {
			// Кука с указанным именем найдена, возвращаем её значение
			return decodeURIComponent(cookieValue);
		}
	}

	// Кука с указанным именем не найдена
	return false;
}

export function addToCookie(cookieName, newValue) {
	// Получаем текущее значение куки
	const currentCookieValue = getCookie(cookieName);

	// Раскодируем текущее значение куки в массив
	const currentArray = currentCookieValue ? JSON.parse(currentCookieValue) : [];

	// Добавляем новое значение к массиву
	currentArray.push(newValue);

	// Обновляем значение куки с новым массивом
	document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(currentArray))}; path=/`;
}

export function removeFromCookie(cookieName, valueToRemove) {
	// Получаем текущее значение куки
	const currentCookieValue = getCookie(cookieName);

	if (currentCookieValue) {
		// Раскодируем текущее значение куки в массив
		const currentArray = JSON.parse(currentCookieValue);

		// Удаляем указанное значение из массива
		const newArray = currentArray.filter((value) => value !== valueToRemove);

		// Обновляем значение куки с новым массивом
		document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(newArray))}; path=/`;
	}
}
