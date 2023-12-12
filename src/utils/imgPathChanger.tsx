export const imgPathChanger = (imgPath, folder, fileType) => {
	// Используем регулярное выражение для поиска пути к файлу и его расширения
	const regex = /(.*\/images_local\/)(.*\/)*([^/]+)\.([^/.]+)$/;
	// Заменяем путь к файлу и расширение
	const newPath = imgPath.replace(regex, `$1${folder}/$3.${fileType}`);
	return newPath;
};
