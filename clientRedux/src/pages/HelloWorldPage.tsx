import { HelloWorld } from '../components/HelloWorld/HelloWorld';
import HelloWorldService from '../api/helloworld.service';
import TodoService from '../api/todos.service';
import { HelloWorldInterface, ITodo } from '../types';
import { useMutation, useQuery } from 'react-query';
import { TodoListView } from '../components/TodoListView/TodoListView';
import { Alert, Button, Typography } from '@mui/material';

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
            <Typography variant="h3" gutterBottom component="div">
                TODOs JSON placeholder
            </Typography>
            {mutation.isLoading ? (
                'Loading post...'
            ) : (
                <>
                    <Typography variant="h4" gutterBottom component="div">
                        List Todos
                    </Typography>
                    <TodoListView todos={todos ? todos : []} />
                    <Typography variant="h4" gutterBottom component="div">
                        POST todo
                    </Typography>
                    {mutation.isError ? <Alert severity="error">An error occurred: {mutation.error}</Alert> : null}

                    {mutation.isSuccess ? <Alert severity="success">Todo added!</Alert> : null}
                    <Button
                        variant="contained"
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                            e.preventDefault();
                            mutation.mutate({
                                title: 'foo',
                                body: 'bar',
                                userId: 1,
                                id: 1,
                            });
                        }}
                    >
                        Create todo
                    </Button>
                </>
            )}
        </>
    );
};
