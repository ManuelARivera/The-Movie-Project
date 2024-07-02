import React, { useState } from "react"
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useAppConext } from "../hooks/useAppContext"
import { Login } from "../services/login"


export const SingIn = () => {
    const { saveUserInfo } = useAppConext()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const notify = (msg) => toast.error(msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,

    });

    const handleClick = () => setShow(!show)
    const onChange = (e) => {
        const { value, name } = e.target

        setValues(prev => ({ ...prev, [name]: value }))
    }
    const goTo = () => {
        navigate('/Signup', { replace: true })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await Login(values)
            saveUserInfo({
                user: resp.user,
                token: resp.access_token
            })

        } catch (error) {
            const isMessageArray = Array.isArray(error.message)
            let message = ''

            if (isMessageArray) {
                message = error.message.join(', ')
            }
            else {
                message = error.message || 'REQUEST ERROR'
            }
            notify(message)
        }
    }
    return (
        <div className="singin-container">
            <div className="singin-form">
                <form onSubmit={onSubmit} >
                    <Box display={"flex"} flexDir={"column"} gap={"12px"} maxW={"400px"} margin={"auto"}>
                        <Input color='#EBF5FB' variant='flushed' placeholder="Email" size='md' name='email' value={values.email} onChange={onChange} />
                        <InputGroup size='md'>
                            <Input color='#EBF5FB' pr='4.5rem' type={show ? 'text' : 'password'} variant='flushed' placeholder="Password" size='md' name='password' onChange={onChange} />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button type="submit">Sign in</Button>
                        <Button marginTop='10px' color='#EBF5FB' variant='link' onClick={goTo}>Registrate</Button>
                    </Box>
                </form>

            </div>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    )
}
