import { render, cleanup, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { HelloWorld, sumFunction } from './HelloWorld';
import { getByText } from '@testing-library/dom';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../api/counter.service';
import { Provider } from 'react-redux';

afterEach(cleanup);

let container: HTMLElement;

describe('HelloWorld component suites tests', () => {
    const mockStore = configureStore({
        reducer: {
            counter: counterReducer,
        },
    });

    beforeEach(() => {
        const component = render(
            <Provider store={mockStore}>
                <HelloWorld name="Jean" title="Hello world" description="Lorem ipsum" />
            </Provider>
        );
        container = component.container;
    });
    test('Verify displayed', () => {
        expect(sumFunction(1, 2)).toEqual(3);
        expect(container).toBeInTheDocument();
        expect(getByText(container, 'Lorem ipsum')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Hello world, Jean !/i })).toBeInTheDocument();
    });
});
