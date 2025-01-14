import React from "react";
import { useContext } from "react";

import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { delPhoto, uploadFile } from "../utility/uploadFile";
import { BarLoader } from "react-spinners";
import { Toastify } from "../components/Toastify";
import { useEffect } from "react";
import { extractUrlAndId } from "../utility/utils";
import { useConfirm } from "material-ui-confirm"
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
    const { user, updateUser, msg, deleteAccount, logoutUser } = useContext(UserContext);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const confirm=useConfirm()
    const navigate=useNavigate()

    useEffect(()=>{
      !user && navigate("/")
    },[user])

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            displayName: user?.displayName || "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data.displayName);
        setLoading(true);
        try {
            const file = data?.file ? data?.file[0] : null;
            const { url, id } = file ? await uploadFile(file) : null;
            updateUser(data.displayName, url + "/" + id);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () =>{
      try {
        await confirm({
          description:"Ez a művelet nem vonható vissza!",
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztos ki szeretnéd törölni a fiókod?"
      })

      await deleteAccount()
      logoutUser()
      delPhoto(user.photoURL.split("/").pop())
      console.log(user);
      
      navigate("/")

      } catch (error) {
        console.log(error);
        
      }
    }

    return (
        <div className="page" style={{
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
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                Felhasználói fiók beállítás
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Felhasználónév:</label>
                  <input
                    {...register("displayName")}
                    placeholder="felhasználónév"
                    type="text"
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      fontSize: '16px',
                    }}
                  />
                </div>
          
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Avatar</label>
                  <input
                    {...register("file", {
                      validate: (value) => {
                        if (!value[0]) return true;
                        const acceptedFormats = ["jpg", "png"];
                        const fileExtension = value[0].name.split(".").pop().toLowerCase();
                        if (!acceptedFormats.includes(fileExtension)) return "Invalid file format";
                        if (value[0].size > 1 * 1000 * 1024) return "Az engedélyezett maximális fájlméret 1MB";
                        return true;
                      },
                    })}
                    type="file"
                    onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginBottom: '10px',
                    }}
                  />
                  <p className="text-danger" style={{ margin: 0 }}>{errors?.file?.message}</p>
                </div>
          
                <input
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    alignSelf: 'center',
                  }}
                />
                   <button
              className="btn btn-danger"
              onClick={handleDelete}
              style={{
                display:'flex',
                marginTop: '5px',
                padding: '10px 10px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#dc3545',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                alignSelf:'center'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Fiók törlése
            </button>
              </form>
          
              {loading && <BarLoader style={{ marginTop: '20px' }} />}
          
              {msg && <Toastify {...msg} style={{ marginTop: '20px' }} />}
          
              {avatar && <img className="img-fluid" src={avatar} alt="Avatar" style={{ width: '100px', marginTop: '20px', borderRadius: '50%' }} />}
            </div>
          </div>
          
    );
};
