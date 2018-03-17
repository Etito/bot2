"use strict";
const Discord= require('discord.js');
const modules=require('./modules/frases.js');
const com=require('./modules/commands.js');
const client=new Discord.Client();
const ytdl= require('ytdl-core');
const texToSpeech=require('./modules/speech.js');
const request =require('request');
const fs=require('fs');
const getYoutubeId=require('get-youtube-id');
const fetchVideoInfo=require('youtube-info');
const config=JSON.parse(fs.readFileSync('settings.json','utf-8'));
const yt_api_key=config.yt_api_key;
const bot_controller=config.bot_controller;
const prefix =config.prefix;
const discord_token=config.discord_token;
const express=require('express');
const app=express();

app.get("/",function(req,res){
    res.send("test ho ho ho");
});

app.listen(process.env.PORT,function(){
    console.log("IM UP!!");
});


client.on('ready',()=>{console.log("login success ")});
client.on('message',(message)=>{
    console.log("CLient ID DIscord");
    console.log(message.channel.id)

    const member = message.member;
    const user =message.author.username;
   
    //controller for music
    var queue =[];
    var isPlaying=false;
    var disPatcher=null;
    // voice 
    var voiceChannel=null;
    var skipReq=0;
    var skuppers=[];

    switch(message.content.toLocaleLowerCase())
    {  
        case "-hsh":
            modules.frases.newFrase(message);
            break;
        case "-com":
            com.commands.getCommands(message);
        break;
        case "-bye":
        texToSpeech.speech.hablar(message
            ,com.commands.list["-bye"].text);
        break;
        default:

        
            /*if(com.commands.getPrefixes().includes(message.content)){
                playIdqsaen(com.commands.list[message.content].url,message);
            }*/
            if(com.commands.getPrefixes().includes(message.content)){
                playMp3Qsaen(com.commands.list[message.content].path
                            ,message);
                          
            }
            break;
    }
});

client.login(discord_token)
.catch(err=>console.log(err));

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
/**
 * Reproduce Video de youtube a apartir de Id entregada
 * @param {String} id 
 * @param {Message} message 
 */
function playIdqsaen(id,message)
{
    
    voiceChannel=message.member.voiceChannel;
    voiceChannel.join().then( function(connection){
       stream=ytdl("https://www.youtube.com/watch?v="+id,{filter:'audioonly'});
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
/**
 * Funcion que reproduce Archivo Mp3
 * @param {String} pathMp3 
 * @param {Message} message 
 */
function playMp3Qsaen(pathMp3,message){
    let voiceChannel=message.member.voiceChannel;
    voiceChannel.join()
    .then(connection=>{
        let dispatcher=connection.playFile('files'+pathMp3);
        dispatcher.on("end",end=>{
            voiceChannel.leave();
            message.delete()
        })
    })
    .catch(err=>console.log(err));


}


