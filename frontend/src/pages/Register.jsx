import { useRef } from 'react'
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username :---</span>
          <input ref={usernameDom} type="text" placeholder='username' />
        </div>
        <div>
          <span>first name :---</span>
          <input ref={firstnameDom} type="text" placeholder='first name' />
        </div>
        <div>
          <span>last name :---</span>
          <input ref={lastnameDom} type="text" placeholder='last name' />
        </div>
        <div>
          <span>email :---</span>
          <input ref={emailDom} type="text" placeholder='email' />
        </div>
        <div>
          <span>password :---</span>
          <input ref={passwordDom} type="password" placeholder='password' />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </section>
  )
}

export default Register