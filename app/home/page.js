'use client'
import React, { useEffect, useState } from 'react'
import './home.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRouter } from 'next/navigation'
import { set, get, getDatabase, ref } from "firebase/database";
import { ref as Sref, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import FirebaseConfig from '@/Component/Config';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import Uploading from '@/Component/Uploading'
import { AiOutlineLogout } from "react-icons/ai";
import FormDialog from '@/Component/Dialogs'

const page = () => {
    const [stuData, setstuData] = useState([]);
    const app = FirebaseConfig();
    const db = getDatabase(app);
    const router = useRouter();

    const auth = getAuth(app);
    let isToastShown = false;

    onAuthStateChanged(auth, (user) => {
        if (!user && !isToastShown) {
            toast.error('Login First');
            router.replace('/verify/login');
            isToastShown = true;
        }
    });

    const logout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                toast.success("User signed out successfully");
                router.replace('/verify/login')
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    }

    useEffect(() => {
        const studentRef = ref(db, 'Students')
        get(studentRef).then((snapshot) => {
            if (snapshot.exists()) {

                const techStudent = Object.entries(snapshot.val()).map(([key, data]) => ({
                    id: key,
                    ...data,
                }));
                setstuData(techStudent.reverse());
            } else {
                console.log("No Data Found")
            }
        })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, [])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [code, setCode] = useState('');
    const handleEdit = (code) => {

        setCode(code);
        router.push(`/registration/form/${code}`);
    }
    return (
        <>
            <div className="logoWrapper">
                <div className='logo'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="3em" height="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5,19 C17.8807119,19 19,17.8807119 19,16.5 C19,15.1192881 17.8807119,14 16.5,14 C15.1192881,14 14,15.1192881 14,16.5 C14,17.8807119 15.1192881,19 16.5,19 Z M10,5 L12,3 M7.5,10 C8.88071187,10 10,8.88071187 10,7.5 C10,6.11928813 8.88071187,5 7.5,5 C6.11928813,5 5,6.11928813 5,7.5 C5,8.88071187 6.11928813,10 7.5,10 Z M8,16 L16,8 M5.5,21 C6.88071187,21 8,19.8807119 8,18.5 C8,17.1192881 6.88071187,16 5.5,16 C4.11928813,16 3,17.1192881 3,18.5 C3,19.8807119 4.11928813,21 5.5,21 Z M18.5,8 C19.8807119,8 21,6.88071187 21,5.5 C21,4.11928813 19.8807119,3 18.5,3 C17.1192881,3 16,4.11928813 16,5.5 C16,6.88071187 17.1192881,8 18.5,8 Z M12,21 L14,19"></path ></svg >
                    <span className='title'>Technoholic</span>
                </div >
                {/* <h1
                    className="profileInfoEdit"
                    onClick={logout}
                    >
                    <AiOutlineLogout /> &nbsp;Logout
                </h1> */}
            </div >
            <div className="logoWrapper">
                <div></div>
                <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onEdit={handleEdit} />
            </div>
            <div className='studentWrapper'>
                <div id='profile-card-container'>
                    {stuData.map((e) => (
                        <div key={e.id} className="profile-card">
                            {e.CurrentImage && (
                                <div className="exploreCardProfilePictureContainer">
                                <img className="profilePicture" src={e.CurrentImage} alt='Profile' />
                                </div>
                            )}

                            <div id="profile-info">
                                <div className="primary-info">
                                    <span id="name">{e.id}</span>
                                    <br />
                                    <span id="name">{e.Name}</span>
                                </div>
                                <div className="secondary-info">
                                    <div id="email" >{e.Email}</div>
                                    <div id="email" >{e.College_Name}</div>
                                    <div id="email" >{e.Contact_Number}</div>
                                    <div id="email" >{e.Events}</div>
                                    <div id="email" >{e.Attendance}</div>
                                </div>
                                {/* <button id="playdate">
                                Edit &nbsp;
                                <svg className="svgIcon" width='17px' viewBox="0 0 512 512">
                                    <path fill='#ff8400' d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                </svg>
                            </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default page