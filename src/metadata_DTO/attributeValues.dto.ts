import { IsString,IsNumber} from 'class-validator'

export default class AttributeValuesDTO{
    @IsNumber()
    public AttributeValueId:number;
    @IsNumber()
    public AttrbuteId:number;
    @IsString()
    public Value: string; 
}