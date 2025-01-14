import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { NavLink } from "react-router-dom"

export const Home = () => {

  const {categories}=useContext(CategContext)
  console.log(categories);
  

  return (
    <div
  className='page'
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-evenly',
  }}
>
  {categories && categories.map(obj =>
    <Card
      key={obj.id}
      style={{
        maxHeight: "300px",
        width: '18rem',
        display: 'flex',
        flexDirection: 'column',
        border:"solid 3px green",
      }}
    >
      <img
        alt="Sample"
        src={obj.photoURL}
        style={{
          width: '100%',
          objectFit: 'cover',
          height: '200px',
        }}
      />
      <CardBody>
        <CardSubtitle
          className="mb-2 text-muted text-center "
          tag="h6"
        >
          {obj.name}
        </CardSubtitle>
        <NavLink
          to={"/posts?ctg=" + obj.name}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none"
          }}
        >
          <Button color='success'>
            Tovább
          </Button>
        </NavLink>
      </CardBody>
    </Card>
  )}
</div>

  )
}

