import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { BarLoader } from 'react-spinners'
import { addPost } from '../utility/crudUtility'
import { CategContext } from '../context/CategContext'
import { CategDropdown } from '../components/CategDropdown'
import { Alert } from '../components/Alert'

export const AddEditPost = () => {

const {categories} = useContext(CategContext)
const {user}=useContext(UserContext)
const [loading,setLoading]=useState(false)
const [uploaded,setUploaded]=useState(false)
const [photo,setPhoto]=useState(null)
const [story,setStory]=useState(null)
const [selCateg,setSelCateg] = useState(null)

const {register, handleSubmit, formState: { errors },reset } = useForm({})

const onSubmit=async (data)=>{
  console.log(data.displayName);
  setLoading(true)
  let newPostData={
    ...data,
    story,
    author:user.displayName,
    userId:user.uid,
    category:selCateg,
    likes:[]
  }
  console.log(newPostData);
  
  try {
    const file = data.file[0]
    const {url,id} = await uploadFile(file)
    delete newPostData.file
    newPostData={...newPostData,photo:{url,id}}
    console.log(newPostData);
    addPost(newPostData)
    setUploaded(true)
    reset()
    setPhoto(null)
    setStory(null)

    
  } catch (error) {
    console.log(error);
    
  } finally{
    setLoading(false)
  }
}

console.log(story);


if(!user) return <Home/>

  return (
    <div className='page'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{paddingTop:"60px"}}>
          <div>
            <label >A bejegyzés címe:</label>
            <input {...register('title',{required:true})} placeholder='Title' type='text' />
            <p className='text-danger'>{errors?.title && "A cím megadása kötelező"}</p>
          </div>
          <CategDropdown categories={categories} setSelCateg={setSelCateg} selCateg={selCateg} />
          <Story setStory={setStory} uploaded={uploaded} />

          <div>
            <label >Avatar</label>
              <input {...register('file',{
                  required:true,
                  validate:(value)=>{
                      if(!value[0]) return true
                      const acceptedFormats=['jpg','png']
                      console.log(value[0]);
                      const fileExtension=value[0].name.split('.').pop().toLowerCase()
                      if(!acceptedFormats.includes(fileExtension)) return "Invalid file format"
                      if(value[0].size>1*1000*1024) return "Az engedélyezett máximális file méret 1MB"
                      return true    
                  }
                })}  type='file'
                onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
                />
                <p className='text-danger'>{errors?.file?.message}</p>
                <p className='text-danger'>{errors?.file && "Kép feltöltése kötelező!"}</p>
              </div>
              <input disabled={!selCateg || !story || story?.length<10}type="submit" />
              </div>
            </form>
            {loading && <BarLoader />}
            {uploaded && <Alert txt="Sikeres feltöltés!"/>}
        {photo && <img style={{width:"300px"}} src={photo} />}    
        </div>
      </div>
  )
}


