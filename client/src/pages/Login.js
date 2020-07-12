import React from 'react'
import './login.css'

const Login = ({ register }) => (
  <form onSubmit={register} className='login-form'>
    <input type='text' name='user' placeholder='Enter username' required className='roboto'/>
    <input type="submit" value="Join chat" className='roboto'/>
  </form>
)

export default Login
