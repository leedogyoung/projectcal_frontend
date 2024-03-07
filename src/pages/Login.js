import styles from 'css/Login.module.css';
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { svgList } from "../assets/svg";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// import {useDispatch} from "react-redux";
import { setToken } from 'store/modules/user';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChangeEmail = e =>{
    setEmail(e.target.value);
  };

  const onChangePassword = e =>{
    setPassword(e.target.value);
  };

  const checkInfo = async(e) =>{
    try{
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signToken`, {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        pwd: password
      })
      // navigate('/ByteCount', {state: {signToken: response.data.signToken}});
      navigate('/ByteCount');
    } catch(error){
      const errorResponse = error.response;
      console.log(errorResponse.data.statusCode);
    }
  };

return (
<div>
  로그인 페이지입니다
  <input placeholder='이메일' value={email} onChange = {onChangeEmail}></input>
  <input placeholder='비밀번호' value={password} onChange = {onChangePassword}></input>
  <button onClick={checkInfo}>로그인</button>
</div>
);};

export default Login;