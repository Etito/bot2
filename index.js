
const Discord= require('discord.js');
const modules=require('./modules/frases.js');
const com=require('./modules/commands.js');
const client=new Discord.Client();
const  ytdl= require('ytdl-core');
const request =require('request');
const fs=require('fs');
const getYoutubeId=require('get-youtube-id');
const fetchVideoInfo=require('youtube-info');

var express=require('express');
var app=express();
var config=JSON.parse(fs.readFileSync('settings.json','utf-8'));
const commands=JSON.parse(fs.readFileSync('model/commands.json','utf-8'));


app.get("/",function(req,res){
    res.send("test ho ho ho");
});

app.listen(8080,function(){
    console.log("EXPRESS SERVER IS RUNNING ON PORT 8080");
});
//console.log(frases);
const yt_api_key=config.yt_api_key;
const bot_controller=config.bot_controller;
const prefix =config.prefix;
const discord_token=config.discord_token;

             

//console.log(commands);
               
                
client.on('ready',()=>{console.log("login success ")});
client.on('message',(message)=>{
   
    //console.log(message);
    const member = message.member;
    const user =message.author.username;
    //console.log("USER!"+user.username);
    const args=  message.content.split(" ").slice(1).join(" ");
    const mess =message.content.toLowerCase();
    const prefix=config.prefix;
   
    //controller for music
    var queue =[];
    var isPlaying=false;
    var disPatcher=null;
    // voice 
    var voiceChannel=null;
    var skipReq=0;
    var skuppers=[];

    switch(message.content)
    {  
        case "-hsh":
            modules.frases.newFrase(message);
            break;
        case "-com":
            com.commands.getCommands(message);
        break;
        default:
            if(com.commands.getPrefixes().includes(message.content)){
                playIdqsaen(com.commands.list[message.content].url,message);
            }
            break;
    }
});

client.login(discord_token).catch(err=>console.log("wea"));

function isYoutube(str){
    return str.toLowerCase().indexOf("youtube.com")>-1;
}

function search_video(query, callback) {
  request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
      let json = JSON.parse(body);
          callback(json.items[0].id.videoId);
  });
}

function getId(str,cb){
    if(isYoutube(str)){
        cb(getYoutubeId(str));
    }
    else{
        search_video(str,function(id){
            cb(id);
        });
    }
}
function add_to_queue(strId){
    if(isYoutube(strId)){
        queue.push(getYoutubeId(strId));
    }else{
        queue.push(strId);
    }
}
function playMusic(id,message){
    voiceChannel=message.member.voiceChannel;
    voiceChannel.join().then( function(connection){
       stream=ytdl("https://www.youtube.com/watch?v=ovQC32AKAnU",{filter:'audioonly'});
       skipRe=0;
       skippers=[];
       disPatcher=connection.playStream(stream);
    }).catch(console.log("WTF"));
    
}
function playIdqsaen(str,message)
{
    
    voiceChannel=message.member.voiceChannel;
    voiceChannel.join().then( function(connection){
       stream=ytdl("https://www.youtube.com/watch?v="+str,{filter:'audioonly'});
       skipRe=0;
       skippers=[];
       disPatcher=connection.playStream(stream).on("end",()=>{
          connection.disconnect();
          voiceChannel.leave();
           message.delete()
           .then(msg => console.log(`Deleted message from ${msg.author}`))
           .catch(console.error);

       });
    })
    .catch(console.log("NOOO"));
}


