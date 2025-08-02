import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import 'sweetalert2/src/sweetalert2.scss'
import StoreProvider from "./context/storeContext";


createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <StoreProvider>
    <Toaster duration={1000} position="top-center" />
    </StoreProvider>
    <App />
  </Provider>
);
