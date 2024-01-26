import express from 'express';
import { getReq } from './newcontroller.js';

const server=express();



server.use(express.json());
server.use(express.urlencoded({extended : true}));

server.get('/data',getReq);

server.listen(8080,()=>{
    console.log("server is listning on port number 8080");
});
