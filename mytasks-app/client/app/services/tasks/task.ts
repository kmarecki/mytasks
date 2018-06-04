import { TaskState } from "./task-state";

export class Task {
    taskId: number;

    taskName: string;

    taskState: TaskState;

    created: Date;

    closed: Date;

    description: string;

    plannedHours: number;

    actualHours: number;
}