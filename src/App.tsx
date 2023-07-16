import React from "react";
import { Route } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Home from "./Home";
// import Footer from "./components/Footer";
import AnimateRoutes from "./components/AnimationRoutes";
// import { Switch } from "react-router-dom";

const App: React.FC = () => {
  // const { isAuthenticated } = useAuth0();

  return (
    <AnimateRoutes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/home' element={<Home />} /> */}
    </AnimateRoutes>
  );
};

export default App;
