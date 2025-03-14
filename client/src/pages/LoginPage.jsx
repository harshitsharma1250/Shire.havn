import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const LoginPage = () => {

  const [email, setEmail] = useState("") ;
  const [password, setPassword] = useState("") ;
  const [redirect, setRedirect] = useState(false) ;

  const {user, setUser} = useContext(UserContext)

  const loginUser = async (e) =>{

    e.preventDefault();

    try {
      const {data} = await axios.post('/login',{
        email: email ,
        password: password,
      })
      console.log("user before ", user)
      setUser(data.user);
      console.log("user after ", user)
      setRedirect(true);

      alert("Login successful")
    }
    catch (error) {
      console.log(error.message, "Can't login user from frontend")
      alert("Login failed")
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  
  return (
    <motion.div 
      className="mt-4 grow flex items-center justify-around"
      initial={{ opacity: 0, y: 50 }} // Fade in + Slide up
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="mb-64"
        initial={{ scale: 0.9, opacity: 0 }} // Subtle scale effect
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h1 
          className="text-4xl text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Login
        </motion.h1>

        <motion.form 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={loginUser}
        >
          <input 
            type="email" 
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />
          <motion.button 
            className="primary w-full py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

          <motion.div 
            className="text-center py-2 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Don&apos;t have an account yet? 
            <Link className="underline text-black ml-1" to={'/register'}>
              Register now
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
