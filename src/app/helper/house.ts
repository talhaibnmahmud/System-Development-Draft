export interface House {
    id: number;
    owner: number;
    title: string;
    address: string;
    price: number;
    type: string;
    area: number;
    beds: number;
    baths: number;
    kitchen: number;
    drawing: number;
    dining: number;
    parking_space: number;
    elevators: number;
    balcony: boolean;
    electricity_backup: boolean;
    service_elevator: boolean;
    description: string;
    division: number;
    district: number;
    created: Date;
}
