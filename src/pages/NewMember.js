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

return (
<div>
  회원가입 페이지입니다
</div>);
};

export default NewMember;