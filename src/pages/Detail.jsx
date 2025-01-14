import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readLikes, readPost, toggleLike } from '../utility/crudUtility'
import { useState } from 'react'
import parse from 'html-react-parser'
import { MdDelete } from "react-icons/md";
import { useConfirm } from 'material-ui-confirm'
import { delPhoto } from '../utility/uploadFile'
import { UserContext } from '../context/UserContext'
import { Alert } from '../components/Alert'
import { useContext } from 'react'
import { MdThumbUp } from 'react-icons/md';


export const Detail = () => {

    const [post,setPost]=useState(null)

    const params=useParams()
    const navigate=useNavigate()
    const confirm=useConfirm()
    const {user} = useContext(UserContext)
    const[txt,setTxt]=useState(null)

    console.log(params.id);
    

    useEffect(()=>{
        readPost(params.id,setPost)
    },[])

    post && console.log(post);
    
    const handleDelete=async ()=>{
      try {
        await confirm({
          description:"Ez a művelet nem vonható vissza!",
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztos ki szeretnéd törölni a bejegyzést?"
      })

      deletePost(post.id)
      delPhoto(post.photo.id)
      navigate('/posts')

      } catch (error) {
        console.log(error);
        
      }
    }
    const handleLikes=()=>{
      if(!user) setTxt("Valami szöveg")
        else{
          toggleLike(user.uid,post.id)
    }}

  return (
    <div className='page' style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: '20px',
      paddingBottom: '20px',
    }}>
      {post && 
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
        }}>
          <img src={post.photo['url']} alt={post.title} style={{ maxWidth: '350px' }} />
          
          <div style={{
            maxWidth: '350px',
            wordWrap: 'break-word',
          }}>
            {parse(post.story)}
          </div>
        </div>
      }
    
      <div className='button-container' style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
      }}>
        <button
          className='btn'
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.2s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          onClick={() => navigate('/posts')}
        >
          Vissza
        </button>
    
        <button
          className='btn'
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.2s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          onClick={handleLikes}
        >
        <MdThumbUp style={{ marginRight: '5px' }} />
        </button>
    
        {post && (
          <span
            style={{
              fontSize: '16px',
              color: '#333',
            }}
          >
            Likes number: {post?.likes.length}
          </span>
        )}

        {user && post && user.uid === post.userId && (
          <>
            <button
              className='btn'
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              onClick={handleDelete}
            >
            <MdDelete style={{ marginRight: '5px' }} />
            </button>
    
            <button
              className='btn'
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              onClick={() => navigate('/update/' + post.id)}
            >
              Edit post...
            </button>
          </>
        )}
      </div>
    
      {txt && <Alert txt={txt} err={false} />}
    </div>
    
    
  )
}
