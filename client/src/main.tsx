import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Function to initialize application services
function initializeApp() {
  // Initialize any global libraries or services here
  console.log("Application initialized");
}

// Initialize services
initializeApp();

createRoot(document.getElementById("root")!).render(<App />);
