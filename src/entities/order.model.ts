import {PrimaryGeneratedColumn,Column,OneToMany, OneToOne,JoinColumn,Entity} from 'typeorm';
import Address from './address.model';
import OrderItem from './orderItem.model';
@Entity()
class Order{
    @PrimaryGeneratedColumn()
    public OrderId:number;
    @Column()
    public UserId:number;
    @Column()
    public OrderCode:string;
    @Column()
    public OrderDate:Date;
    @Column()
    public FullName:string;
    @Column()
    public Mobile:string;
    @Column()
    @JoinColumn()
    @OneToOne(() => Address, (address) => address.Id)
    public Address:Address;
    @Column()
    public Amount:number;
    @Column()
    public Off:number;
    @Column()
    public Invoice:number;
    @OneToMany(()=>OrderItem,(item)=>item.OrderId,{ cascade: true })
    public Items:OrderItem[];
    @Column()
    public OrderStatus:string='pending';

}
export default Order;