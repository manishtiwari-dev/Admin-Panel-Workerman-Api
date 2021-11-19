import axios, { AxiosResponse } from "axios";
import { LoginInfo } from "../models/login.interface";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    timeout: 15000,
});
const responseBody = (response: AxiosResponse<any>) => response.data;
const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: any) =>
        instance.post(url, body).then(responseBody),
};
export const LoginApi = {
    getAPost: (id: number) => requests.get(`posts/${id}`),
    doLogin: (info: LoginInfo) => requests.post("api/login", info),
};
