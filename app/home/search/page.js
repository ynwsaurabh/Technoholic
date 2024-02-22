'use client'
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './search.css'
import { getDatabase, ref, query, equalTo, orderByChild, startAt, endAt, get } from 'firebase/database';
import FirebaseConfig from '@/Component/Config';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const page = () => {
    const app = FirebaseConfig();
    const auth = getAuth(app);
    let isToastShown = false;
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        if (!user && !isToastShown) {
            toast.error('Login First');
            router.replace('/verify/login');
            isToastShown = true;
        }
    });
    const [event, setEvent] = useState('Battle Brain');
    const [students, setStudents] = useState([]);
    const events = [
        { value: 'Battle Brain', label: 'Battle Brain' },
        { value: 'Code Craft', label: 'Code Craft' },
        { value: 'Pixel Blitz', label: 'Pixel Blitz' },
        { value: 'Querry Quest', label: 'Querry Quest' },
        { value: 'Project Expo', label: 'Project Expo' },
        { value: 'Cryptic Hunt', label: 'Cryptic Hunt' },
        { value: 'Fun Zone', label: 'Fun Zone' },
    ]

    const handleChange = (event) => {
        setEvent(event.target.value);
        console.log(event.target.value)
    };

    const db = getDatabase(app);
    const studentsRef = ref(db, 'Students');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(studentsRef);
                if (snapshot.exists()) {
                    const students = [];
                    snapshot.forEach((childSnapshot) => {
                        const studentData = childSnapshot.val();
                        if (typeof studentData.Events === 'string') {
                            const eventsArray = studentData.Events.split(',').map(event => event.trim());
                            if (eventsArray.includes(event)) {
                                students.push({
                                    id: childSnapshot.key,
                                    Name: studentData.Name,
                                    College_Name: studentData.College_Name,
                                    Contact_Number: studentData.Contact_Number,
                                });
                            }
                        }
                    });

                    if (students.length > 0) {
                        setStudents(students);
                    } else {
                        console.log('No matching data found');
                    }
                } else {
                    console.log('Snapshot does not exist');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [event, studentsRef]);

    const handleSave = () => {
        const card = document.querySelector('.tableWrapper');

        html2canvas(card, { scale: "3" }).then((canvas) => {
            const data = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(data, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
            pdf.save(`${event}.pdf`);
        })
    }

    return (
        <div className='Wrapper'>
            <div className="logoWrapper">
                <div className='logo'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="3em" height="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5,19 C17.8807119,19 19,17.8807119 19,16.5 C19,15.1192881 17.8807119,14 16.5,14 C15.1192881,14 14,15.1192881 14,16.5 C14,17.8807119 15.1192881,19 16.5,19 Z M10,5 L12,3 M7.5,10 C8.88071187,10 10,8.88071187 10,7.5 C10,6.11928813 8.88071187,5 7.5,5 C6.11928813,5 5,6.11928813 5,7.5 C5,8.88071187 6.11928813,10 7.5,10 Z M8,16 L16,8 M5.5,21 C6.88071187,21 8,19.8807119 8,18.5 C8,17.1192881 6.88071187,16 5.5,16 C4.11928813,16 3,17.1192881 3,18.5 C3,19.8807119 4.11928813,21 5.5,21 Z M18.5,8 C19.8807119,8 21,6.88071187 21,5.5 C21,4.11928813 19.8807119,3 18.5,3 C17.1192881,3 16,4.11928813 16,5.5 C16,6.88071187 17.1192881,8 18.5,8 Z M12,21 L14,19"></path ></svg >
                    <span className='title'>Technoholic</span>
                </div >
            </div >
            <div className='searchWrapper'>
                <div className='search'></div>

                <div className='logoWrapper'>
                    <FormControl sx={{ m: 0, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-helper-label">Event</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={event}
                            label="Event"
                            defaultValue="Battle Brain"
                            onChange={handleChange}
                        >
                            {events.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="outlined" onClick={handleSave}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="2em" width="2em" ><path d="M64 464H96v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V288H336V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z"></path></svg>
                    </Button>
                </div>
                {students &&
                    <div className='tableWrapper'>
                        <h1>{event} List.</h1>
                        <TableContainer component={Paper}>
                            <Table sx={{ m: 'auto', minWidth: 700, maxWidth: 1100, marginBottom: 20 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='left'>Sr no.</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align="left">ID</StyledTableCell>
                                        <StyledTableCell align="left">Event</StyledTableCell>
                                        <StyledTableCell align="left">College</StyledTableCell>
                                        <StyledTableCell align="left">Contact</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student, index) => (
                                        <StyledTableRow key={student.id}>
                                            <StyledTableCell align="left">{index+1}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {student.Name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{student.id}</StyledTableCell>
                                            <StyledTableCell align="left">{event}</StyledTableCell>
                                            <StyledTableCell align="left">{student.College_Name}</StyledTableCell>
                                            <StyledTableCell align="left">{student.Contact_Number}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }
            </div>
        </div>
    )
}

export default page