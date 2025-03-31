import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'

//For msw trigger
if (process.env.NODE_ENV === "development") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start(); // Remove this line when stop using MSW
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
