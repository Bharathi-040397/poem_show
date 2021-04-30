import React, { useEffect, useState,useRef } from "react";
import axios from './axios'


const Navbar = ({ width, height, App_poem }) => {
   
     const [xPosition, setX] = useState(-width);
     const [poems, setPoems] = useState(null);
     
     const btnRef = useRef();
     const sidebarRef = useRef();
     var sideWidth;
     
     

  
    

     
   useEffect(() => {
       
        setX(0);
        sideWidth= sidebarRef && sidebarRef.current.style.width;

         const getPoems = async () => {
             await axios.get('/poem/allPoem')
                 .then((res) => {
                     setPoems(res.data.Poems);
                     console.log(res);
                 })
                 .catch(err => {
                     console.log(err);
             })
               }
      getPoems()  
  },[])
   
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };
  
 const onClick = (event) => {
    event.preventDefault();
  };
     
     return (
    <>
      <div
        className="side-bar"
        ref={sidebarRef}
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        
           <div style={{ textAlign: 'center' }}>
             <h5 style={{fontSize:'20px'}}>கவிதைகள்</h5>
             <ul className="content">{poems && poems.map(p => (
                     <div key={p._id} style={{cursor:'pointer'}} onClick={() => App_poem(p._id)}>
                     <li>{p.title}</li>
                    </div>
                
             ))}</ul>
              
        </div>
         </div>
         <button
          ref={btnRef}
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${sideWidth}px, 20vh)`
          }}
          ></button>
         </>
  );
};

export default Navbar