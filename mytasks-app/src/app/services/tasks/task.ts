import { TaskState } from "./task-state";

export class Task {
    taskId: number;

    taskName: string;

    state: TaskState;

    created: Date;

    closed: Date;

    description: string;

    plannedHours: number;

    actualHours: number;

    projectId: number;
}

export interface TaskView {
    taskId: number;

    taskName: string;

    state: TaskState;

    created: Date;

    plannedHours: number;

    actualHours: number;

    projectName: number;
}