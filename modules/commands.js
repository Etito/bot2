const fs=require('fs');
var Commands={
    list:JSON.parse(fs.readFileSync('model/commands.json','utf-8')),
    getCommands:function getCommands(message){
        text= "```css\nComandos :";
        console.log(Object.keys.list)
          Object.keys(this.list).map(e =>{
            text+="\n"+e+": "+this.list[e].desc;
        });
        text+="```";
        message.channel.sendMessage(text);
        

    },
    getPrefixes:function a(){
        return Object.keys(this.list);
       
    }
}

exports.commands=Commands;