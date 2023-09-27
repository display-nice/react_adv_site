import { db_dev_products } from "../../db_dev_products.js";

export class SP_Services {	
	loadItemsData = async () => {
		// const response = await fetch(`https://mock.pages.academy/store/db`);
		// if (!response.ok) {
		// 	throw new Error(`Network or server error, try again later`);
		// }
		// return await response.json();
		
		// тестовая локальная база данных, чтобы не кошмарить сервер при разработке
		return db_dev_products;
	};	
};