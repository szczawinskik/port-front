export interface Schedule {
    id: number;
    arrival: Date;
    departure: Date;
    arrivalSent?: boolean;
    departureSent?: boolean;
}

export interface Ship {
    id: number;
    name: string;
    shipOwnerName: string;
    closestSchedule: Schedule;
    schedules: Schedule[];
}
