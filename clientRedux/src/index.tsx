import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { HelloWorldPage } from './pages/HelloWorldPage';
import store from './store';

const App = (): JSX.Element => {
    return <HelloWorldPage />;
};

ReactDOM.render(
    <Provider store={store}>
         <App />
    </Provider>,
    document.getElementById('app')
);