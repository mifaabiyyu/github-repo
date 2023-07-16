import { motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

const AnimateRoutes = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <motion.div
      initial='initial'
      animate='enter'
      exit='exit'
      variants={{
        initial: { opacity: 0, y: 50 },
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
      }}
      transition={{ duration: 0.3 }}>
      <Routes location={location} key={location.pathname}>
        {children}
      </Routes>
    </motion.div>
  );
};

export default AnimateRoutes;
