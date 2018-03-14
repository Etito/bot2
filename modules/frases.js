const fs=require('fs');
var Frases={
    frases:JSON.parse(fs.readFileSync('model/frases.json','utf-8')),
    newFrase:function creaFrase(message){
        console.log(this.frases);
        let col1=this.frases.col1;
        let col2=this.frases.col2;
        let col3=this.frases.col3;
        let col4=this.frases.col4;
        var retu=col1[Math.random() * col1.length>>0]
                    +" "+col2[Math.random() * col2.length>>0]
                    +" "+col3[Math.random() * col3.length>>0]
                    +" "+col4[Math.random() * col4.length>>0];

    
        message.channel.sendMessage(retu);
        

    }//fin new frases
}

exports.frases=Frases;
