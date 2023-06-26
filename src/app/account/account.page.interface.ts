export interface ILanguage{
  id?:number,
  language:string
}

export interface ICreateAccount{
  id?:number,
  email:string ,
  username: string,
  first_name:string ,
  job:string ,
  gender:string ,
  last_name:string ,
  language: number,
  password:string
}
