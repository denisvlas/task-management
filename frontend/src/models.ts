export interface Todo{
    id:number;
    title:string;
    status:TodoStatus;
    description?:string;
    comment?:string;
    user?:string;
}

export interface User{
    id:number;
    username:string;
}

export interface ProjectType{
    projects_id:number;
    name:string;
    img:string;
}

export enum TodoStatusType{
    
    incompleted='to do',
    done='done',
    progress='progress',

}

export type TodoStatus=TodoStatusType.done|TodoStatusType.incompleted|TodoStatusType.progress

