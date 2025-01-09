import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { NavLink } from "react-router-dom"

export const Home = () => {

  const {categories}=useContext(CategContext)
  console.log(categories);
  

  return (
    <div className='page'>
      {categories && categories.map(obj=>
        <Card
        key={obj.id}
        style={{
          maxHeight: "530px",
          width: '18rem'
        }}
      >
        <img
          alt="Sample"
          src={obj.photoURL}
        />
        <CardBody>
          <CardTitle tag="h5">
            <NavLink to={"/posts?ctg="+obj.name} >
              {obj.name}
            </NavLink>
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Card subtitle
          </CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the bulk of the card‘s content.
          </CardText>
          <Button>
            Button
          </Button>
        </CardBody>
      </Card>
      )}
    </div>
  )
}

