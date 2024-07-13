import React, { act, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, colors, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { loginToAccount } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';


const LoginSchema = Yup.object().shape({
    nickName: Yup.string()
        .required('Bu alanı boş bırakmayın !'),
    password: Yup.string()
        .min(6, 'Şifre 6 karakterden büyük olmak zorunda')
        .required('Bu alanı boş bırakmayın !'),
});

const LoginForm = () => {
    const navigate = useNavigate(); // useNavigate hook'unu kullanın
    const dispatch = useDispatch();
    const isFond = useSelector((store) => store.user.isFond)

    const submit = (values, actions) => {
        // console.log(values)
        dispatch(loginToAccount(values))
            .unwrap()
            .then(() => {
                localStorage.setItem("user", JSON.stringify(values))
                actions.resetForm()
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
                if (error === "Kullanıcı adı veya şifre yanlış") {
                    actions.setFieldValue("password", '')
                    actions.setFieldTouched('password', false);

                }
            })
    }
    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            nickName: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: submit
    })
    return (
        <div>
            <Typography pb={2} mt={20} variant='h4'>Giriş Yap</Typography>
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
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth>Giriş Yap</Button>
            </form>
            <Box sx={{ textAlign: 'center' }}>
                <Link href="/" sx={{ color: 'blue', cursor: 'pointer' }}>Anasayfaya git</Link>
            </Box>
        </div>
    );
};

export default LoginForm;