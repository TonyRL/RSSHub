export interface Subject {
    id: string;
    label: string;
    number: number;
    children: Subject[];
    size: number;
    displaysize: number;
    color: string;
}
