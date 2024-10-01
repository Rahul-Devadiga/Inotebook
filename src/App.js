import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Navbar from "./Component/Navbar";
import NoteState from "./Context/notes/NoteState";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Toast from "./Component/Toast";




function App() {
  return (
    <div className="App">
      <NoteState>
       <BrowserRouter>
        <Navbar />
        <Toast/>

        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
      </div>
  );
}

export default App;
