import { useRef } from 'react'
import axios from '../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function Login() {
  const navigate = useNavigate()

  const emailDom = useRef()
  const passwordDom = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    const emailValue = emailDom.current.value
    const passValue = passwordDom.current.value

    if (!emailValue || !passValue) {
      alert('please provide all required information')
      return
    }

    try {
      const { data } = await axios.post('/users/login', {
        email: emailValue,
        password: passValue,
      })
      alert('Login successful. Welcome back!')
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      alert(err?.response?.data?.msg || 'Login failed')
      console.log(err?.response?.data || err)
    }
  }

  return (
    <>
      <Header />
      <section className="auth-page">
        <main className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <label className="form-row">
                <span className="label">Email</span>
                <input ref={emailDom} type="text" placeholder="email" />
              </label>
              <label className="form-row">
                <span className="label">Password</span>
                <input ref={passwordDom} type="password" placeholder="password" />
              </label>
              <div className="actions">
                <button className="btn" type="submit">
                  Login
                </button>
                <Link className="link" to="/register">
                  Register
                </Link>
              </div>
            </form>
          </div>

          <aside className="auth-about">
            <h3>About Evangadi Q&amp;A</h3>
            <p>
              Evangadi Forum is a community Q&amp;A platform for learners and
              developers. Ask practical questions, share solutions, and collaborate
              with peers to grow your skills.
            </p>
            <ul>
              <li>Ask clear, focused questions</li>
              <li>Share reproducible examples</li>
              <li>Help others and earn recognition</li>
            </ul>
          </aside>
        </main>
      </section>
      <Footer />
    </>
  )
}

export default Login