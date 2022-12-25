import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Attribute from './attribute.model';
import { OneToMany } from 'typeorm';
@Entity()
class AttributeValue{
    @PrimaryGeneratedColumn()
    public AttributeValueId:number;
    @Column()      
    public AttrbuteId:number;
    @Column({length:200})
    public Value: string; 
    @JoinColumn({ name: 'AttrbuteId' })
    @ManyToOne(()=>Attribute,(attribute)=>attribute.attributeValues)
    public attribute:Attribute;
}

export default AttributeValue;