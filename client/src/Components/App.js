import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import GeneralChat from './Chat_Components/General_Chats/General_Chats';
import PairChat from './Chat_Components/Pair_Chats/Pair_Chats';
import GroupChat from './Groups/Group_Chats/Group_Chats';
import Login from './Login';
import Profile from './User/Profile';
import SignUp from './User/SignUp';
import Group from './Groups/Groups';


function App() {

  const [generalChats, setGeneralChats] = useState("");
  const [pairChats, setPairChats] = useState("");
  const [groupChats, setGroupChats] = useState("");
  const [profile, setProfile] = useState("");
  const [groups, setGroups] = useState("");

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

  const deleteGroupChat = (deletedChatId) => {
    // Update the state to exclude the deleted chat
    setGroupChats((prevChatsGroup) => prevChatsGroup.filter((chat) => chat.id !== deletedChatId));
};

  function fetchProfile(){
    // const id = localStorage.getItem('user_id')
    const id = 101
    fetch(`/api/user/${id}`)
    .then((res) =>{
      if(!res.ok){
        throw new Error(`failed to fetch chats: ${res.statusText}`)
      }
      return res.json();
    })
    .then((data) =>{
      setProfile(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });
  }

  function fetchGroups(){
    fetch(`/api/groups`)
    .then((res) =>{
      if(!res.ok){
        throw new Error(`failed to fetch chats: ${res.statusText}`)
      }
      return res.json();
    })
    .then((data) =>{
      setGroups(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });
  }

  useEffect(() =>{
    fetchGeneralChats();
    fetchPairChats();
    fetchGroupChats();
    fetchProfile();
    fetchGroups();
  }, [])

  return (
    <div className="App">
      <h1>welcome</h1>
      <Routes>
        <Route path="/gen" element={ <GeneralChat chatGeneral = {generalChats} /> } />
        <Route path="/pa" element={ <PairChat ChatsPair = {pairChats} /> } />
        <Route path="/gro" element={ <GroupChat ChatsGroup ={groupChats} onDelete={deleteGroupChat}/> } />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<Profile profile = {profile} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/groups' element={<Group groups = {groups} />} />
      </Routes>
    </div>
  );
}

export default App;
