export interface TaskItem {
    id: number;
    title: string;
    group: string;
    description: string;
    date: Date;
    IsComplete: boolean | false,
    IsDeleted: boolean | false,
    selected: boolean | false
}
