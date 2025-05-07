import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Login from "./Login";
import Signup from "./Signup";
import Events from "./Events";

const Hero = () => {
  return (
    <div className="relative bg-[url('/andrew-kliatskyi-B_Z9jqassqE-unsplash.jpg')] bg-cover bg-center min-h-screen overflow-hidden">
    <Header/>
    <HeroSection/>
    <Login/>
    <Signup/>
   
    
    </div>

     
  );
};

export default Hero;


