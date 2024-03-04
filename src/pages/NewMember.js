import styles from 'css/NewMember.module.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { svgList } from "../assets/svg";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setToken } from 'store/modules/user';


const NewMember = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [tel, setTel] = useState('');
  const navigate = useNavigate();

  const onChangeEmail = e =>{
    setEmail(e.target.value);
  };

  const onChangePassword = e =>{
    setPassword(e.target.value);
  };

  const onChangeUserName = e =>{
    setUserName(e.target.value);
  };

  const onChangeTel = e =>{
    setTel(e.target.value);
  };

  const sendInfo = async(e) =>{
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        name: userName,
        email: email,
        tel: tel,
        pwd: password
      })
      navigate('/Login');
    } catch(error){
      const errorResponse = error.response;
      console.log(errorResponse.data.statusCode);
    }
  };

return (
  <div>
    회원가입 페이지입니다
    <input placeholder='이메일' value={email} onChange = {onChangeEmail}></input>
    <input placeholder='비밀번호' value={password} onChange = {onChangePassword}></input>
    <input placeholder='이름' value={userName} onChange = {onChangeUserName}></input>
    <input placeholder='전화번호' value={tel} onChange = {onChangeTel}></input>
    <button onClick={sendInfo}>회원가입</button>
  </div>
)};

export default NewMember;