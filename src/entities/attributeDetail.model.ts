import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";
@Entity()
class AttributeDetail {
    @PrimaryGeneratedColumn()
    public AttributeDetailId: number;
    @Column()
    public ProductId: number; 
    @Column()
    public AttributeId: number; 
    @Column()
    public AttributeValueId?: number; 
    @Column()
    public Value?: string; 
  }
  export default AttributeDetail;