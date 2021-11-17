import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ThemeProvider from "./redux/providers/theme-provider";
import PersistProvider from "./redux/providers/persist-provider";
import { store } from "./redux/store";
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <PersistProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </PersistProvider>
    </Provider>,
    document.getElementById("root")
);
