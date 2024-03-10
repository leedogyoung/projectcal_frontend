import styles from 'css/Login.module.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { svgList } from "../assets/svg";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from 'store/modules/user';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const logout = () => {
    // 토큰 삭제
    localStorage.removeItem('token');
    console.log("로그아웃되었습니다")
    // 사용자를 로그인 페이지로 리디렉션
    navigate('/login');
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        pwd: password
      });
      localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    } catch(error){
      const errorResponse = error.response;
      console.log(errorResponse.data.statusCode);
    }
  };

  return (
    <div className={styles.wrapper}> 
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
          <form>
          <label>
            <div>이메일:</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            <div>비밀번호:</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button onClick={handleSubmit}>로그인</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button onClick={logout}>로그아웃</button>
        </form>
        <div className={styles.links}>
          <Link to="/newmember" className={styles.link}>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
