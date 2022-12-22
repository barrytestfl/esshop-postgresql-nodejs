import { IsArray } from "class-validator";
import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
@Entity()
class Product{
    @PrimaryGeneratedColumn()
    public ProductId:number;
    @Column()
    public ProductName:string;
    @Column()
    public GroupId:number;
    @Column()
    public BrandId:number;
    @Column()
    public UrlCode:string;
    @Column()
    public AliasProductName:string;
    @Column()
    public Reference:string;
    @Column()
    public IsActive:boolean;
    @Column()
    public Description:string;
    @Column("text", { array: true, default: "{}" })
    public Strengths?:string[];
    @Column("text", { array: true, default: "{}" })
    public Weaknesses?:string[];
    @Column("text", { array: true, default: "{}" })
    public Colors?:string[];
    @Column()
    public Weight:number;
    @Column({ type: 'json',nullable:true})
     
    public Size:{Width?:number;Height?:number};
    @Column()
    public MetaTitle:string;
    @Column()
    public Price:number;
    @Column()
    public FinalPrice:number=0;
    @Column()
    public ProfitPercent:number=0;
    @Column()
    public MetaKeyword:string;
    @Column()
    public MetaDescription:string;
    @Column()
    public Garranty:string;
    @Column()
    public ProductVideo:string;
    @Column("text", { array: true, default: "{}" })
    public Images?:string[];
    @Column()
    public InStock:number=0;
    @Column()
    public OrderQuantityLimit:number=1;
    @Column()
    public Status:string;    
    @Column()
    public ProductTypeName:string;

}
export default Product;