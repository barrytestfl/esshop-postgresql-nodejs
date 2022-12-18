import { Entity,PrimaryGeneratedColumn,Column, OneToMany, OneToOne } from "typeorm";
import Address from "./address.model";
@Entity()
class User{
    @PrimaryGeneratedColumn()
    public Id:number;
    @Column() 
    public FirstName: string;
    @Column()
    public LastName: string;
    @Column()
    public Email: string;
    @Column()
    public Password: string;
    @Column()
    @OneToOne((type)=>Address,(address)=>address.Id)
    public Address?: Address;
}
export  default User;
