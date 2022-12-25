import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AttributeValue from './attributeValue.model';
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
  
  @OneToMany(()=>AttributeValue,(attibutevalue)=>attibutevalue.attribute, { cascade: true })   
  public attributeValues:AttributeValue[]
}
export default Attribute;