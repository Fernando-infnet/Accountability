import React, { useState } from 'react';
import NavigationBar from '../components/navbar';
import ContactForm from '../components/ContactForm';
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';

const CreateAdmins = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {

        if (!(email.split('@')[1]?.includes('admin'))) {
          setError("Email sem 'admin' após o @ não estão permitidos");
          return;
        }
    
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
          console.log("Registered user:", userCredential.user);
        } catch (error) {
          setError(error.message)
          console.error("Error registering user:", error);
        }

        setEmail('');
        setSenha('');
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
        <div>
        <NavigationBar />
        <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "30px"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center" , flexDirection: "column"}} className="container mt-5 px-0">
                <h1 style={styles.text}>
                    Faça o Registro de admin
                </h1>
                <div class="sizing" style={{display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px'}}>
                    <input type="text" placeholder='E-mail' value={email} onChange={(event) => handleChange(event, "email")} style={styles.border}/>
                    <input type="password" placeholder='Senha' value={senha} onChange={(event) => handleChange(event, "senha")} style={styles.border}/>
                    <button onClick={handleRegister} style={{height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} class="ColoredBox" type="submit">Prosseguir</button>
                </div>
                {error && (
                <h4 style={{color: "red", marginTop: "10px"}}>{error}</h4>
                )}
            </div>
        </div>
        </div>
    );
};

export default CreateAdmins;