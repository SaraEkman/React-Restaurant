import { User } from './User';
export interface ICreateReserve {
    restaurantId: string;
    date: string;
    time: String;
    numberOfGuests: number;
    customer: User;
} 