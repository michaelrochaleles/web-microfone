import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {

  const commands = [
    { command: 'Limpar',
      callback: ({resetTranscript}:any) => resetTranscript()
    }
  ];
  const { transcript } = useSpeechRecognition({commands});

  const [nome, setNome] = useState('');  

  function microfone(){  

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      // {document.getElementById('ref').value = 'Não existe';}
      return null
    }
  
    SpeechRecognition.startListening({language: 'pt-BR'});    
          
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
      <button style={{width:80, height:50, marginLeft:5}}         
        onClick={microfone} >Microfone</button>
      {/* <p>{transcript}</p> */}
    </div>
  );
}

export default App;
