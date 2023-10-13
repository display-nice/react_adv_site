// Подставляет пробелы в цену через каждые 3 знака для удобства восприятия
export function addThinSpacesToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
}

// Берёт таймштамп из БД и преобразует его в дату
// в соответствии с бизнес-условиями
export function formatPublishDate(timestamp: string): string {	
	const timestampNumber = Number(timestamp); // Преобразуем строку в число
	// const timestampNumber = new Date(2023, 9, 11, 11).getTime(); // Для тестов
	const currentDate = new Date();
	const publishDate = new Date(timestampNumber);
	const timeDiff = currentDate.getTime() - publishDate.getTime();
	// console.log(new Date(2023, 9, 12, 10).getTime());
	// "1696809600000"  9 октября 2023
	// "1576773899132" 19 декабря 2019
	// "1697086800000" 12 октября 2023, 10 часов утра
	// console.log("Итог: ", formatPublishDate("1697086800000"));
	// console.log("Итог: ", formatPublishDate());

	// Если часы равны, выводим "менее часа назад"
	const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
	if (hoursDiff === 0) {
		return "менее часа назад";
	}

	// Если опубликовали менее 24 часов назад, то выводим количество часов
	if (hoursDiff > 0 && hoursDiff < 24) {
		let hoursSuffix;
		if ([1, 21].includes(hoursDiff)) hoursSuffix = "час";
		else if ([2, 3, 4, 22, 23].includes(hoursDiff)) hoursSuffix = "часа";
		else hoursSuffix = "часов";
		return `${hoursDiff} ${hoursSuffix} назад`;
	}

	// Если объявление опубликовано менее недели назад, выводим кол-во дней
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	if (daysDiff > 0 && daysDiff <= 7) {
		console.log("daysDiff", daysDiff);
		let daysSuffix;
		if (daysDiff == 1) daysSuffix = "день";
		else if ([2, 3, 4].includes(daysDiff)) daysSuffix = "дня";
		else daysSuffix = "дней";
		return `${daysDiff} ${daysSuffix} назад`;
	}

	const dateOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	};

	// Если годы одинаковы, значит выводим только дату и месяц
	if (currentDate.getFullYear() === publishDate.getFullYear()) {
		const shortDateRus = new Date(timestampNumber)
			.toLocaleDateString("ru", dateOptions)
			.replace(/\d+ г\.$/, "");
		return shortDateRus;
	}
	// Если разница дат более 1 года
	if (currentDate.getFullYear() - publishDate.getFullYear() > 0) {
		const fullDateRus = new Date(timestampNumber)
			.toLocaleDateString("ru", dateOptions)
			.replace(/г\.$/, "года");
		return fullDateRus;
	}
}
