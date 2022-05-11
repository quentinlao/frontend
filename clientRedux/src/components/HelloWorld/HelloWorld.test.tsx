import { render, cleanup, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { HelloWorld, sumFunction } from './HelloWorld';
import { fireEvent, getByText } from '@testing-library/dom';
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
    test('Verify basic hello world displayed', () => {
        expect(sumFunction(1, 2)).toEqual(3);
        expect(container).toBeInTheDocument();
        expect(getByText(container, 'Lorem ipsum')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Hello world, Jean !/i })).toBeInTheDocument();
    });

    test('Verify counter', () => {
        expect(container).toBeInTheDocument();

        const incrementButton = screen.getByRole('button', { name: 'Increment value' });
        const decrementButton = screen.getByRole('button', { name: 'Decrement value' });
        const incrementFiftyButton = screen.getByRole('button', { name: 'Increment 50' });

        // initial value
        expect(screen.getByRole('heading', { name: /Counter 0/i })).toBeInTheDocument();
        // increment
        fireEvent.click(incrementButton);
        expect(screen.getByRole('heading', { name: /Counter 1/i })).toBeInTheDocument();
        // increment by 50
        fireEvent.click(incrementFiftyButton);
        expect(screen.getByRole('heading', { name: /Counter 51/i })).toBeInTheDocument();
        // decrement by 1
        fireEvent.click(decrementButton);
        expect(screen.getByRole('heading', { name: /Counter 50/i })).toBeInTheDocument();
    });
});
