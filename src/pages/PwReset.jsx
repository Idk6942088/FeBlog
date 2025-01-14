import React from 'react'
import { midleStyle } from '../utils'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'


export const PwReset = () => {
  const {msg,resetPassword}=useContext(UserContext)

  const handleSubmit=(event)=>{
    event.preventDefault()
     const data=new FormData(event.currentTarget)
     console.log(data.get('email'));
     
   resetPassword(data.get('email'))
  }
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
          Jelszó módosítás
        </h3>
    
        <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <Label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
          </FormGroup>

          <Button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#198754',
              color: 'white',
              fontSize: '16px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              alignSelf: 'center',
            }}
          >
            Új jelszó igénylése
          </Button>
        </Form>
    
        {msg && <Toastify {...msg} style={{ marginTop: '20px' }} />}
      </div>
    </div>
    
  )
}