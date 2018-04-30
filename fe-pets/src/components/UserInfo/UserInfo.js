import React from 'react'
import './UserInfo.css'

const UserInfo = props => {
  const { isAuthenticated } = props.auth
  const profile = props.auth.getUserProfile()
  return (
    <div id="user-info">
        { !isAuthenticated() && (
          <div>
            <button className="button" onClick={() => {props.auth.login()}}>Log In</button>
          </div>
          )}
        { isAuthenticated() && (
          <div>
            { profile && (
              <img src={profile.picture} />
            )}
            <button className="button" onClick={() => {props.auth.logout()}}>Log Out</button>
          </div>
        )}
      </div>
  )
}

export default UserInfo