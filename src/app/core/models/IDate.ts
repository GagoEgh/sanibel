export class SelectDate{
    start!:string;
    end!:string;
    constructor(date:any){
        this.start = date.start;
        this.end = date.end
    }
}