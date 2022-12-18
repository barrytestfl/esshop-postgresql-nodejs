import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
@Entity()
class Product{
    @PrimaryGeneratedColumn()
    public ProductId:number;
    @Column()
    public ProductName:string;
    @Column()
    public GroupId:string;
    @Column()
    public BrandId:string;
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
    //@IsArray()
    public Strengths?:[string];
    //@IsArray()
    public Weaknesses?:[string];
    //@IsArray()
    public Colors?:[string];
    @Column()
    public Weight:number;
    
    public Size?:{Width:number;Height:number};
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
    @Column()
    public Images?:[string];
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