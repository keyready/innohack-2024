export interface ServerUser {
    id: string;

    tg_username: string;
    mail: string;
    password: string;

    image_id: string;

    first_name: string;
    last_name: string;
    middle_name: string;
    dob: Date;

    communication_method: string;
    position: string;
    company: string;

    username: string;
    city: string;
    confirmed: boolean;
    country: string;
    language: string;
    messenger: string;
    nationality: string;
    profession: string;
    resident: boolean;
}

export type User = Partial<ServerUser>;
