export interface Logs {
    id?: number | string;
    turn?: number;
    person: string;
    mensage: string;
    // data?: Date;
    style: string;
}

export interface RootObject {
    logs: Logs[];
}