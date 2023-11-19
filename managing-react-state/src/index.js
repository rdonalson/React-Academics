import React from "react";
//import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./cartContext";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ErrorBoundary>
        <BrowserRouter>
            <CartProvider>
            <App />
            </CartProvider>
        </BrowserRouter>
    </ErrorBoundary>
);

// ReactDOM.render(
//     <ErrorBoundary>
//         <BrowserRouter>
//             <CartProvider>
//             <App />
//             </CartProvider>
//         </BrowserRouter>
//     </ErrorBoundary>
//     , document.getElementById("root")
// );

