import { HelloWorld } from '../components/HelloWorld/HelloWorld';
import HelloWorldService from '../api/helloworld.service';
import TodoService from '../api/todos.service';
import { HelloWorldInterface, ITodo } from '../types';
import { useMutation, useQuery } from 'react-query';
import { TodoListView } from '../components/TodoListView/TodoListView';

export const HelloWorldPage = (): JSX.Element => {
    // Queries GET data local
    const {
        isLoading: isLoadingHW,
        isError: isErrorHW,
        data: dataHW,
        error: errorHW,
    } = useQuery<HelloWorldInterface, Error>('helloworld', () => HelloWorldService.getHelloWorld());

    // Queries GET TODOs
    const {
        isLoading: isLoadingTodos,
        isError: isErrorTodos,
        data: todos,
        error: errorTodos,
    } = useQuery<ITodo[], Error>('todos', async () => TodoService.getDatasJsonPlaceholder());
    // Mutations POST TODO
    const mutation = useMutation((data: ITodo) => TodoService.postHelloWorld(data));

    if (isLoadingHW || isLoadingTodos) {
        return <span>Loading...</span>;
    }
    if (isErrorHW) {
        return <span>Error: {errorHW.message}</span>;
    }
    return (
        <>
            <HelloWorld
                name="Jean"
                title={dataHW ? dataHW.title : 'titre'}
                description={dataHW ? dataHW.description : 'description'}
            />
            <hr />
            <h2>TODOs JSON placeholder</h2>
            {mutation.isLoading ? (
                'Loading post...'
            ) : (
                <>
                    <h3>List Todos</h3>
                    <TodoListView todos={todos ? todos : []} />
                    <h3>POST todo</h3>
                    {mutation.isError ? <div>An error occurred: {mutation.error}</div> : null}

                    {mutation.isSuccess ? <div>Todo added!</div> : null}

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            mutation.mutate({
                                title: 'foo',
                                body: 'bar',
                                userId: 1,
                                id: 1,
                            });
                        }}
                    >
                        Create Todo
                    </button>
                </>
            )}
        </>
    );
};
