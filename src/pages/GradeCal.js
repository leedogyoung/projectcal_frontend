import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from 'store/modules/user';
import styles from '../css/GradeCal.module.css';

const GradeCal = () => {
  const [studentType, setStudentType] = useState('재학생');

  const [percent, setPercent] = useState(20)
  const [percent2, setPercent2] = useState(40)
  const [percent3, setPercent3] = useState(40)
  const subjects = ["국어", "수학", "영어", "과학", "사회", "기타"];

  const [gradesResult, setGradesResult] = useState({ grade1: '', grade2: '', grade3: '', totalGrade: '' });

  const handlePercentChange = e =>{
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPercent(value);
  };

  const handlePercentChange2 = e =>{
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPercent2(value);
  };

  const handlePercentChange3 = e =>{
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPercent3(value);
  };

  const [rows, setRows] = useState([
    { id: Date.now(), subject: "",subjectName:"", semester1Units: "", semester1Grade: "", semester2Units: "", semester2Grade: "" },
  ]);
  const [rows2, setRows2] = useState([
    { id: Date.now(), subject: "",subjectName:"", semester1Units: "", semester1Grade: "", semester2Units: "", semester2Grade: "" },
  ]);
  const [rows3, setRows3] = useState([
    { id: Date.now(), subject: "",subjectName:"", semester1Units: "", semester1Grade: "", semester2Units: "", semester2Grade: "" },
  ]);

  // 새로운 row 추가
  const addRow = () => {
    setRows([...rows, {
        id: Date.now(),
        subject: "",
        subjectName:"",
        semester1Units: "",
        semester1Grade: "",
        semester2Units: "",
        semester2Grade: ""
    }]);
  };
  const addRow2 = () => {
    setRows2([...rows2, {
        id: Date.now(),
        subject: "",
        subjectName:"",
        semester1Units: "",
        semester1Grade: "",
        semester2Units: "",
        semester2Grade: ""
    }]);
  };
  const addRow3 = () => {
    setRows3([...rows3, {
        id: Date.now(),
        subject: "",
        subjectName:"",
        semester1Units: "",
        semester1Grade: "",
        semester2Units: "",
        semester2Grade: ""
    }]);
  };

  // 특정 row 삭제
  const removeRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };
  const removeRow2 = (id) => {
    setRows2(rows2.filter(row => row.id !== id));
  };
  const removeRow3 = (id) => {
    setRows3(rows3.filter(row => row.id !== id));
  };

  // 입력된 정보 업데이트
  const updateField = (id, field, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const updateField2 = (id, field, value) => {
    setRows2(rows2.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const updateField3 = (id, field, value) => {
    setRows3(rows3.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

   const calculateGrades = () => {
     const calculateYearGrade = (rows) => {
       let totalUnits = 0;
       let totalGradeUnits = 0;
       rows.forEach(row => {
         const semester1Units = parseInt(row.semester1Units, 10) || 0;
         const semester1Grade = parseInt(row.semester1Grade, 10) || 0;
         const semester2Units = parseInt(row.semester2Units, 10) || 0;
         const semester2Grade = parseInt(row.semester2Grade, 10) || 0;

         totalUnits += semester1Units + semester2Units;
         totalGradeUnits += (semester1Units * semester1Grade) + (semester2Units * semester2Grade);
       });
       return totalUnits > 0 ? totalGradeUnits / totalUnits : 0;
     };

     const grade1 = calculateYearGrade(rows);
     const grade2 = calculateYearGrade(rows2);
     const grade3 = calculateYearGrade(rows3);
     const totalGrade = (grade1 * percent + grade2 * percent2 + grade3 * percent3) / (parseInt(percent, 10) + parseInt(percent2, 10) + parseInt(percent3, 10));

     setGradesResult({ grade1: grade1.toFixed(2), grade2: grade2.toFixed(2), grade3: grade3.toFixed(2), totalGrade: totalGrade.toFixed(2) });
   };

   const resetForm = () => {
     setRows([{ id: Date.now(), year: "1학년", subject: "", subjectName: "", semester1Units: "", semester1Grade: "", semester2Units: "", semester2Grade: "" }]);
     setRows2([{ id: Date.now(), year: "2학년", subject: "", subjectName: "", semester1Units: "", semester1Grade: "", semester2Units: "", semester2Grade: "" }]);
     setRows3([{ id: Date.now(), year: "3학년", subject: "", subjectName: "", semester1Units: "", semester1Grade: "", semester2Units: "", semester2Grade: "" }]);
    setGradesResult({ grade1: '', grade2: '', grade3: '', totalGrade: '' });
   };

  return (
    <div className={styles.gradeCalculator}>
      <div className={styles.title}>내신계산기</div>
      <div className={styles.studentTypeButtons}>
        <button
          className={studentType === '재학생' ? styles.activeButton : ''}
          onClick={() => setStudentType('재학생')}
        >
          재학생
        </button>
        <button
          className={studentType === '졸업생' ? styles.activeButton : ''}
          onClick={() => setStudentType('졸업생')}
        >
          졸업생
        </button>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.headerRow}>
          <div className={styles.headerItem} style={{ width: '8%' }}>학년</div>
            <div className={styles.headerNew} style={{ width: '92%' }}>
            <div className={styles.headerItem} style={{ width: '6%' }}>교과</div>
            <div className={styles.headerItem} style={{ width: '17%' }}>교과목</div>
            <div className={styles.headerItem2} style={{ width: '34%' }}>
              <div className={styles.headerItemHalf}><div className={styles.semName}>1학기</div></div>
              <div className={styles.headerItemHalf}>
                <div className={styles.detailsItem}>이수단위</div>
                <div className={styles.detailsItem}>과목등급</div>
              </div>
            </div>
            <div className={styles.headerItem2} style={{ width: '34%' }}>
              <div className={styles.headerItemHalf}><div className={styles.semName}>2학기</div></div>
              <div className={styles.headerItemHalf}>
                <div className={styles.detailsItem}>이수단위</div>
                <div className={styles.detailsItem}>과목등급</div>
              </div>
            </div>
            <div className={styles.headerItem} style={{ width: '9%' }}>추가/삭제</div>
            </div>
        </div>
          {/* 1학년 */}
          <div className={styles.bodyRow}>
            <div className={styles.yearColumn} style={{ width: '8%' }}>
              <div className={styles.yearItem} style={{ width: '100%', height: `${rows.length * 50}px` }}>
                <div>1학년</div>
                <input type="text" className={styles.percentBox} onChange={handlePercentChange} value={`${percent}%`}></input>
              </div>
            </div>
            <div className={styles.yearBody} style={{ width: '92%' }}>
            {rows.map((row, index) => (
              <div key={index} className={styles.inputRow} style={{ width: '100%' }}>
                <div className={styles.inputItem} style={{ width: '6%' }}>
                <select className={styles.gradeInput} value={row.subject} onChange={(e) => updateField(row.id, "subject", e.target.value)}>
                      <option value="">선택</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}      
                  type="text"
                  value={row.subjectName}
                  onChange={(e) => updateField(row.id, 'subjectName', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester1Units}
                  onChange={(e) => updateField(row.id, 'semester1Units', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester1Grade}
                  onChange={(e) => updateField(row.id, 'semester1Grade', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester2Units}
                  onChange={(e) => updateField(row.id, 'semester2Units', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester2Grade}
                  onChange={(e) => updateField(row.id, 'semester2Grade', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '9%' }}>
                  {index === rows.length - 1 ? (
                    <button className={styles.addButton} onClick={addRow}>추가</button>
                  ) : (
                    <button className={styles.addButton} onClick={() => removeRow(row.id)}>삭제</button>
                  )}
                </div>
              </div>
              ))}
            </div>
          </div>
          {/* 2학년 */}
          <div className={styles.bodyRow}>
            <div className={styles.yearColumn} style={{ width: '8%' }}>
              <div className={styles.yearItem} style={{ width: '100%', height: `${rows2.length * 50}px` }}>
                <div>2학년</div>
                <input type="text" className={styles.percentBox} onChange={handlePercentChange2} value={`${percent2}%`}></input>
              </div>
            </div>
            <div className={styles.yearBody} style={{ width: '92%' }}>
            {rows2.map((row, index) => (
              <div key={index} className={styles.inputRow} style={{ width: '100%' }}>
                <div className={styles.inputItem} style={{ width: '6%' }}>
                <select className={styles.gradeInput} value={row.subject} onChange={(e) => updateField2(row.id, "subject", e.target.value)}>
                      <option value="">선택</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}      
                  type="text"
                  value={row.subjectName}
                  onChange={(e) => updateField2(row.id, 'subjectName', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester1Units}
                  onChange={(e) => updateField2(row.id, 'semester1Units', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester1Grade}
                  onChange={(e) => updateField2(row.id, 'semester1Grade', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester2Units}
                  onChange={(e) => updateField2(row.id, 'semester2Units', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester2Grade}
                  onChange={(e) => updateField2(row.id, 'semester2Grade', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '9%' }}>
                  {index === rows2.length - 1 ? (
                    <button className={styles.addButton} onClick={addRow2}>추가</button>
                  ) : (
                    <button className={styles.addButton} onClick={() => removeRow2(row.id)}>삭제</button>
                  )}
                </div>
              </div>
              ))}
            </div>
          </div>
          {/* 3학년 */}
          <div className={styles.bodyRow}>
            <div className={styles.yearColumn} style={{ width: '8%' }}>
              <div className={styles.yearItem} style={{ width: '100%', height: `${rows3.length * 50}px` }}>
                <div>3학년</div>
                <input type="text" className={styles.percentBox} onChange={handlePercentChange3} value={`${percent3}%`}></input>
              </div>
            </div>
            <div className={styles.yearBody} style={{ width: '92%' }}>
            {rows3.map((row, index) => (
              <div key={index} className={styles.inputRow} style={{ width: '100%' }}>
                <div className={styles.inputItem} style={{ width: '6%' }}>
                <select className={styles.gradeInput} value={row.subject} onChange={(e) => updateField3(row.id, "subject", e.target.value)}>
                      <option value="">선택</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}      
                  type="text"
                  value={row.subjectName}
                  onChange={(e) => updateField3(row.id, 'subjectName', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester1Units}
                  onChange={(e) => updateField3(row.id, 'semester1Units', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input className= {styles.gradeInput}
                  type="text"
                  value={row.semester1Grade}
                  onChange={(e) => updateField3(row.id, 'semester1Grade', e.target.value)}></input>
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                    <input 
                    className={styles.gradeInput} 
                    type="text" 
                    value={row.semester2Units} 
                    onChange={(e) => updateField3(row.id, 'semester2Units', e.target.value)} 
                    disabled={studentType === '재학생'}
                    style={{backgroundColor :studentType === '재학생' ? '#D0D0D0' :""}} 
                    />
                </div>
                <div className={styles.inputItem} style={{ width: '17%' }}>
                  <input 
                    className={styles.gradeInput} 
                    type="text" 
                    value={row.semester2Grade} 
                    onChange={(e) => updateField3(row.id, 'semester2Grade', e.target.value)} 
                    disabled={studentType === '재학생'}
                    style={{backgroundColor :studentType === '재학생' ? '#D0D0D0' :""}}
                  />
                </div>
                {/* 추가버튼 */}
                <div className={styles.inputItem} style={{ width: '9%' }}>
                  {index === rows3.length - 1 ? (
                    <button className={styles.addButton} onClick={addRow3}>추가</button>
                  ) : (
                    <button className={styles.addButton} onClick={() => removeRow3(row.id)}>삭제</button>
                  )}
                </div>
              </div>
              ))}
            </div>
          </div>
      </div>
      <div className={styles.buttonContainer} style={{ display: 'flex', justifyContent: 'center' }}>
              <button className={styles.calculateButton} onClick={calculateGrades}>성적 산출하기</button>
              <button className={styles.calculateButton} onClick={resetForm}>새로 시작</button>
            </div>
            <div className={styles.resultsSection}>
              <div className={styles.resultItem}><span className={styles.resultTitle}>1학년 평균 등급: </span><span className={styles.resultValue}>{gradesResult.grade1}</span></div>
              <div className={styles.resultItem}><span className={styles.resultTitle}>2학년 평균 등급: </span><span className={styles.resultValue}>{gradesResult.grade2}</span></div>
              <div className={styles.resultItem}><span className={styles.resultTitle}>3학년 평균 등급: </span><span className={styles.resultValue}>{gradesResult.grade3}</span></div>
              <div className={styles.resultItem}><span className={styles.resultTitle}>전체 평균 등급: </span><span className={styles.resultValue}>{gradesResult.totalGrade}</span></div>
            </div>
            <div className={styles.links}>
              <Link to="/login" className={styles.link}>로그인</Link>
              <Link to="/" className={styles.link}>글자수 계산기</Link>
            </div>
    </div>
  );
};

export default GradeCal;
