import { createSlice } from "@reduxjs/toolkit";

const Filters_Slice = createSlice({
	name: 'FiltersSlice',
	initialState: {
		CameraFilter: {
			isActive: false,
			cameraType: null, // possible values: null, (string): mirror, digital, mirrorless
			resolutionMatrix: '1mp', // possible values (string): 1mp, 3mp, 5mp, 7mp, 10mp
			resolutionVideo: 'any', // possible values (string): any, HD, Full HD, 4k, 5k
		},
		CarFilter: {
			isActive: false,
			minimalYear: '1900', // possible values (string): 1900, 1940, 1960, 1980, 2000
			transmission: 'any', // possible values (string): any, mechanical, auto
			bodyType: 'sedan', // possible values (string): sedan, universal, hatchback, jeep, cupe
		},
		LaptopFilter: {
			isActive: false,
			laptopType: null, // possible values: null, (string): ultra, home, gaming
			ramValue: 'any', // possible values (string): any, 4gb, 8gb, 16gb
			screenDiagonal: 13, // possible values (number): 13, 14, 15, 17
			processorType: 'i3', // possible values (string): i3, i5, i7
		},
		EstateFilter: {
			isActive: false,
			estateType: null, // possible values: null, (string): house, flat, apartments
			minSquare: 0, // possible values: any number
			roomsQuantity: 'any' // possible values: any, 1, 2, 3, 4, 5+
		},
		RangeFilter: {
			isActive: true, // always true, shouldnt be disabled
			minPrice: 0,
			maxPrice: 0
		}		
	},
	reducers: {

	},
	extraReducers: {
		
	}

})

export const Filters_Reducer = Filters_Slice.reducer;
// export const {} = SP_Slice.actions;