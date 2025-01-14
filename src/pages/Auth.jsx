import React from 'react'
import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { midleStyle } from '../utils'


export const Auth = () => {
  const {user,signInUser,signUpUser,msg}=useContext(UserContext)
  const navigate=useNavigate()

  const location=useLocation()
  console.log(location.pathname);
  const isSignIn=location.pathname=='/auth/in'//true vagy false
  
console.log(msg);

  const handleSubmit=(event)=>{
    event.preventDefault
     const data=new FormData(event.currentTarget)
    console.log(data.get('email'),data.get('password'),data.get('displayName')); 
    if(isSignIn){
      signInUser(data.get('email'),data.get('password'))
    }else{
      //regisztráció
      signUpUser(data.get('email'),data.get('password'),data.get('displayName'))
    }
      
  }

 console.log(user);
  
  return (
    <div className='page' style={{
      backgroundColor: '#80e188',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
      }}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
        }}>
          {isSignIn ? 'Bejelentkezés' : 'Regisztráció'}
        </h3>
    
        <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <Label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</Label>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
          </FormGroup>
    
          <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <Label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Jelszó</Label>
            <Input
              name="password"              
              type="password"
              placeholder="Jelszó"
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
          </FormGroup>
    
          {!isSignIn && (
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <Label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Felhasználónév</Label>
              <Input
                name="displayName"
                type="text"
                placeholder="Felhasználónév"
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </FormGroup>
          )}
    
          <Button
            style={{
              padding: '10px 20px',
              backgroundColor: '#198754',
              color: 'white',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              alignSelf: 'center',
            }}
          >
            Jóváhagyás
          </Button>
        </Form>
    
        <a
          href="#"
          onClick={() => navigate('/pwreset')}
          style={{
            display: 'block',
            marginTop: '10px',
            color: 'black',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          Elfelejtett jelszó...
        </a>
    
        {msg && <Toastify {...msg} style={{ marginTop: '20px' }} />}
      </div>
    </div>
    
  )
}


