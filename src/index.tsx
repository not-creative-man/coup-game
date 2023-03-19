import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setupStore } from './store';
import { Provider } from 'react-redux';

const reduxStore = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
);
