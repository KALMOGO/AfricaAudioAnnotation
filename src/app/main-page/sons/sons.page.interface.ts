export interface IAudioList{
    id?:number,
    language: string,
    number:string,
    path:string,
    numAnnotate:number,
    annotation:{id?:number,emotion:{emoji: string, id:number,name: string}}
}

export interface IEmotion{
  emoji: string, id?:number,name: string
}

export interface IAnnotation{
  id?:number,
  emotion:number,
  user:number,
  audio:number,
}
