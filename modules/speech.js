var Speech={
    hablar:function hablar(message,text){

        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author}`))
        .catch(console.error);
        message.channel.send(text, { tts: true })
    
    }
}
exports.speech=Speech;
    