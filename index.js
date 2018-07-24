"use strict";
const Discord = require('discord.js');
const modules = require('./modules/frases.js');
const com = require('./modules/commands.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const texToSpeech = require('./modules/speech.js');
const request = require('request');
const fs = require('fs');
const getYoutubeId = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const config = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));
const yt_api_key = config.yt_api_key;
const bot_controller = config.bot_controller;
const prefix = config.prefix;
const discord_token = config.discord_token;
const express = require('express');
const app = express();
const SoundRequest = require('./modules/SoundRequest.js');


app.listen(process.env.PORT || 3000, function () {
    console.log("IM UP!!");
});
var queuMap = {};

//console.log(q.keypair)
client.on('ready', () => { console.log("login success ") });
client.on('message', (message) => {
    console.log('queue', queuMap)

    const member = message.member;
    const guildId = message.channel.id;
    //const voiceChannelId=member.voiceChannel.id;
    const user = message.author.username;

    const content = message.content.toLocaleLowerCase();
    const objQueue = {
        cont: content,
        isPlaying: false
    }
    let obj={
        id:guildId,
        nombre:message.guild.name,
    };
    console.log("chanel id", obj);

    switch (content) {
        case "-hsh":
            modules.frases.newFrase(message);
            break;
        case "-com":
            com.commands.getCommands(message);
            break;
        case "-bye":
            texToSpeech.speech.hablar(message
                , com.commands.list["-bye"].text);
            break;
        case "-yc":
            texToSpeech.speech.hablar(message
                , com.commands.list["-yc"].text);
            break;
        default:
            //pregunta is el comando existe
            if (com.commands.getPrefixes().includes(content)) {

                if (Object.keys(queuMap).includes(guildId)) {
                    console.log("includes true")
                    queuMap[guildId].push(objQueue);
                } else {
                    console.log("includes false")
                    queuMap[guildId] = new Array;
                    playMp3Qsaen(com.commands.list[content].path
                        , message, guildId);
                    queuMap[guildId].push(objQueue);


                }
                console.log('queuamap', queuMap)



            }
            break;
    }
});

client.login(discord_token)
    .catch(err => console.log(err));


/**
 * Funcion que reproduce Archivo Mp3
 * @param {String} pathMp3 
 * @param {Message} message 
 */
function playMp3Qsaen(pathMp3, message, gid) {
    let voiceChannel = message.member.voiceChannel;
    console.log("mid",message.id);
    voiceChannel.join()
        .then(connection => {
                let dispatcher = connection.playFile('files' + pathMp3);
                dispatcher.on("end", end => {
                    queuMap[gid].shift();
                    if (queuMap[gid].length > 0) {
                        let wtf = queuMap[gid];
                        let con = wtf[0].cont;
                        message.delete(500);
                        playMp3Qsaen(com.commands.list[con].path,message, gid);

                    } else {
                        console.log("pre",queuMap);
                        delete queuMap[gid];
                        console.log("pste",queuMap);
                        voiceChannel.leave();
                    }
                }).catch(
                    errr=>console.log("fuck u vanessa"));
            
        })
        .catch(err =>console.log("se fue a la b "+err));
}

