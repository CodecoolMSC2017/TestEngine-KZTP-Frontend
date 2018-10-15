import { User } from "./user";

export class Test{
    id: number;
    title: string;
    description: string;
    path: string;
    price: number;
    maxPoints: number;
    creator: User;
    enabled: boolean;
    type: string;
    poolPoints: Object[];
    testRatings: Object[];
    usersTests: Object[];
}