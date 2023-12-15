import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, fireDB } from '../../firebase/FirebaseConfig'
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const context = useContext(myContext)
    const { loading, setLoading } = context

    const nameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, and one number

    const validateInputs = () => {
        let isValid = true;

        if (!nameRegex.test(name)) {
            setNameError("Invalid name. Only letters and spaces are allowed.");
            isValid = false;
        } else {
            setNameError("");
        }

        if (!emailRegex.test(email)) {
            setEmailError("Invalid email address.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("At least 8 characters, one letter, and one number");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    }

    const signup = async () => {
        setLoading(true)

        if (!validateInputs()) {
            toast.error("Invalid input. Please check your fields.")
            setLoading(false)
            return;
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password)
            console.log(users)

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            }

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user)
            setName('')
            setEmail('')
            setPassword('')
            setLoading(false)
            toast.success('Signup Success')
        } catch (error) {
            toast.error("Signup Error")
            setLoading(false)
        }
    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-2 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                    {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                </div>

                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-2 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-2 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account?<Link className=' text-red-500 font-bold' to={'/login'}> Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup;
