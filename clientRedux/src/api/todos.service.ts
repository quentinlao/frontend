import { AxiosResponse } from 'axios';
import { ITodo } from 'src/types';
import apiJson from './apiJson';

const postHelloWorld = (testBody: any) => {
    return apiJson
        .post('/posts', testBody)
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch(() => Promise.reject('FAKEERROR'));
};

const getDatasJsonPlaceholder = async () => {
    const response = await apiJson.get<ITodo[]>('/posts');
    return response.data;
};

export default { postHelloWorld, getDatasJsonPlaceholder };
