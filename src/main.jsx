import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import serviceWorkerRegistration from "./serviceWorkerRegistration.js";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service worker registered:", registration);
            })
            .catch((error) => {
                console.log("Service worker registration failed:", error);
            });
    });
}

createRoot(document.getElementById("root")).render(<App />);
