const fs=require('fs');
var Commands={
    list:JSON.parse(fs.readFileSync('model/commands.json','utf-8')),
    getCommands:function (message){
        text= "```css\nComandos :";
        text+=Object.keys(this.list).map(e =>`\n${e}: ${this.list[e].desc}`);
        text+="```";
        message.channel.send(text);
    },
    getPrefixes:function a(){
        return Object.keys(this.list);
       
    }
}

exports.commands=Commands;