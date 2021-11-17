import axios, { AxiosResponse } from "axios";
import { LoginInfo } from "../models/login.interface";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 15000,
});
const responseBody = (response: AxiosResponse) => response.data;
const requests = {
    post: (url: string, body: {}) =>
        instance.post(url, body).then(responseBody),
};
export const LoginApi = {
    doLogin: (info: LoginInfo): Promise<LoginInfo> =>
        requests.post("api/login", info),
};
