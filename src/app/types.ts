export type Task = {
    title: string;
    description: string;
    status: number;
    userId: number;
    dueDate: string;
}


export type UserLogin = {
    username: string;
    password: string;
}

export type User = {
    userId: string;
    userName: string;
}