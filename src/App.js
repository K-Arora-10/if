// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Form from './components/Form';
import {Routes, Route } from "react-router";
import { useEffect } from 'react';

function App() {

  // Starry background effect
  useEffect(() => {
    const canvas = document.getElementById("sky");
    const ctx = canvas.getContext("2d");

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const count = 100;
    const stars = [];
    let opacity = 0.1;
    let r = 0;

    const draw = (j) => {
      ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
      ctx.beginPath();
      const size = opacity === 1 ? 2 : stars[j].size;
      ctx.rect(stars[j].xpos, stars[j].ypos, size, size);
      ctx.fill();
    };

    const newStar = () => {
      r = Math.floor(Math.random() * count);
      opacity = 1;
    };

    const starLight = () => {
      const star = stars[r];
      ctx.clearRect(star.xpos, star.ypos, 2, 2);
      draw(r);
      opacity -= 0.01;

      if (opacity <= star.op) {
        newStar();
      }
    };

    for (let i = 0; i < count; i++) {
      opacity += 0.5 / count;
      stars.push({
        xpos: Math.floor(Math.random() * W),
        ypos: Math.floor(Math.random() * H),
        size: 1,
        op: opacity,
      });
      draw(i);
    }

    newStar();
    setInterval(starLight, 20);
    setInterval(starLight, 30);
  }, []);



  return (
    <>
      {/* Background Canvas */}
      <canvas id="sky" style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}></canvas>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </>
  );
}

export default App;
