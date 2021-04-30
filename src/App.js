import React, { useState,useEffect } from 'react';
import './App.css';
import Navbar from './Navbar'
import axios from 'axios'



function App() {
  const [poemData, setPoemData] = useState(null);
  const [err, setErr] = useState("");
  const [id, setId] = useState('');
  const [editmode, setEditmode] = useState(false);
  const [newmode, setNewmode] = useState(true);
  const [content, setContent] = useState(poemData && poemData.content?poemData.content:"");
  const [inputtitle, setInputtitle] = useState("")
  const [inputcontent, setInputcontent] = useState("")
  const [success, setSuccess] = useState('');
  
  
  const getPoem = async (poemId) => {
        setNewmode(false);
        setEditmode(false);
        setSuccess("");
    setErr("");
        setId(poemId);
        await axios.get(`/poem/get/${poemId}`)
        .then(res => {
          console.log(res);
            setPoemData(res.data.poem);
        })
          .catch(err => {
            console.log(err);
          setErr(err.response.data.msg);
        })
      
  }
  const textBox = async () => {
    setNewmode(false)
    setEditmode(true);
  }
  const addBox = async () => {
    setNewmode(true);
    setEditmode(false);
  }
  const submit = async () => {
    await axios.post(`/poem/addPoem`, { inputtitle, inputcontent })
      .then((res) => {
        setSuccess(res.data.msg);
        setInputcontent("");
        setInputtitle("");
      })
      .catch(err => {
      setErr(err.response.data.msg)
    })
  }
  const edit = async (Id) => {
  
    await axios.put(`/poem/edit/${Id}`,{content})
      .then(res => {
        setEditmode(false);
        setSuccess(res.data.msg)
        setContent("");
      })
      .catch(err => {
        setErr(err.response.data.msg);
    })
  }

  
  return (
    <div className="App">
      <Navbar width={300} height={"100vh"} App_poem={getPoem} />
      <div className="app_container">

        <div id="app_right">
        <div className="btn">
        <button  onClick={()=>addBox()}>உருவாக்கு</button>
        </div>
        <h5>{err && err}</h5>
        <h5>{success && success}</h5>

         {newmode ?
          (
            <div className="inputContainer">
            <h5>கவிதை</h5>
            <div>
            <label htmlFor="input">தலைப்பு    </label>
              <input id="input" value={inputtitle} onChange={(e) => setInputtitle(e.target.value)} />
            </div>
            <div>
            <label htmlFor="text">உள்ளடக்கம் </label>
            <textarea  id ="text" value={inputcontent} onChange={(e) => setInputcontent( e.target.value )} />
            </div>
            <button type="submit" onClick={()=>submit()}>சேமி</button>
          </div>
          )
          :
          (
          <>
       <h5 className="title">{poemData && poemData.title ? poemData.title : ""}</h5>
       
                {poemData  ?
                
                  (
                    poemData.content != null && poemData.content.length > 250
                      ?
                      (editmode ?
                        (
                          <>
                            <div className="editable">
                              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                            </div>
                            <div className="btnContainer">
                              <button onClick={() => edit(id)}>சேமி</button>
               
                            </div>
              
                          </>
                        )
                        :
                        (
                          <>
                            <div>
                              <p>{poemData.content}</p>
                            </div>
                            <div className="btnContainer">
                              <button onClick={() => textBox()}>மாற்று</button>
                            </div>
                 
                          </>
                        ))
                      :
                      (<>
                        <div>
                          <p>மன்னிக்கவும்!!! கவிதையின் வரிகள் மிகவும் குறைவாக உள்ளது.....</p>
                        </div>
                 
                      </>
                      )
                  ) : <h5>Loading!!</h5>}
                  </>)
                }
        

          
          
     
      </div>
      </div>
    </div>
  );
}

export default App;
