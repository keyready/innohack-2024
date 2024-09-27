export interface Project {
    id: number;
    name: string;
    description: string;
    commitsId: number[];
    createdAt: Date;

    private: boolean;
}
