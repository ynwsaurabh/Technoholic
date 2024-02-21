'use client'
import React, { useEffect, useRef, useState } from 'react'
import './form.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRouter } from 'next/navigation'
import { set, get, getDatabase, ref } from "firebase/database";
import { ref as Sref, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import FirebaseConfig from '@/Component/Config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify';
import Uploading from '@/Component/Uploading';
import Button from '@mui/material/Button';

const form = () => {
    const [loading, setLoading] = useState(false)
    const app = FirebaseConfig();
    const db = getDatabase(app);
    const router = useRouter();
    const [checkboxes, setCheckboxes] = useState([
        { label: 'Battle Brain', value: 'Battle Brain', isChecked: false },
        { label: 'Code Craft', value: 'Code Craft', isChecked: false },
        { label: 'Pixel Blitz', value: 'Pixel Blitz', isChecked: false },
        { label: 'Querry Quest', value: 'Querry Quest', isChecked: false },
        { label: 'Project Expo', value: 'Project Expo', isChecked: false },
        { label: 'Cryptic Hunt', value: 'Cryptic Hunt', isChecked: false },
        { label: 'Fun Zone', value: 'Fun Zone', isChecked: false },
    ]);

    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        College_Name: '',
        Class: '',
        Contact_Number: '',
        Events: [],
        Attendance: 'Absent',
        id: '',
        Scan: 0,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prevData) => {
                const updatedEvents = checked
                    ? [...prevData.Events, value]
                    : prevData.Events.filter((event) => event !== value);

                return {
                    ...prevData,
                    Events: updatedEvents,
                };
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }
    const [currentImg, setCurrentImg] = useState(null)

    const handleImage = () => {
        const inputImage = document.getElementById('inputImage');
        inputImage.click();
        inputImage.addEventListener("change", (event) => {

            setCurrentImg(URL.createObjectURL(event.target.files[0]))
        });
    }
    const [clgID, setClgID] = useState(null)
    const handleID = () => {
        const inputID = document.getElementById('inputID');
        inputID.click();
        inputID.addEventListener("change", (event) => {
            setClgID(URL.createObjectURL(event.target.files[0]))
        });
    }
    // Image Cropper

    const [crop, setCrop] = useState({ aspect: 1 });
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);

    const getCroppedImage = () => {
        if (!image) {
            console.error('Image not loaded');
            return;
        }
        console.log(image);
        const canvas = document.createElement('canvas');
        canvas.width = 216;
        canvas.height = 216;

        const ctx = canvas.getContext('2d');

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        // canvas.width = crop.width;
        // canvas.height = crop.height;

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            216,
            216,
        );

        const base64Image = canvas.toDataURL('image/jpeg');
        setResult(base64Image);
    }
    // End Image Cropper
    const [dialogOpen, setDialogOpen] = useState(false);
    const [code, setCode] = useState('');
    // const handleEdit = (code) => {

    //     setCode(code);
    //     router.push(`/registration/form/${code}`);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Array.isArray(formData.Events) || formData.Events.length === 0) {
            toast.error('select atleast one event!');
        } else if (currentImg == null) {
            toast.error('Select Current Image!')
        } else if (result == null) {
            toast.error('Crop your image!')
        } else if (clgID == null) {
            toast.error('Select your  College ID /Fee Receipt!')
        } else {
            console.log(formData)
            setLoading(true);
            const { Name, Email, College_Name, Class, Contact_Number, Events } = formData;
            function generateRandomKey() {
                const prefix = "TECHNO24";
                const randomDigits = Math.floor(Math.random() * (999 - 10 + 1) + 10);
                return prefix + randomDigits;
            }
            const randomKey = generateRandomKey();
            console.log('result:', result);
            const blob = await fetch(clgID).then((res) => res.blob());
            console.log('ID:', blob);

            const byteCharacters = atob(result.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob2 = new Blob([byteArray], { type: 'image/png' });

            const studentsRef = ref(db, `Students/${randomKey}`)
            const storage = getStorage(app);
            const storageRef = Sref(storage, '/Images' + `/${randomKey}.png`)
            const storageIDRef = Sref(storage, '/ID' + `/${randomKey}.png`)
            await uploadBytes(storageRef, blob2);
            await uploadBytes(storageIDRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            const IDdownloadURL = await getDownloadURL(storageIDRef);

            const eventsString = Events.join(', ');
            const newData = {
                Name: Name,
                Email: Email,
                id: randomKey,
                Attendance: 'Absent',
                College_Name: College_Name,
                Class: Class,
                Contact_Number: Contact_Number,
                Events: eventsString,
                CurrentImage: downloadURL,
                Scan: 0,
                idImage: IDdownloadURL,
            }

            const dataSend = {
                email: Email,
                name: Name,
                key: randomKey
            }
            const res = await fetch("/api/email", {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.status > 199 && res.status < 300) {
                    }
                });

            set(studentsRef, newData).then(() => {
                toast.success("Form Submitted successfully")
                setLoading(false);
                router.replace(`/registration/form/greeting`);
            })
        }
    };

    // const handleLogin = () => {
    //     router.push('/verify/login');
    // }
    const handleClear = () => {
        setFormData({
            Name: '',
            Email: '',
            College_Name: '',
            Class: '',
            Contact_Number: '',
            Events: [],
            Attendance: 'Absent',
            id: '',
            Scan: 0,
        })
        setImage(null);
        setResult(null);
        setClgID(null);
        setCurrentImg(null);
    }

    return (
        <div className='bannerWrapper cardWrapper'>
            <div className="buttonWrapper">
                <div className='logo'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="3em" height="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5,19 C17.8807119,19 19,17.8807119 19,16.5 C19,15.1192881 17.8807119,14 16.5,14 C15.1192881,14 14,15.1192881 14,16.5 C14,17.8807119 15.1192881,19 16.5,19 Z M10,5 L12,3 M7.5,10 C8.88071187,10 10,8.88071187 10,7.5 C10,6.11928813 8.88071187,5 7.5,5 C6.11928813,5 5,6.11928813 5,7.5 C5,8.88071187 6.11928813,10 7.5,10 Z M8,16 L16,8 M5.5,21 C6.88071187,21 8,19.8807119 8,18.5 C8,17.1192881 6.88071187,16 5.5,16 C4.11928813,16 3,17.1192881 3,18.5 C3,19.8807119 4.11928813,21 5.5,21 Z M18.5,8 C19.8807119,8 21,6.88071187 21,5.5 C21,4.11928813 19.8807119,3 18.5,3 C17.1192881,3 16,4.11928813 16,5.5 C16,6.88071187 17.1192881,8 18.5,8 Z M12,21 L14,19"></path ></svg >
                    <span className='title'>Technoholic</span>
                </div >
                {/* <button className="button" onClick={handleLogin}>Sign In</button> */}
            </div >
            <div className="technoBanner"></div>
            <div className='cardWrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='formWrapper'>

                        <div className="header">
                            <div className="JH79cc RVEQke"></div>
                            <div className="heading" dir="auto" role="heading" aria-level="1">
                                <b>KBP College Thane in association with Prodware Solutions.</b>
                            </div>
                            <div className='seprator'></div>
                            <div className="md0UAd" aria-hidden="true" dir="auto">* Indicates required question</div>
                        </div>

                        <div className='geS5n'>
                            <b>Email</b>< span className='require'>*</span>
                            <div className='field'>
                                <input
                                    className='emailInp'
                                    name='Email'
                                    type='email'
                                    placeholder='Your email'
                                    value={formData.Email}
                                    onChange={handleChange}
                                    required />
                                <div className='line'></div>
                            </div>
                        </div>
                        {loading && <Uploading />}

                        <div className='aboutTechno'>
                            <div className='geS5n'>
                                <div className="meSK8 M7eMe" role="heading" aria-level="2">
                                    <b>TECHNOHOLIC</b>
                                </div>
                                <div className="spb5Rd OIC90c">
                                    <b>~Where Knowledge Meets Innovation.</b>
                                    <div>
                                        <b><br></br></b>
                                    </div>
                                    <div>
                                        <b>Note:</b>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                                <b>&nbsp;Participants should upload his/her current Photo.</b>
                                            </li>
                                            <li>
                                                <b>Make sure that your current photo should be clear, if your Photo is not clear then registration will not proceed further.</b>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <b>Privacy Disclaimer :</b>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                                <b>Your privacy is important to us. By completing and submitting this form, you acknowledge and consent to the collection and processing of the personal information you provide. The information collected in this form will be used for the purpose of processing your registration and contacting you regarding your inquiry.</b>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='geS5n'>
                            <b>Full Name</b>< span className='require'>*</span>
                            <div className='field'>
                                <input
                                    className='emailInp'
                                    name='Name'
                                    type='text'
                                    placeholder='Your answer'
                                    value={formData.Name}
                                    onChange={handleChange}
                                    required />
                                <div className='line'></div>
                            </div>
                        </div>

                        <div className='geS5n'>
                            <b>College Name</b>< span className='require'>*</span>
                            <div className='field'>
                                <input
                                    className='emailInp'
                                    type='text'
                                    name='College_Name'
                                    placeholder='Your answer'
                                    value={formData.College_Name}
                                    onChange={handleChange}
                                    required />
                                <div className='line'></div>
                            </div>
                        </div>

                        <div className='geS5n'>
                            <b>Class</b>< span className='require'>*</span>
                            <div className='field'>
                                <input
                                    className='emailInp'
                                    type='text'
                                    name='Class'
                                    placeholder='Your answer'
                                    value={formData.Class}
                                    onChange={handleChange}
                                    required />
                                <div className='line'></div>
                            </div>
                        </div>

                        <div className='geS5n'>
                            <b>Contact Number</b>< span className='require'>*</span>
                            <div className='field'>
                                <input
                                    className='emailInp'
                                    type='phone'
                                    name='Contact_Number'
                                    placeholder='Your answer'
                                    value={formData.Contact_Number}
                                    onChange={handleChange}
                                    required />
                                <div className='line'></div>
                            </div>
                        </div>

                        <div className='geS5n'>
                            <b>Events</b><span className='require'>*</span>
                            <div className='field'>
                                {checkboxes.map((checkbox, index) => (
                                    <div className="checkbox-wrapper-33" key={index}>
                                        <label className="checkbox">
                                            <input
                                                className="checkbox__trigger visuallyhidden"
                                                type="checkbox"
                                                name={checkbox.value}
                                                value={checkbox.value}
                                                checked={formData.Events.includes(checkbox.value)}
                                                onChange={handleChange}
                                            />
                                            <span className="checkbox__symbol">
                                                <svg
                                                    aria-hidden="true"
                                                    className="icon-checkbox"
                                                    width="28px"
                                                    height="28px"
                                                    viewBox="0 0 28 28"
                                                    version="1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M4 14l8 7L24 7"></path>
                                                </svg>
                                            </span>
                                            <p className="checkbox__textwrapper">{checkbox.label}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='geS5n'>
                            <b>Upload your Current Image </b>< span className='require'>*</span>

                            {currentImg == null ? (
                                <div className='field'>
                                    <input id="inputImage" accept="image/*" type="file" name="image" style={{ display: 'none' }} />
                                    <div className="button" onClick={handleImage}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><g transform="translate(-3, -3)"><path d="M6,14.25 L7.5,14.25 L7.5,16.5 L16.5,16.5 L16.5,14.25 L18,14.25 L18,16.5 C18,17.325 17.325,18 16.5,18 L7.5,18 C6.675,18 6,17.325 6,16.5 L6,14.25 Z M9.3075,10.8075 L11.25,8.8725 L11.25,15 L12.75,15 L12.75,8.8725 L14.6925,10.815 L15.75,9.75 L12,6 L8.25,9.75 L9.3075,10.8075 Z" fill="#1a73e8"></path><path fill="#1a73e8"></path></g></svg>
                                        &nbsp; Add file
                                    </div>
                                </div>)
                                : (

                                    <div className='ImageCropper'>
                                        <ReactCrop src={currentImg} crop={crop} onChange={c => setCrop(c)}>
                                            <img src={currentImg} onLoad={(e) => setImage(e.target)} />
                                        </ReactCrop>
                                        <br />
                                        <a className='button' onClick={getCroppedImage}> Crop Image</a>
                                    </div>

                                )
                            }
                            {result &&
                                <div>
                                    <img src={result} />
                                </div>
                            }
                        </div>

                        <div className='geS5n'>
                            <b>Upload Your College ID /Fee Receipt </b>< span className='require'>*</span>

                            {clgID == null ? (
                                <div className='field'>
                                    <input id="inputID" accept="image/*" type="file" name="image" hidden />
                                    <div className="button" onClick={handleID}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><g transform="translate(-3, -3)"><path d="M6,14.25 L7.5,14.25 L7.5,16.5 L16.5,16.5 L16.5,14.25 L18,14.25 L18,16.5 C18,17.325 17.325,18 16.5,18 L7.5,18 C6.675,18 6,17.325 6,16.5 L6,14.25 Z M9.3075,10.8075 L11.25,8.8725 L11.25,15 L12.75,15 L12.75,8.8725 L14.6925,10.815 L15.75,9.75 L12,6 L8.25,9.75 L9.3075,10.8075 Z" fill="#1a73e8"></path><path fill="#1a73e8"></path></g></svg>
                                        &nbsp; Add file
                                    </div>
                                </div>
                            ) : (
                                <div className='ImageCropper'>
                                    <img src={clgID} style={{ width: 250, height: 200 }} />
                                </div>
                            )}

                        </div>
                        <div className='buttonWrapper'>
                            <button className='buttonSubmit' type='submit'>Submit</button>
                            {/* <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onEdit={handleEdit} /> */}
                            <Button variant="outlined" onClick={handleClear}>
                                Clear form
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div >

    )

}

export default form