import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
	activeFilter: {
		'all': boolean,
		'estate': boolean,
		'laptops': boolean,
		'camera': boolean,
		'cars': boolean,
	},
	cameraFilter: {
		cameraType: string, // possible values (string): mirror, digital, mirrorless
		resolutionMatrix: string, // possible values (string): 1mp, 3mp, 5mp, 7mp, 10mp
		resolutionVideo: string, // possible values (string): any, HD, Full HD, 4k, 5k
	},
	carFilter: {
		minimalYear: string, // possible values (string): 1900, 1940, 1960, 1980, 2000
		transmission: string, // possible values (string): any, mechanical, auto
		bodyType: string, // possible values (string): sedan, universal, hatchback, jeep, cupe
	},
	laptopFilter: {
		laptopType: string, // possible values (string): ultra, home, gaming
		ramValue: string,  // possible values (string): any, 4gb, 8gb, 16gb
		screenDiagonal: number,  // possible values (number): 13, 14, 15, 17
		processorType: string,  // possible values (string): i3, i5, i7
	},
	estateFilter: {
		estateType: string, // possible values (string): house, flat, apartments
		minSquare: number, // possible values (number): any number
		roomsQuantity: string, // possible values (string): any, 1, 2, 3, 4, 5+
	},
	rangeFilter: {
		minPrice: number,
		maxPrice: number,
	},
}

const initialState: FiltersState = {
	activeFilter: {
		'all': true,
		'estate': false,
		'laptops': false,
		'camera': false,
		'cars': false,
	},
	cameraFilter: {
		cameraType: '', // possible values: null, (string): mirror, digital, mirrorless
		resolutionMatrix: "1mp", // possible values (string): 1mp, 3mp, 5mp, 7mp, 10mp
		resolutionVideo: "any", // possible values (string): any, HD, Full HD, 4k, 5k
	},
	carFilter: {
		minimalYear: "1900", // possible values (string): 1900, 1940, 1960, 1980, 2000
		transmission: "any", // possible values (string): any, mechanical, auto
		bodyType: "sedan", // possible values (string): sedan, universal, hatchback, jeep, cupe
	},
	laptopFilter: {
		laptopType: '', // possible values: (string): ultra, home, gaming
		ramValue: "any", // possible values (string): any, 4gb, 8gb, 16gb
		screenDiagonal: 13, // possible values (number): 13, 14, 15, 17
		processorType: "i3", // possible values (string): i3, i5, i7
	},
	estateFilter: {
		estateType: '', // possible values: null, (string): house, flat, apartments
		minSquare: 0, // possible values (number): any number
		roomsQuantity: '', // possible values (string): any, 1, 2, 3, 4, 5+
	},
	rangeFilter: {
		minPrice: 0,
		maxPrice: 0,
	},
}

const FiltersSlice = createSlice({
	name: "FiltersSlice",
	initialState,	
	reducers: {
		setActiveFilter(state, action: PayloadAction<string>): void {			
			for (let key in state.activeFilter) {
				if (key === action.payload) {
					state.activeFilter[`${key}`] = true;
				} else state.activeFilter[`${key}`] = false;
			}
		},		
	},
	extraReducers: {},
});

export const FiltersReducer = FiltersSlice.reducer;
export const {setActiveFilter} = FiltersSlice.actions;


// initialState: {
	// 	activeFilter: {
	// 		'all': true,
	// 		'estate': false,
	// 		'laptops': false,
	// 		'camera': false,
	// 		'cars': false,
	// 	},
	// 	CameraFilter: {
	// 		cameraType: '', // possible values: null, (string): mirror, digital, mirrorless
	// 		resolutionMatrix: "1mp", // possible values (string): 1mp, 3mp, 5mp, 7mp, 10mp
	// 		resolutionVideo: "any", // possible values (string): any, HD, Full HD, 4k, 5k
	// 	},
	// 	CarFilter: {
	// 		minimalYear: "1900", // possible values (string): 1900, 1940, 1960, 1980, 2000
	// 		transmission: "any", // possible values (string): any, mechanical, auto
	// 		bodyType: "sedan", // possible values (string): sedan, universal, hatchback, jeep, cupe
	// 	},
	// 	LaptopFilter: {
	// 		laptopType: null, // possible values (string): ultra, home, gaming
	// 		ramValue: "any", // possible values (string): any, 4gb, 8gb, 16gb
	// 		screenDiagonal: 13, // possible values (number): 13, 14, 15, 17
	// 		processorType: "i3", // possible values (string): i3, i5, i7
	// 	},
	// 	EstateFilter: {
	// 		estateType: null, // possible values: null, (string): house, flat, apartments
	// 		minSquare: 0, // possible values (number): any number
	// 		roomsQuantity: "any", // possible values (string): any, 1, 2, 3, 4, 5+
	// 	},
	// 	RangeFilter: {
	// 		minPrice: 0,
	// 		maxPrice: 0,
	// 	},
	// },

	// initialState: {
	// 	activeFilter: {
	// 		'all': true,
	// 		'estate': false,
	// 		'laptops': false,
	// 		'camera': false,
	// 		'cars': false,
	// 	},
	// 	CameraFilter: {
	// 		cameraType: '',
	// 		resolutionMatrix: "1mp",
	// 		resolutionVideo: "any",
	// 	}, 	
	// },