export interface BalanceType {
    id: number;
    target: string;
    current?: string;
    date?:string;
    day?:string;
}


export interface MonthsType {
    id:string;
    month: string;
    active:boolean;
}

export interface MessageType {
    id:number;
    title: string;
    message: string;
    isSuccess:boolean;
}
