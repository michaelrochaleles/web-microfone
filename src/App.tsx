import React, {useState, useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {

  useEffect(()=>{

    if ( !SpeechRecognition.browserSupportsSpeechRecognition() ) {      
      document.getElementById('microfone')?.setAttribute("disabled","disabled");
    }
  });

  const commands = [
    { command: 'Limpar',
      callback: ({resetTranscript}:any) => resetTranscript()
    }
  ];  
  const { transcript } = useSpeechRecognition({commands});

  const [nome, setNome] = useState('');  

  function microfone(){  

    if ( !SpeechRecognition.browserSupportsSpeechRecognition() ) {      
      return null
    }

    document.getElementById('microfone')!.style.animation = "pulse 2s infinite";
    document.getElementById('microfone')!.style.borderRadius = "8px";
    document.getElementById('microfone')?.classList.add("pulse");
    document.getElementById('microfone')?.setAttribute("disabled","disabled");
  
    SpeechRecognition.startListening({language: 'pt-BR'});    

    setTimeout(() => {
      document.getElementById('microfone')!.style.animation = "";
      document.getElementById('microfone')!.style.borderRadius = "";
      document.getElementById('microfone')?.classList.remove("pulse");
      document.getElementById('microfone')?.removeAttribute("disabled");
    }, 5000);

          
  }

  return (
    <div className="App" style={{margin:50}}>
      {/* <span onChange={(e)=>{setNome(e.currentTarget.innerText)}}>{transcript}</span> <br /> */}
      <input id="ref" readOnly value={transcript} onChange={(e)=>{console.log(e.target)}}/> <br />

      {/* <input type="text" hidden onChange={(e)=>{setNome(e.target.value)}}/>{transcript} <br/> */}
      <label htmlFor="nome">Nome completo</label> <br/>
      <input type="text" id="nome" name="nome" style={{width:300}}
        // value={(nome === '')? transcript: nome}
        value={nome}
        onChange={(e)=>{setNome(e.target.value)}}/>
      <button id="microfone" style={{width:80, height:50, marginLeft:5, borderRadius:5}}         
        onClick={microfone} >Microfone</button>
      {/* <p>{transcript}</p> */}
    </div>
  );
}

export default App;
