import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SetData from './context/Auth/SetData.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SetData>
      <GoogleOAuthProvider clientId={"ENTER_CLIENT_ID"}>
        <App />
      </GoogleOAuthProvider>
    </SetData>
  </StrictMode>
)
