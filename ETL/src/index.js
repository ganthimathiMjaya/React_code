import AppRoutes from './routes/AppRoutes';
import store from './redux/store';
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;

// Exporting components for external use
export { default as Connection } from "./components/MainComponents/Connection";
export { default as DataPreview } from "./components/MainComponents/DataPreview";
export { default as DataRefresh } from "./components/MainComponents/DataRefresh";
export { default as DataSource } from "./components/MainComponents/DataSource";
export { default as DataSourceList } from "./components/MainComponents/DataSourceList";
export { default as FieldMapping } from "./components/MainComponents/FieldMapping";

// Exporting Redux store
export { default as store } from "./redux/store";
