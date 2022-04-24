import { AxiosResponse } from 'axios';
import { HelloWorldInterface } from '../types';
import { API_URL } from '../utils/constants/constants';
import api from './api';
import apiJson from './apiJson';

const getHelloWorld = () => {
    return api.get(`${API_URL}/helloworld.json`).then((response: AxiosResponse<HelloWorldInterface>) => {
        return Promise.resolve(response.data as HelloWorldInterface);
    });
};

const postHelloWorld = (testBody: any) => {
    return apiJson
        .post('/posts', testBody)
        .then((response) => {
            console.log('🚀 ~ file: helloworld.service.ts ~ line 17 ~ .then ~ response', response);
            return Promise.resolve(response);
        })
        .catch(() => Promise.reject('FAKEERROR'));
};

export default { getHelloWorld, postHelloWorld };
