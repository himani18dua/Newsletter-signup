const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { post } = require("request");

var favicon = require('serve-favicon');
app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
    console.log("The server is running on port 3000");
});
app.post("/",function(req,res){
 const firstName=req.body.fname;
 const lastName=req.body.lname;
 const email=req.body.email;
  const data={
    members:[
     {email_address:email,
     status:"subscribed",
     merge_fields:{
        FNAME:firstName,
        LNAME:lastName
     }
    }
  ]
  };
  const jsonData= JSON.stringify(data);
  const url='https://us9.api.mailchimp.com/3.0/lists/8b28022e77';
  const options={
    method:"POST",
    auth:"himani1:38de8fabc2b3cb2da6265ccb1d4023c8-us9",
  }
  
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
      }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();

});

//  })
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
// //apikey
//38de8fabc2b3cb2da6265ccb1d4023c8-us9
//listid
//8b28022e77