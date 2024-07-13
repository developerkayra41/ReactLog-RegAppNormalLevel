import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../slices/userSlice'

function Home() {
    const isLogin = useSelector((store) => store.user.isLogin)
    const userInfo = useSelector((store) => store.user.userInfo)
    const dispatch = useDispatch();

    return (
        <>
            <Box mt={5} >
                {isLogin ?
                    <Box>
                        <Typography variant='h2'>Hoşgeldin {userInfo.name}</Typography>
                        <Box mt={3}>
                            <Button
                                to="/"
                                variant='contained'
                                onClick={() => dispatch(logout())}
                                component={Link}>Çıkış Yap</Button>
                        </Box>
                    </Box>

                    :
                    <Box>
                        <Button
                            to="/login"
                            variant='contained'
                            component={Link}>Giriş Yap</Button>
                        <Button
                            sx={{ marginLeft: 1 }}
                            to="/register"
                            variant='contained'
                            component={Link}>Kayıt Ol</Button>

                    </Box>




                }

            </Box>
        </>
    )
}

export default Home