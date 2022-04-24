import axios from 'axios';
import { JSON_PLACE_HOLDER_API } from '../utils/constants/constants';

const instanceJsonPlaceHolder = axios.create({
    baseURL: JSON_PLACE_HOLDER_API,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});
export default instanceJsonPlaceHolder;
