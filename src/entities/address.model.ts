import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
@Entity()
class Address{
    @PrimaryGeneratedColumn()
    public Id:number;
    @Column()
    public Street: string;
    @Column()
    public City: string;
    @Column()
    public Country: string;
}
export  default Address;
