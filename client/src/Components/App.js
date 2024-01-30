import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import GeneralChat from './Chat_Components/General_Chats/General_Chats';
import PairChat from './Chat_Components/Pair_Chats/Pair_Chats';
import GroupChat from './Chat_Components/Group_Chats/Group_Chats';


function App() {

  const [generalChats, setGeneralChats] = useState("");
  const [pairChats, setPairChats] = useState("");
  const [groupChats, setGroupChats] = useState("");

  function fetchGeneralChats(){
    fetch("/api/chats")
    .then((res) =>{
      if(!res.ok){
        throw new Error(`failed to fetch chats: ${res.statusText}`)
      }
      return res.json();
    })
    .then((data) =>{
      setGeneralChats(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });  
  }

  function fetchPairChats(){
    fetch("/api/pair-chats")
    .then((res) =>{
      if(!res.ok){
        throw new Error(`failed to fetch chats: ${res.statusText}`)
      }
      return res.json();
    })
    .then((data) =>{
      setPairChats(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });  
  }

  function fetchGroupChats(){
    fetch("/api/group-chats")
    .then((res) =>{
      if(!res.ok){
        throw new Error(`failed to fetch chats: ${res.statusText}`)
      }
      return res.json();
    })
    .then((data) =>{
      setGroupChats(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });  
  }

  useEffect(() =>{
    fetchGeneralChats();
    fetchPairChats();
    fetchGroupChats();
  }, [])

  return (
    <div className="App">
      <h1>welcome</h1>
      <Routes>
        <Route path="/gen" element={ <GeneralChat chatGeneral = {generalChats} /> } />
        <Route path="/pa" element={ <PairChat ChatsPair = {pairChats} /> } />
        <Route path="/gro" element={ <GroupChat ChatsGroup ={groupChats} /> } />
      </Routes>
    </div>
  );
}

export default App;
