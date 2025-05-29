export interface LiteRoom {
    id: string,
    roomNumber: string,
    type: string,
    floor: number
}

export interface Room {
    id: string,
    roomNumber: string,
    type: string,
    exposure: string,
    floor: number,
    bedsCount: number,
    hasAc: boolean,
    pricePerNight: number
}