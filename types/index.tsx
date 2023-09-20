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
