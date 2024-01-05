import React from 'react'

// import "@css/style.css"
import "./visuals/scss/main.scss"

import { SearchPage } from "./pages/search_page/SearchPage"

export const App = () => {
  return (
    <React.Fragment>
      <SearchPage/>
    </React.Fragment>
  );
};
