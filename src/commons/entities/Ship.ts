export interface ClosestSchedule {
    id: number;
    arrival: Date;
    departure: Date;
}

export interface Ship {
    id: number;
    name: string;
    shipOwnerName: string;
    closestSchedule: ClosestSchedule;
}
