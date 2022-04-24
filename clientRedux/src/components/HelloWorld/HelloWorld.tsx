import './HelloWorld.css';
import logo from '../../assets/react.svg';
import { HelloWorldInterface } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { decrement, increment, incrementByAmount } from '../../api/counter.service';

const HELLO_WORLD_ID = 'helloWorldId';
const DESCRIPTION_ID = 'descriptionId';
interface HelloWorldProps extends HelloWorldInterface {
    name: string;
}

export const HelloWorld = (props: HelloWorldProps): JSX.Element => {
    const count = useAppSelector((state) => state.counter.value);
    console.log('🚀 ~ file: HelloWorld.tsx ~ line 15 ~ count', count);
    const dispatch = useAppDispatch();

    const { name, title, description } = props;
    return (
        <div id={HELLO_WORLD_ID} className="helloWorldContainer">
            <img src={logo} height="100" />
            <h1>
                {title}, {name} !
            </h1>
            <h2>Sum test {sumFunction(1, 2)}</h2>
            <p data-test-id={DESCRIPTION_ID}>{description}</p>
            <h2>
                Counter <span>{count}</span>
            </h2>
            <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                Increment
            </button>
            <span>/</span>
            <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                Decrement
            </button>
            <button aria-label="Decrement value" onClick={() => dispatch(incrementByAmount(50))}>
                +50
            </button>
        </div>
    );
};

export const sumFunction = (a: number, b: number): number => a + b;
