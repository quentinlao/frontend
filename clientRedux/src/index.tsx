import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { HelloWorldPage } from './pages/HelloWorldPage';
import store from './store';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const App = (): JSX.Element => {
    return (
        <QueryClientProvider client={queryClient}>
            <HelloWorldPage />
        </QueryClientProvider>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
