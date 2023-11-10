import { TaskItem } from "./task.model";

export interface listGroup {
    group: string;
    tasks: [TaskItem];
}
