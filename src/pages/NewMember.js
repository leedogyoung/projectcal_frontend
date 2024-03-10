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
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [userName, setUserName] = useState('도경');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhoneNumber = (number) => /^\d{10,11}$/.test(number);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(password);

  const sendRegistrationData = async () => {
    try{
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        name: userName,
        email: email,
        tel: phoneNumber,
        pwd: password
      })
      navigate('/Login');
    } catch(err){console.log(err)}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      isValid = false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('전화번호 형식이 올바르지 않습니다.');
      isValid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 영어와 숫자 혼합 4자 이상이어야 합니다.');
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      isValid = false;
    }

    if (isValid) {
      sendRegistrationData();
    }
  };

  return (
    <div className={styles.newMemberContainer}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이메일:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        </label>
        <label>
          전화번호:
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
        </label>
        <div className={styles.inputWithButton}>
          <label>
            비밀번호:
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ flexGrow: 1 }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: '10px', minWidth: '75px' }}>
                {showPassword ? '숨기기' : '보기'}
              </button>
            </div>
          </label>
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </div>
        <div className={styles.inputWithButton}>
          <label>
            비밀번호 확인:
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ flexGrow: 1 }} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ marginLeft: '10px', minWidth: '75px' }}>
                {showConfirmPassword ? '숨기기' : '보기'}
              </button>
            </div>
          </label>
          {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
        </div>
        <button type="submit">회원가입</button>
      </form>
      <Link to="/login">로그인</Link>
    </div>
  );  
};  
  

export default NewMember;