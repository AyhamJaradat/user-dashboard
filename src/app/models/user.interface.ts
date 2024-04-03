export interface User {
    id: number,
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
}
export interface UsersResponse {
    data: User[];
    page: number;
    per_page:number;
    total: number;
    total_pages:number;
}

