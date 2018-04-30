import auth0 from 'auth0-js'
import history from '../App/history'
import { AUTH0_CONFIG } from './auth0-config'

class AuthService {
  auth0 = new auth0.WebAuth({
    domain: AUTH0_CONFIG.domain,
    clientID: AUTH0_CONFIG.clientId,
    redirectUri: AUTH0_CONFIG.callbackUrl,
    audience: `https://${AUTH0_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

  login() {
    this.auth0.authorize()
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('profile')
    history.replace('/')
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('expiresIn: ', authResult.expiresIn)
        console.log(authResult.idTokenPayload)
        this.setSession(authResult)
        history.replace('/')
      } else if (err) {
        console.log('Err: ', err)
      }
    })
  }

  setSession(authResult) {
    let { sub, name, nickname, picture, email } = authResult.idTokenPayload
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('profile', JSON.stringify({
      sub,
      name,
      nickname,
      picture,
      email,
    }))
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getUserProfile() {
    let userProfile = JSON.parse(localStorage.getItem('profile')) || {}
    return userProfile
  }
}

export default AuthService