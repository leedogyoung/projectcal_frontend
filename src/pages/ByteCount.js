import styles from '../css/ByteCount.module.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { svgList } from "../assets/svg";
import axios from "axios";
import {useNavigate, useSearchParams}from "react-router-dom";
import { setToken } from 'store/modules/user';

const ByteCount = () => {
  const [content, setContent] = useState(""); 
  const [textInputContent, setTextInputContent] = useState(""); 
  const [result, setResult] = useState(0);

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleTextInputChange = (e) => {
    setTextInputContent(e.target.value);
    countBytes(e.target.value);
  };

  const countBytes = (content) => {
    const english = content.match(/[a-zA-Z]/g) || [];
    const korean = content.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g) || [];
    const number = content.match(/[0-9]/g) || [];
    const onebyte_special = content.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g) || [];
    const space = content.match(/ /g) || [];
    const line = content.match(/(\r\n\t|\n|\r\t)/gm) || [];
    const bytes = english.length + (korean.length * 3) + number.length + onebyte_special.length + (space.length) + (line.length * 2);

    setResult(bytes);
  };
  return (
    <div className={styles.byteCountContainer}>
      <div className={`${styles.section} ${styles.documentWrite}`}>문서작성</div>
      <div className={`${styles.section} ${styles.aiRecommendation}`} style={{height: '25%'}}>
        <textarea 
          className={styles.aiInput} 
          placeholder="AI 추천 활동 입력" 
          style={{width: '100%', height: '100%'}} 
          value={content} 
          onChange={handleInputChange}
        />
      </div>
      <div className={`${styles.section} ${styles.titleInput}`} style={{marginBottom: '20px'}}>
        <input type="text" placeholder="제목을 입력하세요" style={{width: '100%', height: '40px', fontSize: '1em'}} />
      </div>
      <div className={`${styles.section} ${styles.textInputSection}`} style={{marginBottom: '20px'}}>
        <textarea 
          className={styles.textInput} 
          placeholder="내용을 입력하세요" 
          style={{width: '100%', height: '500px'}}
          value={textInputContent} 
          onChange={handleTextInputChange}
        />
      </div>
      <div style={{width: '100%', textAlign: 'left', marginBottom: '20px'}}> 
        공백 제외 {textInputContent.replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/ /g, "").length}자,
        공백 포함 {textInputContent.length}자, {result}바이트
      </div>
      <div className={styles.links}>
        <Link to="/login" className={styles.link}>로그인</Link>
        <Link to="/gradecal" className={styles.link}>내신 계산기</Link>
      </div>
    </div>
  );
};

export default ByteCount;
