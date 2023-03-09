import './App.css';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';

function App() {

  const socket = io();

  const [sock,setSock] =useState('')

  const url = 'wss://6wpovdvzcg.execute-api.us-east-1.amazonaws.com/production';

  // const url2 = 'https://6wpovdvzcg.execute-api.us-east-1.amazonaws.com/production'

  var jsonData = JSON.stringify({ action : 'set_as_restaurant' ,restaurant_name:'test1',restaurant_location_id: 'id1'})


  function setConnection() {
    socket.current = new WebSocket(url);
    socket.current.onopen = () => {
      socket.current.send(jsonData)
      alert("Conexion exitosa!")
      // Listen for any event
      socket.current.onmessage = (message) => {
        console.log(message);
      };
    };
    socket.current.onclose = () => alert("socket closed");
    return () => {
      socket.current.close();
    };
  }

  socket.onAny('event',(data) => {
    console.log("entro")
    console.log('Received data:', data);
  }); 

  function recibirMensaje(){
    socket.onmessage = (message) => {
      console.log(message);
    };
  };
  

  return (
    <>
      <div onClick={setConnection} style={{
        textAlign: 'center',
        width: '100px',
        border: '1px solid gray',
        borderRadius: '5px'
      }}>
        send restaurant
      </div>

      <div onClick={recibirMensaje} style={{
        textAlign: 'center',
        width: '100px',
        border: '1px solid gray',
        borderRadius: '5px'
      }}>
        Recibir Mensage
      </div>

      
    </>
  );
  
}


export default App; 