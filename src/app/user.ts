export class User {
    id: number;
    username: string;
    email: string;
    rank: string;
    tests: Object[]=[];
    userTests: Object[]=[];
    enabled: boolean;
    authorities: String[];
}