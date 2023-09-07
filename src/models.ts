export interface Todo{
    id:number;
    title:string;
    status:TodoStatus;
}

export enum TodoStatusType{
    
    incompleted='to do',
    done='done',
    progress='progress',

}

export type TodoStatus=TodoStatusType.done|TodoStatusType.incompleted|TodoStatusType.progress

