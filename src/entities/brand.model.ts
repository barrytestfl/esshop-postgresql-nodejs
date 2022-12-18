import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
@Entity()
class Brand{
    @PrimaryGeneratedColumn()
    public BrandId:number;
    @Column()
    public BrandName:string;
   @Column()    
    public BrandImage:string;
   @Column()    
    public BoxImage:string;
   @Column()    
    public Discription:string;
}
export default Brand;