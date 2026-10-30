import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App.jsx";
import { store } from "./store.ts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);
// const rootElement = document.getElementById("root");
// if (rootElement.hasChildNodes()) {
// 	ReactDOM.hydrate(
// 		<Provider store={store}>
// 			<App />
// 		</Provider>,
// 		rootElement
// 	);
// } else {
// 	ReactDOM.render(
// 		<Provider store={store}>
// 			<App />
// 		</Provider>,
// 		rootElement
// 	);
// }
