//********************This part is for fabric js*****************************

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./AppRF";
// import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();

import startAdmin from "./Admin";

startAdmin("root");

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
