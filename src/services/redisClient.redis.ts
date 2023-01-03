import {createClient} from 'redis';
export   class ownRedis {
    public client=createClient();
    constructor(){
        this.connectdb();
    }
    private connectdb(){
        this.client.connect()
    .then(()=>{
        console.log(`redis connect success!`);
        //this.client.set('title','redis servise')
    })
    .catch((err)=>{
        console.log(`redis error :${err}`);
    });
    
    }
     
}
export  const RedisClient=async ()=>{
    
     let Client=createClient();
        await Client.connect()
            .then(()=>{
                console.log('redis connected!');
              Client.set('name','test');
            })
            .catch((err)=>{
                console.log(`redis error :${err}`);
            });
         return await Client;
}
 
   