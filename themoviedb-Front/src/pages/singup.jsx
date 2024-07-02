import React, { useState } from "react"
import {
    InputGroup,
    InputRightElement,
    Input,
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Register } from "../services/register";
import { ToastContainer, toast } from 'react-toastify'
import { useAppConext } from "../hooks/useAppContext";


export const SingUp = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { saveUserInfo } = useAppConext()
    const navigate = useNavigate()
    const toast = useToast();

    const Overlay = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )

    const notify = (msg) => toast({
        title: "Error",
        description: msg,
        status: "error",
        duration: 5000,
        isClosable: true,
    });

    const handleClick = () => setShow(!show)

    const onChange = (e) => {
        const { value, name } = e.target

        setValues(prev => ({ ...prev, [name]: value }))
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/Signin', { replace: true })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const resp = await Register(values)

            openModal()

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
        <>
            <div className="singup-container">
                <div className="singin-form">
                    <form onSubmit={onSubmit} >
                        <Box display={"flex"} flexDir={"column"} gap={"12px"} maxW={"400px"} margin={"auto"}>
                            <Input color='#EBF5FB' variant='flushed' placeholder="Email" size='md' name='email' value={values.email} onChange={onChange} />
                            <Input color='#EBF5FB' variant='flushed' placeholder="name" size='md' name='name' value={values.name} onChange={onChange} />
                            <InputGroup size='md'>
                                <Input color='#EBF5FB' pr='4.5rem' type={show ? 'text' : 'password'} variant='flushed' placeholder="Password" size='md' name='password' value={values.password} onChange={onChange} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Button type="submit">Sign up</Button>
                            <Button marginTop='10px' color='#EBF5FB' variant='link' onClick={closeModal}>Login</Button>
                        </Box>
                    </form>

                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
            <Modal isOpen={isModalOpen} isCentered>
                {Overlay()}
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>¡Bienvenido, {values.name}!</ModalHeader>
                    <ModalBody>
                        <p>¡Gracias por registrarte! Te damos la bienvenida a nuestra plataforma.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}
