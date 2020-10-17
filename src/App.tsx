import React, {useState, useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {

  useEffect(()=>{    

    if ( !SpeechRecognition.browserSupportsSpeechRecognition() ) {
      document.getElementById('microfone')?.setAttribute("disabled","disabled");
    } else {
      
      document.getElementById('microfone')!.style.color = "red"; 

      if ( navigator.userAgent.indexOf('Chrome/') > 1 || navigator.userAgent.indexOf('samsung') > 1 ){

        
        document.getElementById('microfone')?.setAttribute("enabled","enabled");                  
      } else {        
        
        document.getElementById('microfone')?.setAttribute("display","disabled");
        document.getElementById('microfone')!.style.display = "none"; 
      }
    }
      
  },[]);

  const commands = [
    { command: 'Limpar',
      callback: ({resetTranscript}:any) => resetTranscript()
    }
  ];  
  const { transcript, listening } = useSpeechRecognition({commands});

  const [nome, setNome] = useState('');    

  useEffect(()=>{setNome(transcript)},[transcript]);  

  useEffect(()=>{

    if (!listening) {

      document.getElementById('microfone')!.style.animation = "";
      document.getElementById('microfone')!.style.borderRadius = "";
      document.getElementById('microfone')?.classList.remove("pulse");
      document.getElementById('microfone')?.removeAttribute("disabled");  
    }
  },[listening]);

  function microfone(){  

    if ( !SpeechRecognition.browserSupportsSpeechRecognition() ) {      
      return null
    }

    document.getElementById('microfone')!.style.animation = "pulse 2s infinite";
    document.getElementById('microfone')!.style.borderRadius = "8px";
    document.getElementById('microfone')?.classList.add("pulse");
    document.getElementById('microfone')?.setAttribute("disabled","disabled");

    // setNome("");
  
    SpeechRecognition.startListening({language: 'pt-br'});                

    setTimeout(() => {
      document.getElementById('microfone')!.style.animation = "";
      document.getElementById('microfone')!.style.borderRadius = "";
      document.getElementById('microfone')?.classList.remove("pulse");
      document.getElementById('microfone')?.removeAttribute("disabled");      
    }, 5500);          
  }

  return (
    <div className="App" style={{margin:50}}>
      <label htmlFor="nome">Nome completo</label> <br/>
      <input type="text" id="nome" name="nome" style={{width:300}} value={nome} onChange={(e)=>{setNome(e.target.value)}}/>        
      <button id="microfone" style={{width:80, height:50, marginLeft:5, borderRadius:5}} onClick={microfone} >Microfone</button>
    </div>
  );
}

export default App;
