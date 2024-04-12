export interface TodoModel {

id:number;
tittle:string;
completed:boolean;
editing?:boolean;
}

export type FilterType ='all' | 'active'|'completed';