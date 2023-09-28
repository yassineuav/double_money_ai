export interface BalanceType {
    id: number;
    uid?: string;
    target: string;
    current?: string;
    date?:string;
    day?:string;
    check?:string
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
