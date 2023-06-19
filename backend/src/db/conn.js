const mongoose = require('mongoose');

mongoose.connect(process.env.db_url).then(()=>{
    console.log('connected');
}).catch((e)=>{
    console.log(e);
})