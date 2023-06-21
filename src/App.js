import {BrowserRouter , Route , Routes} from 'react-router-dom'
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const info = localStorage.getItem('user')
  const [user , setUser]=useState(JSON.parse(info))
  
  return (
    <div>
      <BrowserRouter>
      {/* <Header/>         commented because of error that can be handled only with this step error on logout  */} 
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login user={user} setUser={setUser} />}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
