
const Discord= require('discord.js');
const client=new Discord.Client();
const  ytdl= require('ytdl-core');
const request =require('request');
const fs=require('fs');
const getYoutubeId=require('get-youtube-id');
const fetchVideoInfo=require('youtube-info');

var config=JSON.parse(fs.readFileSync('settings.json','utf-8'));
const yt_api_key=config.yt_api_key;
const bot_controller=config.bot_controller;
const prefix =config.prefix;
const discord_token=config.discord_token;
const commands=["-- = ventana","--- = badum tss ","-+ = bait","++ = nelson"
                ,"// = goat ","+++ = rezero","+- =blow horn ","omae =omae wa mo shindeiru"
                ,"-y = yamero(eren)","-e = edgy as fuck","-r = roasted","-s= sad lady"
                ,"-d = dayum son","-p = pretty good","-t = turn down for what","-m = marica"
                ,"-c = crickets","-h = y tu hermana ","-es =escudo","-ish = ish","-w =wtf jhon tron "
                ,"-a =its me austin","-sb = son of a bitch","-pr = pranked","-ha = haleluya","-ass=asshole"
                ,"-ruin=we ruin everything","-happening=the office it's happening","-why =why","-sd= #penita"
                ,"-yl=yamero (luffy)","-matando=tan matando un weon","-pog = play of the game ","-10=10/10"
                ,"-money = i have no","-ff =cant wake up","-awful =  it's awful","-stop = please stop","-ho=ho  boy here we go"
                ,"-cl=canned laugh","-cc = chao ctm","-ss =thats what she said","-qp= que p�so","-rs=record scratch","-hsh = hablar sin hablar"];
             


               
                
client.on('ready',()=>{console.log("login success ")});
client.on('message',(message)=>{
   
    console.log(message);
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

    switch(message.content){
            case "--":
                playIdqsaen("ovQC32AKAnU",message);
            break;
            case "---":
                playIdqsaen("gpaOy8b8X6A",message);
            break;
            case "++":
                playIdqsaen("Kxw7Yzw680s",message);
            break;
            case "-+":
                playIdqsaen("llCmtgvIqcY",message);
            break;
            case "//":
                playIdqsaen("1paueaTWFRE",message);
            break;
            case "+++":
                playIdqsaen("vH7rcJ2RWPM",message);
            break;
            case "+-":
                playIdqsaen("Ss7SRjiOCCs",message);
            break;
            case "omae":
                playIdqsaen("nBjlpnuA89c",message);
            break;
            case "-y":
                playIdqsaen("K_C5JrHOP2U",message);
            break;
            case "-yl":
                playIdqsaen("5eTR0EMRGDI",message);
            break;
            case "-e":
                playIdqsaen("C-ObB_S_qZo",message);
            break;
            case "-r":
                playIdqsaen("1s6aNjJRbrA",message);
            break;
            case "-d":
                playIdqsaen("z8RkR4rd7dM",message);
            break;
            case "-p":
                playIdqsaen("JeimE8Wz6e4",message);
            break;
            case "-t":
                playIdqsaen("xWcuZWy4o7I",message);
            break;
            case "-m":
                playIdqsaen("XgpH-8W-Eyc",message);
            break;
            case "-s":
            playIdqsaen("CQeezCdF4mk",message);
            break;
            case "-c":
            playIdqsaen("CpGtBnVZLSk",message);
            break;
            case "-h":
            playIdqsaen("HN2dbOUc8A4",message);
            break;
            case "-es":
            playIdqsaen("aJRRCsAG_PU",message);
            break;
            case "-ish":
            playIdqsaen("JmDw2E5wXLM",message);
            break;
            case "-w":
            playIdqsaen("19f1RDV2k6w",message);
            break;
            case "-a":
            playIdqsaen("cNgxyL5zEAk",message);
            break;
            case "-sb":
            playIdqsaen("tOugNisFgVo",message);
            break;
            case "-pr":
            playIdqsaen("z-nfbDXTiHg",message);
            break;
            case "-ha":
            playIdqsaen("GNrzbz6z9HQ",message);
            break;
            case "-ass":
            playIdqsaen("a9j3HQmwqPM",message);
            break;
            case "-ruin":
            playIdqsaen("B9zC-gH6k8U",message);
            break;
            case "-happening":
            playIdqsaen("vrQFBYgwQW8",message);
            break;
            case "-sd":
            playIdqsaen("7ODcC5z6Ca0",message);
            break;
            case "-why":
            playIdqsaen("Ktt_nI-odF0",message);
            break;
            case "-pog":
            playIdqsaen("Ltiip7MAa-U",message);
            break;
            case "-matando":
            playIdqsaen("QGKT_CQzv10",message);
            break;
            case "-10":
            playIdqsaen("uneSOPqqAFw",message);
            break;
            case "-money":
            playIdqsaen("sCHkdFO8oCo",message);
            break;
            case "-awful":
            playIdqsaen("bLJTAqnmHt0",message);
            break;
            case "-stop":
            playIdqsaen("S4bmCvekW48",message);
            break;
            case "-ho":
            playIdqsaen("6gQOYAp1-oU",message);
            break;
            case "-cl":
            playIdqsaen("JbaFq043TiE",message);
            break;
            case "-ff":
            playIdqsaen("0EDc-DO287I",message);
            break;
            case "-cc":
            playIdqsaen("TmDlOkYVbfY",message);
            break;
case "-rs":
playIdqsaben("ktVvuLX_Xso",message);
break;
case "-hsh":
rollFrase(message);
break;
            case "-ss":
            playIdqsaen("fzdg5OyXVs8",message);
            break;
            case "-qp":
		playIdqsaen("jA3rkiV0yyU",message);
break;
            case "-com":
        
          
            text= "```css\nComandos :";
            //text="comandos:";
            for(i=0;i<commands.length;i++){
                text+="\n"+commands[i];
            }
            text+="```";
            message.channel.sendMessage(text);
            break;
        }
        
    
  
    /*if(message.content== '--'){
       
        voiceChannel=message.member.voiceChannel;
        voiceChannel.join().then( function(connection){
    
                  // stream=ytdl("https://www.youtube.com/watch?v="+id);
           stream=ytdl("https://www.youtube.com/watch?v=ovQC32AKAnU",{filter:'audioonly'});
           skipRe=0;
           skippers=[];
           disPatcher=connection.playStream(stream);}).catch(console.log("NOOO"));
        //message.reply('https://www.youtube.com/watch?v=ovQC32AKAnU');
       // message.channel.sendMessage("ahora si hora a todos ");
    }

    if(message.content== '---'){
        
         voiceChannel=message.member.voiceChannel;
         voiceChannel.join().then( function(connection){
     
                   // stream=ytdl("https://www.youtube.com/watch?v="+id);
            stream=ytdl("https://www.youtube.com/watch?v=gpaOy8b8X6A",{filter:'audioonly'});
            skipRe=0;
            skippers=[];
            disPatcher=connection.playStream(stream);}).catch(console.log("NOOO"));
         //message.reply('https://www.youtube.com/watch?v=ovQC32AKAnU');
        // message.channel.sendMessage("ahora si hora a todos ");
     }
     if(message.content== '++'){
        
         voiceChannel=message.member.voiceChannel;
         voiceChannel.join().then( function(connection){
     
                   // stream=ytdl("https://www.youtube.com/watch?v="+id);
            stream=ytdl("https://www.youtube.com/watch?v=0gI6g5UioBI",{filter:'audioonly'});
            skipRe=0;
            skippers=[];
            disPatcher=connection.playStream(stream);}).catch(console.log("NOOO"));
         //message.reply('https://www.youtube.com/watch?v=ovQC32AKAnU');
        // message.channel.sendMessage("ahora si hora a todos ");
     }
     if(message.content=="-+")
     {
         playIdqsaen("llCmtgvIqcY",message);
     }*/
     
     
    if(mess.startsWith(prefix+"play")){
        if(queue.length >0 || isPlaying){
            getId(args,function(id){
                add_to_queue(id);
                fetchVideoInfo(id,function(err,videoinfo){
                    if(err) throw new Error(err);
                    message.channel.sendMessage("tocando la verga "+videoinfo.title+"8==D");
                });
            });
        }else{
            isPlaying=true;
            getId(args,function(id){
                queue.push("placeholder");
                playMusic(id,message);
                fetchVideoInfo(id,function(err,videoinfo){
                    if(err) throw new Error(err);
                    message.channel.sendMessage("encolada la verga "+videoinfo.title+"8==D");
                });	
            });
        }
    }

});

client.login(discord_token).catch(err=>console.log("wea"));
//process.on('unhandledRejection',console.error);
//client.login('NDE3MjAyMDI5NDMwMDQ2NzMw.DXPlOg.MxqJhB0T7oKAXSj8NkAzQYgLaiY');

function isYoutube(str){
    return str.toLowerCase().indexOf("youtube.com")>-1;
}

function search_video(query, callback) {
  request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
      let json = JSON.parse(body);
      //if (!json.items[0]) callback("3_-a9nVZYjk");
      //else {
          callback(json.items[0].id.videoId);
      //}
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

              // stream=ytdl("https://www.youtube.com/watch?v="+id);
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

              // stream=ytdl("https://www.youtube.com/watch?v="+id);
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


function rollFrase(message)
{

    var col1=["Queridos compa�eros","Por otra parte,y dados los condicionamientos actuales","Asimismo,","Sin embargo no hemos de olvidar que"
    ,"De igual manera,","La pr�ctica de la vida cotidiana prueba que,"
    ,"No es indispensable argumentar el peso y la significaci�n de estos problemas ya que,"
    ,"Las experiencias ricas y diversas muestran que,"
    ,"El af�n de organizaci�n, pero sobre todo"
    ,"Los superiores principios ideol�gicos, condicionan que"
    ,"Incluso, bien pudi�ramos atrevernos a sugerir que"
    ,"Es obvio se�alar que,"
    ,"Pero pecar�amos de insinceros si soslay�semos que,"
    ,"Y adem�s, quedar�amos inmersos en la m�s abyecta de las estulticias si no fueramos consacientes de que"
    ,"Por �ltimo, y como definitivo elemento esclarecedor, cabe a�adir que,"];
    var col2=["la realizaci�n de las premisas del programa","la complejidad de los estudios de los dirigentes","el aumento constante, en cantidad y en extensi�n, de nuestra actividad","la estructura actual de la organizaci�n","el nuevo modelo de actividad de la organizaci�n","el desarrollo continuo de distintas formas de actividad","nuestra actividad de informaci�n y propaganda","el reforzamiento y desarrollo de las estructuras","la consulta con los numerosos militantes","el inicio de la acci�n general de formaci�n de las actitudes","un relanzamiento espec�fico de todos los sectores implicados","la superaci�n de experiencias periclitadas","una aplicaci�n indiscriminada de los factores confluyentes","la condici�n sine qua non rectora del proceso","el proceso consensuado de unas y otras aplicaciones concurrentes"];
    var col3= ["nos obliga a un exhaustivo an�lisis","cumple un rol escencial en la formaci�n","exige la precisi�n y la determinaci�n"
    ,"ayuda a la preparaci�n y a la realizaci�n","garantiza la participaci�n de un grupo importante en la formaci�n","cumple deberes importantes en la determinaci�n"
    ,"facilita la creaci�n","obstaculiza la apreciaci�n de la importancia","ofrece un ensayo interesante de verificaci�n","implica el proceso de reestructuraci�n y modernizaci�n",
    "habr� de significar un aut�ntico y eficaz punto de partida","permite en todo caso explicitar las razones fundamentales","asegura, en todo caso, un proceso muy sensible de inversi�n","radica en una elaboraci�n cuidadosa y sistem�tica de las estrategias adecuadas","deriva de una indirecta incidencia superadora"];
     var col4= ["de las condiciones financieras y administrativas existentes.","de las directivas de desarrollo para el futuro.","del sistema de participaci�n general."
     ,"de las actitudes de los miembros hacia sus deberes ineludibles.","de las nuevas proposiciones.","de las direcciones educativas en el sentido del progreso."
     ,"del sistema de formaci�n de cuadros que corresponda a las necesidades.","de las condiciones de las actividades apropiadas.","del modelo de desarrollo","de las formas de acci�n."
     ,"de las b�sicas premisas adoptadas.","de toda una casu�stica de amplio espectro.","de los elementos generadores.","para configurar una interface amigable y coadyuvante a la reingenier�a del sistema.","de toda una serie de criterios ideol�gicamente sistematizados en un frente com�n de actuaci�n regeneradora."];

     var retu=col1[Math.random() * col1.length>>0]+" "+col2[Math.random() * col2.length>>0]+" "+col3[Math.random() * col3.length>>0]+" "+col4[Math.random() * col4.length>>0];
    
     message.channel.sendMessage(retu);
        
}