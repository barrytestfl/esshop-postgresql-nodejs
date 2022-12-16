import {IsString,IsNumber} from 'class-validator';
export default class GroupsDTO{
  @IsNumber()
  public GroupId:number;
  @IsString()
  public GroupName:string;
  @IsString()
  public GroupImage:string;
  @IsString()
  public MetaKeyword:string;
  @IsString()
  public MetaDescription?:string;
  @IsNumber()
  public Priority?:number;
  @IsNumber()
  public ParentId?:number 
}