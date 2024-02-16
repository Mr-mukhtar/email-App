import {  Routes,Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import Weldone from "./components/Weldone";

function App() {
  return (
    <Layout>
      <main>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Weldone/>}/>
      </Routes>
      </main>
     
     
    </Layout>
  );
}

export default App;
