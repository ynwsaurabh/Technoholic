'use client'
import React, { useState } from 'react'
import { IconContext } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import './login.css'
import FirebaseConfig from '@/Component/Config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const router = useRouter();
    const app = FirebaseConfig();
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.replace('/home')
        }
    });

    const handleCLick = () => setIsRevealPwd(!isRevealPwd);

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        try {
            signInWithEmailAndPassword(auth, email, password).then(() => {
                toast.success('Login Success')
                router.replace('/home')
            })
            .catch((error) => {
                toast.error('Invalid email or password')
            })
        } catch (err) {
            toast.error('Invalid email or password')
        }
    };
    return (
        <>
            <div className="logoWrapper">
                <div className='logo'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="3em" height="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5,19 C17.8807119,19 19,17.8807119 19,16.5 C19,15.1192881 17.8807119,14 16.5,14 C15.1192881,14 14,15.1192881 14,16.5 C14,17.8807119 15.1192881,19 16.5,19 Z M10,5 L12,3 M7.5,10 C8.88071187,10 10,8.88071187 10,7.5 C10,6.11928813 8.88071187,5 7.5,5 C6.11928813,5 5,6.11928813 5,7.5 C5,8.88071187 6.11928813,10 7.5,10 Z M8,16 L16,8 M5.5,21 C6.88071187,21 8,19.8807119 8,18.5 C8,17.1192881 6.88071187,16 5.5,16 C4.11928813,16 3,17.1192881 3,18.5 C3,19.8807119 4.11928813,21 5.5,21 Z M18.5,8 C19.8807119,8 21,6.88071187 21,5.5 C21,4.11928813 19.8807119,3 18.5,3 C17.1192881,3 16,4.11928813 16,5.5 C16,6.88071187 17.1192881,8 18.5,8 Z M12,21 L14,19"></path ></svg >
                    <span className='title'>Technoholic</span>
                </div >
            </div >
            <div className='loginWrapper'>
                <div className="card-container">
                    <div className="container">
                        <div className="log-card">
                            <p className="heading">Login</p>
                            <p>Please enter your credentials to login.</p>

                            <div className="input-group">
                                <p className="text">Email</p>
                                <input
                                    className="input"
                                    type="emaiil"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className="text">Password</p>
                                <input
                                    className="input"
                                    type={isRevealPwd ? "text" : "password"}
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {/* <IconContext.Provider value={{ className: "revealpwd" }}>
                                    <span onClick={handleCLick}>
                                        {isRevealPwd ? (<FaRegEye />) : (<FaRegEyeSlash />)}
                                    </span>
                                </IconContext.Provider> */}
                            </div>
                            <button className="btn" onClick={handleSubmit}>Sign In</button>
                        </div>
                    </div>
                </div>

            </div>
                <div className='blank'></div>
        </>
    )
}

export default page