import { Button, Paper, TextField, Typography , Box} from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import SStyle from './signupStyles'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


let formFormate = Yup.object().shape({
    name: Yup.string()
        .required("Name Can't b Empty")
        .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/ , "Invalid Name"),
    email : Yup.string()
        .required("Enter Email")
        .matches(/^[a-z 0-9 .]+@[a-z]{3,}.[a-z]{2,}$/ , "Enter a valid Email"),
    age: Yup.number().integer().positive()
        .required("Enter your Age")
        .min(18 , "This is 18+ Webpage")
        .max(50 , "This is Younsters and Adults Web page"),
    password: Yup.string()
        .required("Make your Account Strong")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,}$/ , "Passowrd must follow the Criteria"),
    cpassword: Yup.string()
        .required("Confirm Password")
        .oneOf( [ Yup.ref("password") , null] , "Password Dont  Match" )
})


const signup = () => {
    let {register , handleSubmit , formState:{errors}} = useForm({resolver:yupResolver(formFormate)})
    let navi = useNavigate()
    const handleData=(data)=>{
        Swal.fire({
            title:"Success",
            icon:'success',
            text:"Account created Successfully Redirect to Store ?",
            showCancelButton:true,
            confirmButtonText:"Go to Store",
            cancelButtonText:"Stay On Signup Page",
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
        })
        .then((result)=>{
            if(result.isConfirmed){
                localStorage.setItem("login" , JSON.stringify(true));
                window.location.reload()
                navi("/products")
            }
        })
    }
    const gotoProducts=()=>{
        navi("/profile")
    }


  return (
    <Box sx={SStyle.container}>
        <Paper elevation={10} sx={SStyle.paper} component="form" onSubmit={handleSubmit(handleData)}>
            <Typography variant='h6' sx={SStyle.hero}> Create Your Account </Typography>
            <TextField label="Name" { ...register( "name" ) } fullWidth error={!!errors.name} helperText={errors.name?.message}/>
            <TextField label="Email" { ...register( "email" ) } fullWidth error={!!errors.email} helperText={errors.email?.message}/>
            <TextField label="Age" { ...register( "age" ) } fullWidth error={!!errors.age} helperText={errors.age?.message}/>
            <TextField label="Password" { ...register( "password" ) } fullWidth error={!!errors.password} helperText={errors.password?.message}/>
            <TextField label="Confirm Password" { ...register( "cpassword" ) } fullWidth error={!!errors.cpassword} helperText={errors.cpassword?.message}/>
            <Button variant='outlined' type='submit' sx={SStyle.signupBtn}>Sign Up</Button>
            <Typography sx={SStyle.hero}>Already have an Account</Typography>
            <Button variant='outlined' sx={SStyle.signupBtn} onClick={gotoProducts}>Sign In</Button>
        </Paper>
    </Box>
  )
}

export default signup
