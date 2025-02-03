export interface Todo {
  id: number;
  title: string;
  status: TodoStatusType;
  description?: string;
  comment?: string;
  user_id: number | null;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface ProjectType {
  project_id: number; // Changed from project_id to project_id
  name: string;
  img: string;
}

export enum TodoStatusType {
  incompleted = "to-do",
  done = "done",
  progress = "progress",
}

export type TodoStatus =
  | TodoStatusType.done
  | TodoStatusType.incompleted
  | TodoStatusType.progress;
