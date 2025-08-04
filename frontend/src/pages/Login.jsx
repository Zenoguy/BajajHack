import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      alert('Login failed');
      return;
    }

    try {
      await axios.post('http://localhost:4000/send-uuid', {
        token: credentialResponse.credential,
      });
      navigate('/dashboard');
    } catch (error) {
      alert('Error sending UUID: ' + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Welcome to <span>DevGeeks</span></h1>
        <p>Sign in to continue</p>
        <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Login Failed')} />
      </div>
    </div>
  );
}

export default Login;
