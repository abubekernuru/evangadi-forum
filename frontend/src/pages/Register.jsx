import React from 'react'
import { useRef } from 'react'

function Register() {
  return (
    <section>
      <form>
        <div>
          <span>username :---</span>
          <input type="text" placeholder='username' />
        </div>
        <div>
          <span>first name :---</span>
          <input type="text" placeholder='first name' />
        </div>
        <div>
          <span>last name :---</span>
          <input type="text" placeholder='last name' />
        </div>
        <div>
          <span>email :---</span>
          <input type="text" placeholder='email' />
        </div>
        <div>
          <span>password :---</span>
          <input type="text" placeholder='password' />
        </div>
      </form>
    </section>
  )
}

export default Register