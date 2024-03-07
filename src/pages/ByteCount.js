import styles from 'css/ByteCount.module.css';
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { svgList } from "../assets/svg";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
// import {useDispatch} from "react-redux";
import { setToken } from 'store/modules/user';


const ByteCount = () => {

  const logout = async(e) =>{
    try{
      const response = await axios.post('http://localhost:8000/auth/logout', {
      })
      console.log("로그아웃되었습니다")
    } catch(err){console.log(err)}
  };

return (
<div>
  글자수세기 페이지입니다
  <button onClick={logout}>로그아웃</button>
</div>);
};

export default ByteCount;