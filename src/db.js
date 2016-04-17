import mongoose from 'mongoose';
import express from 'express';

const app = express();
app.use(express.static('./'));

export function createConnection(onCreate){
    mongoose.connect('mongodb://localhost/recipe-box');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("connected to the mongodb");
    });
    onCreate();
};