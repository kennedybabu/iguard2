export interface Shift {
    account: string,
    description: string,
    id: number,
    name: string,
    premise: number,
    end: string,
    start: string,
    status: string,
    guard: number,
    beacons: Array<number>,
    shift_start: string, 
    shift_end: string
}
