import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { QueryClientProvider, QueryClient } from "react-query";
import reducerApp from "./app/reducers";
import App from "./routes/router";
import { Persian } from "./components/crud/components/ValidateMessages";
import reportWebVitals from "./reportWebVitals";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducerApp, composeEnhancers(applyMiddleware(thunk)));

const persianAppConfig = {
  form: { validateMessages: Persian },
  locale: fa_IR,
};

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider direction="rtl" {...persianAppConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
