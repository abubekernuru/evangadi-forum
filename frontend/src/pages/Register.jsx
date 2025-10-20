import { useRef } from 'react'
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Auth.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function Register() {

  const navigate = useNavigate();

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;


    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("please provide all required information");
      return;
    }

    try {
      await axios.post('/users/register', {
        username: usernameValue,
        first_name: firstValue,
        last_name: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successful. please login");
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert("registration failed");
    }
  }

  return (
    <>
      <Header />
      <section className="auth-page">
        <main className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Register</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <label className="form-row">
                <span className="label">Username</span>
                <input ref={usernameDom} type="text" placeholder='username' />
              </label>
              <label className="form-row">
                <span className="label">First name</span>
                <input ref={firstnameDom} type="text" placeholder='first name' />
              </label>
              <label className="form-row">
                <span className="label">Last name</span>
                <input ref={lastnameDom} type="text" placeholder='last name' />
              </label>
              <label className="form-row">
                <span className="label">Email</span>
                <input ref={emailDom} type="text" placeholder='email' />
              </label>
              <label className="form-row">
                <span className="label">Password</span>
                <input ref={passwordDom} type="password" placeholder='password' />
              </label>
              <div className="actions">
                <button className="btn" type="submit">Register</button>
                <Link className="link" to="/login">Login</Link>
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

export default Register