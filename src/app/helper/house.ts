export interface House {
    id: number;
    owner: boolean;
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
    division: number | string;
    district: number | string;
    created: Date;
}
