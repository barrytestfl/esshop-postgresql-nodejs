import { Type } from 'class-transformer';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export default class ProductsDTO{
    @IsNumber()
    @Type((t)=>Number)
    public ProductId:number;
    @IsString()
    public ProductName:string;
    @IsNumber()
    @Type((t)=>Number)
    public GroupId:number;
    @IsNumber()
    @Type((t)=>Number)
    public BrandId:number;
    @IsString()
    public UrlCode:string;
    @IsString()
    public AliasProductName:string;
    @IsString()
    public Reference:string;
    @IsBoolean()
    @Type((t)=>Boolean)
    public IsActive:boolean;
    @IsString()
    public Description:string;
    //@IsArray()
    public Strengths?:[string];
    //@IsArray()
    public Weaknesses?:[string];
    //@IsArray()
    public Colors?:[string];
    @IsNumber()
    @Type((t)=>Number)
    public Weight:number;
    public Size?:{Width:number;Height:number};
    @IsString()
    public MetaTitle:string;
    @IsNumber()
    @Type((t)=>Number)
    public Price:number;
    @IsNumber()
    @Type((t)=>Number)
    public FinalPrice:number=0;
    @IsNumber()
    @Type((t)=>Number)
    public ProfitPercent:number=0;
    @IsString()
    public MetaKeyword:string;
    @IsString()
    public MetaDescription:string;
    @IsString()
    public Garranty:string;
    @IsString()
    public ProductVideo:string;
    @IsOptional()
    public Images?:[string];
    @IsNumber()
    @Type((t)=>Number)
    public InStock:number=0;
    @IsNumber()
    @Type((t)=>Number)
    public OrderQuantityLimit:number=1;
    @IsString()
    public Status:string;    
    @IsString()
    public ProductTypeName:string;
}