import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';
@Entity()
class AttributeValue{
    @PrimaryGeneratedColumn()
    public AttributeValueId:number;
    @Column()
    public AttrbuteId:number;
    @Column({length:200})
    public Value: string; 
}

export default AttributeValue;