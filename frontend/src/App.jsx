import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const handleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      alert('No credential received');
      return;
    }

    try {
      await axios.post('http://localhost:4000/send-uuid', {
        token: credentialResponse.credential,
      });
      alert('UUID sent to your email!');
    } catch (error) {
      alert('Error sending UUID: ' + error.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ padding: '2rem' }}>
        <h1>Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert('Login Failed')}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
