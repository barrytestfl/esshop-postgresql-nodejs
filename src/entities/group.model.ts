import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
@Entity()
class Group{
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
    @Column({nullable:true})
    public Priority?:number;
    @Column()
    @Column({nullable:true})
    public ParentId?:number 
}
export default Group;