export interface IBooking {
     dates?: Date[]|null,
    startDate:string,
    endDate: string,
    mainGuest?: IGuest,
    guests?:IGuest[]
}

interface IGuest {
    fullName?: string,
    email?: string
}