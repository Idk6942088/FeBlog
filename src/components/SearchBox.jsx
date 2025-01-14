import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import zIndex from '@mui/material/styles/zIndex'
import { useNavigate } from 'react-router-dom'

export const SearchBox=({items})=> {

    const navigate=useNavigate()


  const handleOnSearch = (string, results) => {
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    console.log(result)
  }

  const handleOnSelect = (item) => {
    console.log(item)
    navigate('/detail/'+item.id)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}> {item.name}</span>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            style={{zIndex:'100'}}
          />
        </div>
      </header>
    </div>
  )
}