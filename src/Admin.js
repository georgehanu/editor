import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Admin from "./workspaces/Admin/Admin";

const startAdmin = docElement => {
  ReactDOM.render(
    <AppContainer>
      <Admin />
    </AppContainer>,
    document.getElementById(docElement)
  );
};

export default startAdmin;
