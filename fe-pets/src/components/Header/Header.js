import React from 'react'
import UserInfo from '../UserInfo/UserInfo'
import './Header.css'

const Header = (props) => {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="app-title">PetStore Demo</h1>
        <UserInfo {...props} />
      </div>
    </header>
  )
}

export default Header