import {PrimaryGeneratedColumn,Column,OneToMany,ManyToOne,JoinColumn,Entity} from 'typeorm';
import Product from './product.model';
import Order from './order.model';
@Entity()
class OrderItem{
@PrimaryGeneratedColumn()
public OrderItemId:number;
@Column()
public OrderId:number;
@JoinColumn({ name: 'OrderId' })
@ManyToOne(()=>Order,(order)=>order.Items)
public Order:Order;
@Column()
public ProductId:number;
@Column()
public ProductName:string;
@Column()
public Reference:string;
@Column()
public Colors:string;
@Column()
public Count:number;
@Column()
public Price:number; 
@Column()
public TotalPrice:number=0;
@Column()
public Images:string;
}
export default OrderItem;