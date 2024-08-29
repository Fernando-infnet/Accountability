import React, { useState } from 'react';
import background from '../components/assets/background.jpg';
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [register, setRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (email.split('@')[1]?.includes('admin')) {
      setError("Email addresses with 'admin' in the domain are not allowed.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      console.log("Registered user:", userCredential.user);
      navigate("/LandingPage");
    } catch (error) {
      setError(error.message)
      console.error("Error registering user:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Logged in user:", userCredential.user);
      navigate("/LandingPage");
    } catch (error) {
      setError(error.message)
      console.error("Error logging in user:", error);
    }
  };

  const handleChange = (event, type) => {
    if(type === "email"){
        setEmail(event.target.value);
    } else {
        setSenha(event.target.value);
    }
  }

  const styles = {
    container: {
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: 'repeat(12, 1fr)', 
    },
    contentArea: {
        gridColumn: '1 / span 8',
        backgroundColor: '#e97a2b', 
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', 
        overflow: 'hidden',  
    },
    contentAreaBackground: {
        content: '""',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.25,
        zIndex: 1, 
      },
    loginArea: {
        gridColumn: '9 / span 4', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', 
        padding: '20px',
    },
    text: {
        fontSize: '26px',
        color: 'black'
    },
    texth3: {
        fontSize: '20px',
        fontWeight: '400',
        color: 'black'
    },
    border: {
        borderRadius: '36px', 
        padding: '10px', 
        border: 'solid 2px #e47862' , 
        borderColor: '#e47862', 
        outline: 'none'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentArea}>
        <div style={styles.contentAreaBackground}></div>
      </div>

      <div style={styles.loginArea}>
        <div style={styles.card}>
          {!register ? (
            <>
              <h1 style={styles.text}>
                Seja Bem vindo de volta!
              </h1>
              <h3 style={styles.texth3}>Faça login para acessar nossas operações</h3>
              <div style={{display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px'}}>
                <input type="text" placeholder='E-mail' value={email} onChange={(event) => handleChange(event, "email")} style={styles.border}/>
                <input type="password" placeholder='Senha' value={senha} onChange={(event) => handleChange(event, "senha")} style={styles.border}/>
                <button onClick={handleLogin} style={{height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} class="ColoredBox" type="submit">Prosseguir</button>
              </div>
              <button onClick={() => setRegister(true)}>Não possui conta?</button>
            </>
          ) : (
            <>
              <h1 style={styles.text}>
                Crie sua conta e junte se à nós!
              </h1>
              <div style={{display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px'}}>
                <input type="text" placeholder='E-mail' value={email} onChange={(event) => handleChange(event, "email")} style={styles.border}/>
                <input type="password" placeholder='Senha' value={senha} onChange={(event) => handleChange(event, "senha")} style={styles.border}/>
                <button onClick={handleRegister} style={{height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} class="ColoredBox" type="submit">Prosseguir</button>
              </div>
              <button onClick={() => setRegister(false)}>Possui uma conta?</button>
            </>
          )}
          {error && (
            <h4 style={{color: "red", marginTop: "10px"}}>{error}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
