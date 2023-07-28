import React from 'react'
import './login.style.scss'
import { useHistory } from 'react-router-dom'
import { isLogin } from './login.utils'
import { LoginForm } from './components/LoginForm'
// import react antdesignFullLogo from '../../assets/login/react antdesign.png'

const Login = () => {
  const history = useHistory()

  if (isLogin()) {
    history.push('/')
  }

  return (
    <div>
      {/* <img className='login-react antdesign-full-logo' src={react antdesignFullLogo} alt='logo' /> */}
      <div className='login'>
        <div className='form'>
          <div className='form-title'>
            <div className='form-title--text'>ورود به حساب کاربری</div>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
