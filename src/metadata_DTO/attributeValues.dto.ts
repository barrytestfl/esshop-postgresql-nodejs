import { Type } from 'class-transformer';
import { IsString,IsNumber} from 'class-validator'

export default class AttributeValuesDTO{
    @IsNumber()
    @Type((t)=>Number)
    public AttributeValueId:number;
    @IsNumber()
    @Type((t)=>Number)
    public AttrbuteId:number;
    @IsString()
    public Value: string; 
}