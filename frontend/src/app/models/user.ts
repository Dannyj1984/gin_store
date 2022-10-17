import { Basket } from "./basket";

export interface User {
    email: string;
    firstName: string;
    surname: string;
    token: string;
    basket?:Basket;
    roles?: string[];
}