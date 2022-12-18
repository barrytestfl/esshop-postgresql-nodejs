import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm';
@Entity()
 class Attribute{
  @PrimaryGeneratedColumn()
  public AttributeId:number;
  @Column({length:150})
  public Name: string; 
  @Column()  
  public Priority: number; 
  @Column()
  public Description: string;
  @Column()
  public AttributeType:string;
  @Column()  
  public GroupId:number;
}
export default Attribute;