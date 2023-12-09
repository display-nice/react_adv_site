import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SP_Services } from "./SearchPageServices";
import { filterAndSort } from "@helpers/filterAndSort";
import { findMinMaxPrices } from "@src/utils/prices";
import { getCookie, addToCookie, removeFromCookie } from "@src/utils/cookies";
import { dbKeysAdapter } from "@src/helpers/translators(adapters)";

/**
	Это редьюсер всей страницы.
	Здесь происходит инициализация страницы и хранятся данные, так или иначе затрагивающие всю страницу.
*/

type filterParams = {
	type: string;
	filter: string;
	subfilter: string;
	value: string;
	checked?: boolean;
};

type selectParams = {
	filter: string;
	subfilter: string;
	value: string;
	checked?: boolean;
}

// Инициализация страницы: подгрузка данных о городах и точках доставки,
// установка их в стейт через extraReducers. Вызывается в компоненте SearchPage.jsx
// Использует асинх. запрос к серверу, вынесенный в отдельный файл SearchPageServices.js
export const initializePage = createAsyncThunk(
	"SearchPageReducer/initializePage",
	async function () {
		try {
			const SPServices = new SP_Services();
			let productsFromServer = await SPServices.loadItemsData();
			return productsFromServer;
		} catch (error) {
			throw error;
		}
	}
);

// productsFromServer, productsAfterCtgSelect и displayedProducts, favProducts - массив объектов
// данные из них используются для отрисовки продуктов в модуле _ProductList.tsx
// данные favProducts дублируются в куки, но не целиком всем объектом, а только айдишник объекта.
const SearchPageSlice = createSlice({
	name: "SearchPageSlice",
	initialState: {
		page: {
			isLoading: true,
			error: false,
		},
		productsFromServer: null,
		productsAfterCtgSelect: null,
		displayedProducts: null,
		priceFilter: {
			minBorder: 1,
			maxBorder: 100,
			selectedPrices: [1, 100],
		},
		productCard: {
			isVisible: false,
			data: {},
		},
		sortBy: "popular", // Возможные значения: "popular", "cheap", "new"
		favIsActive: false,
		favProducts: [],
		prodCatFilter: {
			categories: [
				{ value: 'Все', forFilter: "all", checked: true, text: "Все", filter: 'prodCatFilter', subfilter: 'categories'},
				{ value: "Недвижимость", forFilter: "estateFilter", checked: false, text: "Недвижимость", filter: 'prodCatFilter', subfilter: 'categories'},
				{ value: 'Ноутбук', forFilter: "laptopFilter", checked: false, text: "Ноутбуки", filter: 'prodCatFilter', subfilter: 'categories'},
				{ value: 'Фотоаппарат', forFilter: "cameraFilter", checked: false, text: "Фотоаппараты", filter: 'prodCatFilter', subfilter: 'categories'},
				{ value: 'Автомобиль', forFilter: "carFilter", checked: false, text: "Автомобили", filter: 'prodCatFilter', subfilter: 'categories'},
			],
		},
		cameraFilter: {
			cameraType: [
				{value: 'dslr', checked: false, text: 'Зеркальный', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'cameraType'},
				{value: 'digital', checked: false, text: 'Цифровой', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'cameraType'},
				{value: 'mirrorless', checked: false, text: 'Беззеркальный', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'cameraType'},
			],
			resolutionMatrix: [
				{value: '', checked: true, text: 'Любое', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
				{value: '5', checked: false, text: '5 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
				{value: '10', checked: false, text: '10 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
				{value: '15', checked: false, text: '15 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
				{value: '20', checked: false, text: '20 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
				{value: '25', checked: false, text: '25 МП', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionMatrix'},
			],
			resolutionVideo: [
				{value: '', checked: true, text: 'Любое', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
				{value: 'HD', checked: false, text: 'HD', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
				{value: 'FullHD', checked: false, text: 'Full HD', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
				{value: '4K', checked: false, text: '4K', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
				{value: '5K', checked: false, text: '5K', category: "Фотоаппарат", filter: 'cameraFilter', subfilter: 'resolutionVideo'},
			],
		},
		carFilter: {
			minimalYear: [
				{value: '2000', checked: true, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
				{value: '2005', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
				{value: '2010', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
				{value: '2015', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
				{value: '2020', checked: false, get text() {return this.value}, category: "Автомобиль", filter: 'carFilter', subfilter: 'minimalYear'},
			],
			transmission: [
				{value: '', checked: true, text: 'Любая', category: "Автомобиль", filter: 'carFilter', subfilter: 'transmission'},
				{value: 'mechanic', checked: false, text: 'Механика', category: "Автомобиль", filter: 'carFilter', subfilter: 'transmission'},
				{value: 'auto', checked: false, text: 'Автомат', category: "Автомобиль", filter: 'carFilter', subfilter: 'transmission'},
			],
			bodyType: [
				{value: 'sedan', checked: false, text: 'Седан', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
				{value: 'universal', checked: false, text: 'Универсал', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
				{value: 'hatchback', checked: false, text: 'Хэтчбэк', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
				{value: 'suv', checked: false, text: 'Внедорожник', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
				{value: 'cupe', checked: false, text: 'Купе', category: "Автомобиль", filter: 'carFilter', subfilter: 'bodyType'},
			],
		},
		laptopFilter: {
			laptopType: [
				{ value: "ultra", checked: false, text: "Ультрабук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "home", checked: false, text: "Домашний ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "gaming", checked: false, text: "Игровой ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			],
			laptopRamValue: [
				{ value: "", checked: true, text: "Любой", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
				{ value: "4", checked: false, text: "4 Гб", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
				{ value: "8", checked: false, text: "8 Гб", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
				{ value: "16", checked: false, text: "16 Гб", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopRamValue'},
			],
			laptopDiagonal: [
				{ value: "", checked: true, text: "Любая", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
				{ value: "13", checked: false, text: "13″",  category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
				{ value: "14", checked: false, text: "14″", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
				{ value: "15", checked: false, text: "15″", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
				{ value: "16", checked: false, text: "17″", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopDiagonal'},
			],
			laptopProcType: [
				{ value: "i3", checked: false, text: "Intel Core i3", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopProcType'},
				{ value: "i5", checked: false, text: "Intel Core i5", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopProcType'},
				{ value: "i7", checked: false, text: "Intel Core i7", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopProcType'},
			],
		},
		estateFilter: {
			estateType: [
				{ value: "house", checked: false, text: "Дом", category: "Недвижимость", filter: 'estateFilter', subfilter: 'estateType'},
				{ value: "flat", checked: false, text: "Квартира", category: "Недвижимость", filter: 'estateFilter', subfilter: 'estateType'},
				{ value: "apartment", checked: false, text: "Апартаменты", category: "Недвижимость", filter: 'estateFilter', subfilter: 'estateType'},
			],
			minSquare: [
				{value: '', checked: true, category: "Недвижимость", filter: 'estateFilter', subfilter: 'minSquare'}
			],
			roomsQuantity: [
				{ value: "", checked: true, text: "Любое", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
				{ value: "1", checked: false, text: "1", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
				{ value: "2", checked: false, text: "2", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
				{ value: "3", checked: false, text: "3", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
				{ value: "4", checked: false, text: "4", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
				{ value: "5+", checked: false, text: "5+", category: "Недвижимость", filter: 'estateFilter', subfilter: 'roomsQuantity'},
			],
		},	
	},
	reducers: {
		setProductsAfterCtgSelect(state, action) {
			state.productsAfterCtgSelect = action.payload;
		},
		setDisplayedProducts(state, action) {
			state.displayedProducts = action.payload;
		},
		setProductCard(state, action) {
			state.productCard.isVisible = action.payload.isVisible;
			state.productCard.data = action.payload.data;
		},
		setChosenPrices(state, action: PayloadAction<number[]>): void {
			state.priceFilter.selectedPrices = action.payload;
		},
		setPriceBorders(state, action: PayloadAction<number[]>): void {
			state.priceFilter.minBorder = action.payload[0];
			state.priceFilter.maxBorder = action.payload[1];
		},
		performFiltration(state) {
			const checkedFilters = getCheckedFilters(state);
			state.displayedProducts = filterAndSort(state, checkedFilters);
		},
		setSortType(state, action) {
			state.sortBy = action.payload;
		},
		toggleFavIsActive(state) {
			state.favIsActive = !state.favIsActive;
		},
		addToFav(state, action) {
			state.favProducts.push(action.payload);
			addToCookie("favorites", action.payload["id"]);
		},
		removeFromFav(state, action) {
			const i = state.favProducts.findIndex(
				(favProduct) => favProduct["id"] === action.payload["id"]
			);
			state.favProducts.splice(i, 1);
			removeFromCookie("favorites", action.payload["id"]);
		},
		setActiveCategory(state, action: PayloadAction<string>): void {			
			state.prodCatFilter.categories.map((cat) => {
				cat.value === action.payload ? (cat.checked = true) : (cat.checked = false);
			});
		},
		setMinSquare(state, action: PayloadAction<number>): void {
			state.estateFilter.minSquare[0].value = String(action.payload);
		},
		setUlParams(state, action: PayloadAction<filterParams>): void {
			const { type, filter, subfilter, value } = action.payload;
			const path = state[`${filter}`][`${subfilter}`];
			switch (type) {							
				case "checkbox":
					const index = path.findIndex((item) => item.value === value);
					const item = path[index];
					item.checked = !item.checked;
					break;
				case "radio":
					path.map((item) => {
						item.value === value ? (item.checked = true) : (item.checked = false);						
					});
					break;
			}
		},
		setSelectParams(state, action: PayloadAction<selectParams>): void {
			const { filter, subfilter, value } = action.payload;
			const path = state[`${filter}`][`${subfilter}`];
			path.map((item) => {
				item.value === value ? (item.checked = true) : (item.checked = false);
			});
		}
	},
	extraReducers: (builder) => {
		builder.addCase(initializePage.fulfilled, (state, action) => {
			state.productsFromServer = action.payload.products;
			state.productsAfterCtgSelect = action.payload.products;
			state.displayedProducts = action.payload.products;

			// Работа с кукисами при инициализации приложения
			// Проверяем, существует ли кука с именем "favorites"
			const cookiedFavorites = getCookie("favorites");

			if (cookiedFavorites) {
				// Кука существует, берём из неё айдишники и по ним ищем продукты
				// ставим их в стейт для отрисовки
				action.payload.products.map((product) => {
					if (cookiedFavorites.includes(product["id"])) {
						state.favProducts.push(product);
					}
				});
			} else {
				// Кука не существует, устанавливаем новую (пустой массив с датой действия сегодня + 1 день)
				const favorites = [];
				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 1);
				const favoritesString = JSON.stringify(favorites);
				document.cookie = `favorites=${encodeURIComponent(
					favoritesString
				)}; expires=${expirationDate.toUTCString()}; path=/`;
			}

			// Поиск и установка минимального и максимального значений цен
			// в выводимых на экран продуктах при инициализации приложения
			const minMaxPrices = findMinMaxPrices(state.displayedProducts);
			state.priceFilter.minBorder = minMaxPrices[0];
			state.priceFilter.maxBorder = minMaxPrices[1];
			state.priceFilter.selectedPrices = minMaxPrices;

			state.page.isLoading = false;
			state.page.error = false;
		});
		builder.addCase(initializePage.rejected, (state, action) => {
			state.page.error = true;
			// state.error = action.error.message; здесь можно получить доступ к сообщению об ошибке
		});
	},
});

export const SearchPageReducer = SearchPageSlice.reducer;
export const {
	setProductsAfterCtgSelect,
	setDisplayedProducts,
	setProductCard,
	setChosenPrices,
	setPriceBorders,
	performFiltration,
	setSortType,
	toggleFavIsActive,
	addToFav,
	removeFromFav,
	setActiveCategory, setMinSquare, setUlParams, setSelectParams
} = SearchPageSlice.actions;

export function getActiveCategory(prodCatFilter) {
	const selectedCtg = prodCatFilter['categories'].findIndex((item) => item.checked === true);
	const value = prodCatFilter['categories'][selectedCtg].value;
	return value
};

function getCheckedFilters(state) {

	// 1. Определяем интересующие нас фильтры и узнаём активную категорию
	const { prodCatFilter, cameraFilter, carFilter, laptopFilter, estateFilter } = state;
	const filters = {prodCatFilter, cameraFilter, carFilter, laptopFilter, estateFilter}
	const activeCategory = getActiveCategory(prodCatFilter);		
	
	// 2. Проходимся по всему стейту и выбираем только выбранные записи (в которых checked = true).
	let checkedItems = [];
	// 2.1 Если выбрана категория "Все", то записей никаких не будет, поэтому берём только цены
	if (activeCategory === 'Все') {
		let result = {
			category: "Все",
		}
		return result
	} 
	// 2.2 Если не "Все", то вычисляем активный фильтр в стейте и выбираем итемы с checked = true из него 
	else {
		const forFilter = prodCatFilter['categories'].find((item) => item.value === activeCategory).forFilter;
		const chosenFilter = filters[forFilter]
		Object.values(chosenFilter).forEach((filter: Record<string, any>) => {
			for (let index in filter) {
				const item = filter[index];
				if (item.checked === true) checkedItems.push(item)
			}
		});
	}

	// 3. Преобразовываем выбранные пользователем элементы фильтров в более удобный для фильтрации вид
	// filtersData в итоге будет заполнена выбранными элементами и передана дальше для фильтрации с её помощью
	// если элемент не выбран пользователем, то он имеет значение пустой строки ''
	let filtersData = [
		{category: "Недвижимость", estateType: [], minSquare: '', roomsQuantity: '' },
		{category: "Ноутбук", laptopType: [], laptopRamValue: '', laptopDiagonal: '', laptopProcType: [] },
		{category: "Фотоаппарат", cameraType: [], resolutionMatrix: '', resolutionVideo: '' },
		{category: "Автомобиль", bodyType: [], minimalYear: '', transmission: '' }
	];		
	
	// 4. Все value выбранных объектов checkedItems, относящиеся к чекбоксам, 
	// перепаковываются в массивы в соотв. категории filtersData (например estateType)
	const checkboxes = ['estateType', 'laptopType', 'laptopProcType', 'cameraType', 'bodyType']
	checkedItems.forEach(item => {
		if (checkboxes.includes(item.subfilter)) {				
			filtersData.forEach(obj => {
				if(obj.category === item.category) {
					obj[item.subfilter].push(item.value)
				} 
			})
		} 
		else {
			// 5. Заполняются остальные свойства объекта filtersData (кроме prices, его добавим ниже)
			filtersData.forEach(elem => {
				if(elem.category === item.category) {
					elem[item.subfilter] = item.value;
				}
			})
		}			
	})

	// 6. выбираем в result только тот элемент filtersData, чья категория сейчас активна. 
	// result - это объект
	let result = filtersData.filter(obj => obj.category === activeCategory)[0]

	// 7. Переводим названия свойств объекта на "язык" базы данных
	// Создаем новый объект, переименовывая ключи на основе dbKeysAdapter (translators(adapters).tsx)
	const renamedResult = {};
	for (const key in result) {			
		const adaptedKey = dbKeysAdapter('toDB', key);
		renamedResult[adaptedKey] = result[key];
	}	
	// 8. Всё готово, возвращаем renamedResult;
	return renamedResult
}