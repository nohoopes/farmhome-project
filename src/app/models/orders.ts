export class Order {
    id: number = 0;
    farmer? : any;
    fruit? : any;
    merchant? : any; 
    amount?:number =0;
    price?:number =0;
    transport?:boolean = true;
    date?:string = "";
    status?:any;
    dealAmount?:any;
    dealPrice?:any;
    declineReason?:any;
  }