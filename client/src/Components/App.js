import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import GeneralChat from './Chat_Components/General_Chats/General_Chats';
import PairChat from './User/Pair_Chats/Pair_Chats';
import GroupChat from './Groups/Group_Chats/Group_Chats';
import Login from './Landing/Login';
import Profile from './User/Profile';
import SignUp from './Landing/SignUp';
import Group from './Groups/Groups';
import Users from './User/Users';
import LandPg from './Landing/LandPg';
import Home from './Home';
import Members from './Groups/members/members';
import Receiver from './User/Receiver';


function App() {

  const [generalChats, setGeneralChats] = useState("");
  const [pairChats, setPairChats] = useState("");
  const [groupChats, setGroupChats] = useState("");
  const [profile, setProfile] = useState("");
  const [groups, setGroups] = useState("");
  const [users, setUsers] = useState("");
  const [members, setMembers] = useState("");
  const [group, setGroup] = useState("")
  const [user, setUser] = useState("")


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

  const addPairChat = (newChat) => {
    setPairChats((prevChatsPair) => [...prevChatsPair, newChat]);
  };

  const deletePairChat = (deletedChatId) => {
    // Update the state to exclude the deleted chat
    setPairChats((prevChatsPair) => prevChatsPair.filter((chat) => chat.id !== deletedChatId));
  };

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

  const addGroupChat = (newChat) => {
    setGroupChats((prevChatsGroup) => [...prevChatsGroup, newChat]);
  };

  const deleteGroupChat = (deletedChatId) => {
    // Update the state to exclude the deleted chat
    setGroupChats((prevChatsGroup) => prevChatsGroup.filter((chat) => chat.id !== deletedChatId));
  };

  function fetchProfile(){
    const id = Number(localStorage.getItem('user_id'))
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

  function fetchUsers(){
    fetch("/api/users")
    .then((res) =>{
      if(!res.ok){
        throw new Error(`failed to fetch chats: ${res.statusText}`)
      }
      return res.json();
    })
    .then((data) =>{
      setUsers(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });  
  }

  function fetchMembers(){
    fetch("/api/group-members")
    .then((res) =>{
      if(!res.ok){
        throw new Error(`failed to fetch chats: ${res.statusText}`)
      }
      return res.json();
    })
    .then((data) =>{
      setMembers(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });  
  }

  function fetchGroup(){
    const group_id = Number(localStorage.getItem('group_id'));
    fetch(`/api/group/${group_id}`)
    .then((res) =>{
        if(!res.ok){
          throw new Error(`failed to fetch chats: ${res.statusText}`)
        }
        return res.json();
    })
    .then((data) =>{
      setGroup(data)
    })
    .catch((err) => {
      console.error('Error fetching chats:', err)
    });     
  }

  function fetchUser(){
    // const receiver_id = Number(localStorage.getItem('receiver_id'));
    const receiver_id = 8

    console.log(receiver_id)

    fetch(`/api/user/${receiver_id}`)
    .then((res) =>{
        if(!res.ok){
          throw new Error(`failed to fetch user: ${res.statusText}`)
        }
        return res.json();
    })
    .then((data) =>{
      setUser(data)
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
    fetchUsers();
    fetchMembers();
    fetchGroup();
    fetchUser();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandPg />} />
        <Route path='/home' element={<Home />} />
        <Route path="/chats" element={ <GeneralChat chatGeneral = {generalChats} /> } />
        <Route path="/pair-chats" element={ <PairChat user={user} ChatsPair = {pairChats} onAddition={addPairChat} onDelete= {deletePairChat} /> } />
        <Route path="/group-chats" element={ <GroupChat addGroupChat={addGroupChat} group={group} ChatsGroup ={groupChats} onDelete={deleteGroupChat}/> } />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<Profile profile = {profile} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/groups' element={<Group groups = {groups} />} />
        <Route path= '/users' element={<Users users ={users} />} />
        <Route path= '/group-members' element={<Members group= {group} members ={members} />} />
        <Route path='/receiver' element={<Receiver user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
