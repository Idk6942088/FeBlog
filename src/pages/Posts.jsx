import React from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { readPosts } from "../utility/crudUtility";
import { sanitizeHTML } from "../utility/utils";
import { Categories } from "../components/Categories";
import { useNavigate, useSearchParams} from "react-router-dom"
import { SearchBox } from "../components/SearchBox";

export const Posts = () => {    
    const [searchParams]=useSearchParams()
    const [posts, setPosts] = useState([]);
    const [selCateg,setSelCateg] = useState(searchParams.get("ctg") ? [searchParams.get("ctg")] : [])

    const navigate=useNavigate()

    console.log(selCateg);

    useEffect(() => {
        readPosts(setPosts,selCateg);
    }, [selCateg]);

    posts.length > 0 && console.log(posts);

    return (
        <div className="page">
            <div style={{ display: "flex", flexDirection:"column", justifyContent: "space-around"}}>
              <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
                <Categories selCateg={selCateg} setSelCateg={setSelCateg} />
                {posts && <SearchBox items={posts.map(obj=>({id:obj.id,name:obj.title}))}/>}
              </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        paddingTop:"40px",
                        paddingBottom:"40px"
                    }}
                >
                    {posts.length > 0 &&
                        posts.map((obj) => (
                            <Card
                                key={obj.id}
                                style={{
                                    maxHeight: "320px",
                                    width: '18rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border:"solid 3px green",
                                  }}
                                onClick={()=>navigate("/detail/"+obj.id)}
                            >
                                <img alt="Sample" src={obj.photo.url} 
                                    style={{
                                        width: '100%',
                                        objectFit: 'cover',
                                        height: '200px',
                                      }}
                                />
                                <CardBody>
                                    <CardTitle className="text-center" tag="h5">{obj.title}</CardTitle>
                                    <div style={{display:'flex', justifyContent:'center'}}>
                                        <Button color="success">{obj.category}</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
};
