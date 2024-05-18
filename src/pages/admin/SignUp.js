import { useEffect, useState } from 'react';
import styles from '../../css/signup.module.css';
import { signUp } from '../../api/auth';
import ErrorAlert from '../commonComponents/ErrorAlert';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('')
    const [passWord, setPassWord] = useState('')
    const [isValidEmai, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isValidId, setIsValidId] = useState(true)
    const [isValidFullName, setIsValidFullName] = useState(true)
    const [description, setDescription] = useState("")
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        if(localStorage.getItem("role") != "ADMIN") {
            navigate('/')
        }
    }, [])
    const handleFullNameChange = (value) => {
        setFullName(value)
    }
    const handleIdChange = (value) => {
        setId(value)
    }
    const handleEmailChange = (value) => {
        setEmail(value)
    }
    const handlePasswordChange = (value) => {
        setPassWord(value)
    }
    const handleSignUp = async () => {
        let isSubmit = true
        const inForSignup = {
            id: id,
            fullName: fullName,
            email: email,
            password: passWord,
            role: "USER"
        }

        const idRegex = /^.+$/;
        if (idRegex.test(id)) {
            setIsValidId(true)
        } else {
            setIsValidId(false)
            isSubmit = false
        }

        const fullNameRegex = /^.+$/;
        if (fullNameRegex.test(fullName)) {
            setIsValidFullName(true)
        } else {
            setIsValidFullName(false)
            isSubmit = false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setIsValidEmail(true)
        } else {
            setIsValidEmail(false)
            isSubmit = false
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (passwordRegex.test(passWord)) {
            setIsValidPassword(true)
        } else {
            setIsValidPassword(false)
            isSubmit = false
        }
        if (isSubmit) {
            await signUp(inForSignup)
                .then((res) => {
                    // redirectSignIn()
                })
                .catch((err) => {
                   
                    if(err.response.status == 403) {
                        setDescription("You don't have permission")
                        setIsError(true)
                    } else if(err && err.response && err.response.data && err.response.data.errors){
                        let errors = err.response.data.errors
                        let newDescription = ""
                        for (const [key, value] of Object.entries(errors)) {
                            let string = value.replace(/([a-z])([A-Z])/g, "$1 $2");
                            if(newDescription !== "") newDescription = newDescription + ", "
                            newDescription = newDescription + " " + string
                            setDescription(newDescription)
                            setIsError(true)
                        }
                    } else {
                        setDescription("something went wrong")
                        setIsError(true)
                    }
                })
        }
    }
    
    const errorChange = (value) => {
        setIsError(value)
    }

    return (
        <div className="layout p-3">
            <div className={styles.singIn_Field}>
                <h3 className={styles.singIn_Title}>Đăng ký tài khoản cho user</h3>
                <input name='id' placeholder='Id' className={styles.singIn_Input} value={id} onChange={(e) => handleIdChange(e.target.value)} />
                {!isValidId && (
                    <span style={{ color: 'red', fontSize: '1rem' }}>Id must not empty</span>
                )}
                <input name='fullName' placeholder='fullName'  className={styles.singIn_Input} value={fullName}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                />
                {!isValidFullName && (
                    <span style={{ color: 'red', fontSize: '1rem' }}>Full name must not empty</span>
                )}
                <input name='email' placeholder='Email' className={styles.singIn_Input} value={email} onChange={(e) => handleEmailChange(e.target.value)} />
                {!isValidEmai && (
                    <span style={{ color: 'red', fontSize: '1rem' }}>Email invalid</span>
                )}
                <input  name='passWord' placeholder='Mật khẩu' className={styles.singIn_Input} value={passWord} onChange={(e) => handlePasswordChange(e.target.value)} />
                {!isValidPassword && (
                    <span style={{ color: 'red', fontSize: '1rem' }}>Password must include a number, a uppercase, lowercase</span>
                )}
                <button className={`${styles.singIn_Input} ${styles.submit_button} bg-dark text-light`} type='submit' onClick={handleSignUp}>Đăng ký</button>
            </div>
            <ErrorAlert description={description} isError= {isError} errorChange= {errorChange} />
        </div>
    )
}

export default SignUp;