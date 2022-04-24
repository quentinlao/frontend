import { useState, useEffect } from 'react';
import { HelloWorld } from '../components/HelloWorld/HelloWorld';
import HelloWorldService from '../api/helloworld.service';
import { HelloWorldInterface } from '../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const HelloWorldPage = (): JSX.Element => {
    const [getResult, setGetResult] = useState<string | null>(null);

    // Access the client
    const queryClient = useQueryClient();
    // Queries
    const { isLoading, isError, data, error } = useQuery<HelloWorldInterface, Error>('todos', () =>
        HelloWorldService.getHelloWorld()
    );
    // Mutations
    const mutation = useMutation((data: { title: string; body: string; userId: number }) =>
        HelloWorldService.postHelloWorld(data)
    );

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <>
            <HelloWorld
                name="Jean"
                title={data ? data.title : 'titre'}
                description={data ? data.description : 'description'}
            />
            {mutation.isLoading ? (
                'Loading post...'
            ) : (
                <>
                    {mutation.isError ? <div>An error occurred: {mutation.error}</div> : null}

                    {mutation.isSuccess ? <div>Todo added!</div> : null}

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            mutation.mutate({
                                title: 'foo',
                                body: 'bar',
                                userId: 1,
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
