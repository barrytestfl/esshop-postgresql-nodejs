import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
@Entity()
class Brand{
    @PrimaryGeneratedColumn()
    public GroupId:number;
    @Column()
    public GroupName:string;
    @Column()
    public GroupImage:string;
    @Column()
    public MetaKeyword:string;
    @Column()
    public MetaDescription?:string;
    @Column()
    public Priority?:number;
    @Column()
    public ParentId?:number 
}
export default Brand;