import { connect, model } from 'mongoose';


export function dbConnection(){

        connect(process.env.DB_ONLINE).then(()=>{

        console.log("db connected")
    }).catch((err)=>{
        console.log("database error ")
    })

}  