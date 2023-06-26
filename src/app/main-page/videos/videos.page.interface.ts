export interface IAnnotationVideo{
    id?:number,
    emotion:number,
    user:number,
    video:number,
  }

export interface IVideoList{
  id?:number,
  language: string,
  number:string,
  path:string,
  numAnnotate:number,
  annotation:{id?:number,emotion:{emoji: string, id:number,name: string}}
}
