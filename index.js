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
const SoundRequest=require('./modules/SoundRequest.js');

app.get("/",function(req,res){
    res.send("test ho ho ho");
});

app.listen(process.env.PORT ||3000,function(){
    console.log("IM UP!!");
});
const queuMap={};

//console.log(q.keypair)
client.on('ready',()=>{console.log("login success ")});
client.on('message',(message)=>{
    console.log('queue',queuMap)
    const member = message.member;
    const guildId=message.channel.id;
    //const voiceChannelId=member.voiceChannel.id;
    const user =message.author.username;

    const content=message.content.toLocaleLowerCase();
    const objQueue={
        cont:content,
        isPlaying:false
    }
    console.log("chanel id",guildId)
    //console.log("member voice chanel id",voiceChannelId)
  
    
    
    

    // voice 
    let voiceChannel=null;
    let skipReq=0;
    let skuppers=[];
    
    switch(content)
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
        case "-yc":
        texToSpeech.speech.hablar(message
            ,com.commands.list["-yc"].text);
        break;
        default:
            //pregunta is el comando existe
            if(com.commands.getPrefixes().includes(content)){
                //pregunta si el canal ya ha ingresado un objeto a la cola
              /*  if( Object.keys(queuMap).includes(guildId)){
                    console.log("includes true")
                    queuMap[guildId].push(objQueue);
                }else{
                    console.log("includes false")
                    queuMap[guildId]=[];
                    queuMap[guildId].push(objQueue);
                } 
                console.log('queuamap',queuMap)*/
                playMp3Qsaen(com.commands.list[content].path
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
    const guildId=message.channel.id;
    if(Object.keys(queuMap).includes(guildId)){
        do
        {
            queuMap[guildId].isPlaying=true
            voiceChannel=message.member.voiceChannel;
            voiceChannel.join().then( function(connection){
            stream=ytdl("https://www.youtube.com/watch?v="+id,{filter:'audioonly'});
            skipRe=0;
            skippers=[];
            disPatcher=connection.playStream(stream).on("end",()=>{
                connection.disconnect();
                message.delete()
                .then(msg => queuMap[guildId].splice(0,1) )
                .catch(console.error);

            });
            })
            .catch(console.log("NOOO"));
        }while(!queuMap[guildId].length>0)
        voiceChannel.leave();
      
    }

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

function playMp3Qsaen2(pathMp3,message){
    // if()
    const guildId=message.channel.id;
    const voiceChannel=message.member.voiceChannel;
    if(Object.keys(queuMap).includes(guildId)){
     while(!queuMap[guildId].length>0)
     {
         let path=com.commands.list[queuMap[guildId][0].cont].path
         console.log("wtf",queuMap[guildId][0].cont)
         voiceChannel.join()
         .then(connection=>{
             let dispatcher=connection.playFile('files'+path);
             dispatcher.on("end",end=>{
                 message.delete()
                 queuMap[guildId].splice(0,1) 
                 if(queuMap[guildId].length==0)
                 playMp3Qsaen(pathMp3,message);
             })
         })
         .catch(err=>console.log(err));
 
     }
        
        
     }
 }
 