import styles from 'css/Login.module.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { svgList } from "../assets/svg";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setToken } from 'store/modules/user';


const Login = () => {

return (
<div>
  로그인 페이지입니다
</div>
);};

export default Login;