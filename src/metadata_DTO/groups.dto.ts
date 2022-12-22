import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';
export default class GroupsDTO{
  @IsNumber()
  @Type((t)=>Number)
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
  @Type((t)=>Number)
  @IsOptional()
  public Priority?:number;
  @IsOptional()
  @Type((t)=>Number)
  @IsNumber()
  public ParentId?:number 
}