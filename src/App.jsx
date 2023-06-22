// import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import LayoutUser from "./layout/LayoutUser";
import Error404 from "./Error404";
import { Box } from "@chakra-ui/react";

function App() {
  // const [count, setCount] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   const fetchTime = async () => {
  //     try {
  //       const response = await fetch("/time");
  //       const jsonData = await response.json();
  //       setCurrentTime(jsonData.time);
  //     } catch (error) {
  //       console.error("Error fetching time:", error);
  //     }
  //   };
  //   fetchTime();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/olvide-password" element={<ForgetPassword />} /> */}
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>The current time is {currentTime}.</p>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  );
}

export default App;
