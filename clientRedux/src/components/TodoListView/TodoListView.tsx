import { ITodo } from '../../types';

interface ITodoListView {
    todos: ITodo[];
}

export const TodoListView = (props: ITodoListView) => {
    return (
        <ul>
            {props.todos.slice(0, 5).map((todo: ITodo) => {
                return (
                    <>
                        <li>Title : {todo.title}</li>
                        <span>Description : {todo.body}</span>
                    </>
                );
            })}
        </ul>
    );
};
