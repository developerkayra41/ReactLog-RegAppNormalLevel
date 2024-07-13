import React, { act, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, colors, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { loginToAccount, newAccount } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const LoginSchema = Yup.object().shape({
    nickName: Yup.string()
        .required('Bu alanı boş bırakmayın !'),
    name: Yup.string()
        .required('Bu alanı boş bırakmayın !'),
    age: Yup.string()
        .required('Bu alanı boş bırakmayın !'),
    password: Yup.string()
        .min(6, 'Şifre 6 karakterden büyük olmak zorunda')
        .required('Bu alanı boş bırakmayın !'),
    passwordConfirm: Yup.string()
        .required("Şifre tekrarı zorunlu")
        .oneOf([Yup.ref('password')], 'Şifreler aynı olmalı')
});

const RegisterForm = () => {
    const navigate = useNavigate(); // useNavigate hook'unu kullanın
    const dispatch = useDispatch();
    const isFond = useSelector((store) => store.user.isFond)

    const submit = (values, actions) => {
        const { passwordConfirm, ...userInfo } = values;
        console.log(userInfo)
        dispatch(newAccount(userInfo))
            .unwrap()
            .then((result) => {
                actions.resetForm();
                Swal.fire({
                    title: "Başarılı!",
                    text: "Hesap oluşturuldu",
                    icon: "success"
                });
                navigate("/login")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            nickName: '',
            name: '',
            age: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: LoginSchema,
        onSubmit: submit
    })
    return (
        <div>
            <Typography pb={2} mt={8} variant='h4'>Kayıt Ol</Typography>
            {isFond ? <Alert severity="error">Kullanıcı adı veya şifre yanlış !</Alert> : ''}
            <Box sx={{
                paddingBottom: 2
            }}></Box>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        value={values.nickName}
                        fullWidth
                        type="text"
                        id="nickName"
                        label="Kullanıcı Adı"
                        onChange={handleChange}
                        variant="outlined" />
                    {errors.nickName && <p style={{ color: 'red' }}>{errors.nickName}</p>}
                </div>
                <Box sx={{
                    paddingBottom: 2
                }}></Box>
                <div>
                    <TextField
                        value={values.name}
                        fullWidth
                        type="text"
                        id="name"
                        label="İsim"
                        onChange={handleChange}
                        variant="outlined" />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <Box sx={{
                    paddingBottom: 2
                }}></Box>
                <div>
                    <TextField
                        value={values.age}
                        fullWidth
                        type="number"
                        id="age"
                        label="Yaş"
                        onChange={handleChange}
                        variant="outlined" />
                    {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
                </div>
                <Box sx={{
                    paddingBottom: 2
                }}></Box>
                <div>
                    <TextField
                        value={values.password}
                        fullWidth
                        type="password"
                        id="password"
                        label="Şifre"
                        onChange={handleChange}
                        variant="outlined" />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                </div>
                <Box sx={{
                    paddingBottom: 2
                }}></Box>
                <div>
                    <TextField
                        value={values.passwordConfirm}
                        fullWidth
                        type="password"
                        id="passwordConfirm"
                        label="Şifreyi onayla"
                        onChange={handleChange}
                        variant="outlined" />
                    {errors.passwordConfirm && <p style={{ color: 'red' }}>{errors.passwordConfirm}</p>}

                </div>
                <Box sx={{
                    paddingBottom: 2
                }}></Box>
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth>Kayıt Ol</Button>
            </form>
            <Box sx={{ textAlign: 'center' }}>
                <Link href="/" sx={{ color: 'blue', cursor: 'pointer' }}>Anasayfaya git</Link>
            </Box>
        </div>
    );
};

export default RegisterForm;