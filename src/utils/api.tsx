import axios, {AxiosResponse} from 'axios';
import {UserDataResponse} from '../interfaces/UserData';

// tipo para la variable api
type Api = {
  get: <T>(url: string) => Promise<AxiosResponse<T> | undefined>;
  post: <T>(
    url: string,
    data: T,
  ) => Promise<AxiosResponse<UserDataResponse> | undefined>;
};
const headers = {
  headers: {
    'app-id': '61329de7a226157cb968f31d',
  },
};

export const api: Api = {
  get: async (url: string): Promise<AxiosResponse<any> | undefined> => {
    let response;
    try {
      response = await axios.get(url, headers);
    } catch (error) {
      console.log('error in get request', error);
    }

    return response?.data;
  },
  // post request
  post: async (
    url: string,
    data: any,
  ): Promise<AxiosResponse<UserDataResponse> | undefined> => {
    let response;
    try {
      response = await axios.post(url, data, headers);
    } catch (error) {
      console.log('error in post', error);
    }
    return response;
  },
};
