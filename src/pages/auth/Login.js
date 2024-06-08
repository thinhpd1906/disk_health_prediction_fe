import { useEffect, useState } from 'react'
import styles from '../../css/login.module.css'
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import { MESSAGEMAPPER } from '../../utils/messageMapper';
import ErrorAlert from '../commonComponents/ErrorAlert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useLoading } from '../../context/LoadingProvider';
const Login = () => {
    const token = localStorage.getItem("token")
    const { isLoading, setIsLoading } = useLoading();
    const [email, setEmail] = useState('')
    const [passWord, setPassWord] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      if(token) {
      navigate('/')
    }
    }, [])
    const handleEmailChange = (value) => {
        setEmail(value)
      }
      const handlePasswordChange = (value) => {
        setPassWord(value)
      }
      const handleSignIn = async () => {
        const inForSignup = {
          email: email,
          password: passWord
        }
        let isSubmit = true 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)) {
          setIsValidEmail(true)
        } else {
          setIsValidEmail(false)
          isSubmit = false
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if(passwordRegex.test(passWord)) {
          setIsValidPassword(true)
        } else {
          setIsValidPassword(false)
          isSubmit = false
        }
        if(isSubmit) {
          setIsError(false)
          setIsLoading(true)
          await signIn(inForSignup)
          .then((res) => {
            if(res.data.access_token) {
              localStorage.setItem('token', res.data.access_token)
              setErrorMessage("")
              localStorage.setItem("role", res.data.user.role)
              localStorage.setItem("userId", res.data.user.id)
              localStorage.setItem("name", res.data.user.name)
              setIsLoading(false)
              if(res.data.user.role == "ADMIN") {
                navigate('/admin/signup')
              } else {
                navigate('/')
              }
            }
          })
          .catch((err) => {
            setIsError(true)
            setIsLoading(false)
          })
        }       
      }
  const errorChange = (value) => {
    setIsError(value)
  }

     return (
          <div className={styles.singIn_Field}> 
               <h3 className={styles.singIn_Title}>Đăng nhập vào tài khoản của bạn</h3>
               <span style={{color: 'red', fontSize: '1rem'}}>{errorMessage}</span>
               <input name='email'  placeholder='Email' className={styles.singIn_Input} value={email} onChange={(e) => handleEmailChange(e.target.value)}/>
            {!isValidEmail && (
              <span style={{color: 'red', fontSize: '1rem'}}>Email invalid</span>
            )}
            <div style = {{display: "flex", position: "relative"}}>
              <input name='passWord' type= {showPassword? "text": "password"} placeholder='Password' className={styles.singIn_Input} value={passWord} onChange={(e) => handlePasswordChange(e.target.value)} />
              {showPassword? (<RemoveRedEyeOutlinedIcon onClick={() => setShowPassword(false)} style={{
                position: 'absolute',
                right: '10px',
                top: '12px'
              }} />): (<VisibilityOffOutlinedIcon onClick={() => setShowPassword(true)} style={{
                position: 'absolute',
                right: '10px',
                top: '12px'
              }} />)}
              
            </div>
            {!isValidPassword && (
              <span style={{color: 'red', fontSize: '1rem'}}>Password must include a number, a uppercase, lowercase</span>
            )}
            <button className={`${styles.singIn_Input} ${styles.submit_button} bg-dark text-light`} type='submit' onClick={handleSignIn}>Đăng nhập</button>
            <ErrorAlert description="Email or password is incorrect" isError= {isError} errorChange= {errorChange} />
          </div>
     );
} 

export default Login;