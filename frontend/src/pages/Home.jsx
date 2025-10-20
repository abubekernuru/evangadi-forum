import React from 'react'
import { useContext } from 'react';
import { AppState } from '../App';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Home() {

  const {user} = useContext(AppState);
  console.log(user);

  return (
    <>
      <Header />
      <h1>Home</h1>
      <br />
      <br />
      <br />
      <br />
      <h2>{user.username}</h2>
      <Footer />
    </>
    
  )
}

export default Home