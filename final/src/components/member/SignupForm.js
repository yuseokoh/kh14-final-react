import React, { useState, useMemo } from 'react';
import axios from 'axios';
import styles from './SignupForm.module.css';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const certEmail = searchParams.get("certEmail");
  const certNumber = searchParams.get("certNumber");

  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [memberPwRe, setMemberPwRe] = useState('');

  const navigate = useNavigate();

  const memberIdValid = useMemo(() => {
    const regex = /^[a-z][a-z0-9]{7,19}$/;
    return regex.test(memberId);
  }, [memberId]);

  const memberPwValid = useMemo(() => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,16}$/;
    return regex.test(memberPw);
  }, [memberPw]);

  const memberPwReValid = useMemo(() => {
    return memberPw.length > 0 && memberPw === memberPwRe;
  }, [memberPw, memberPwRe]);

  const memberIdComment = useMemo(() => {
    if (memberId.length === 0) return '';
    if (memberIdValid) return '멋진 아이디입니다!';
    return '아이디가 형식에 맞지 않습니다';
  }, [memberId, memberIdValid]);

  const memberPwComment = useMemo(() => {
    if (memberPw.length === 0) return '';
    if (memberPwValid) return '비밀번호가 형식에 맞습니다';
    return '비밀번호는 대소문자, 숫자, 특수문자를 반드시 포함한 8~16자로 작성하세요';
  }, [memberPw, memberPwValid]);

  const memberPwReComment = useMemo(() => {
    if (memberPwRe.length === 0) return '';
    if (memberPw.length === 0) return '비밀번호를 먼저 입력하세요';
    if (memberPwReValid) return '비밀번호가 일치합니다';
    return '비밀번호가 일치하지 않습니다';
  }, [memberPw, memberPwRe, memberPwReValid]);

  const isAllValid = useMemo(() => {
    return memberIdValid && memberPwValid && memberPwReValid;
  }, [memberIdValid, memberPwValid, memberPwReValid]);

const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAllValid) {
        try {
            const response = await axios.post('http://localhost:8080/member/join', {
                memberId,
                memberPw,
                memberEmail: certEmail,
                verificationToken: certNumber,
            });
            
            if (response.status === 200) {
                alert('회원가입이 완료되었습니다.');
                navigate("/member/MemberLogin");
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    }
};


  return (
    <div className={styles.signupContainer}>
      <div className="row">
      <div className="col">
      <h2 className={styles.title}>계정 만들기</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Steam 계정 이름</label>
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
            className={styles.input}
          />
          <span className={styles.comment}>{memberIdComment}</span>
        </div>
        <div className={styles.formGroup1}>
          <label className={styles.label}>비밀번호</label>
          <input
            type="password"
            value={memberPw}
            onChange={(e) => setMemberPw(e.target.value)}
            required
            className={styles.input}
          />
          <span className={styles.comment}>{memberPwComment}</span>
        </div>
        <div className={styles.formGroup2}>
          <label className={styles.label}>비밀번호 확인</label>
          <input
            type="password"
            value={memberPwRe}
            onChange={(e) => setMemberPwRe(e.target.value)}
            required
            className={styles.input}
          />
          <span className={styles.comment}>{memberPwReComment}</span>
        </div>
        <button type="submit" className={styles.submitButton} disabled={!isAllValid}>
          완료
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SignupPage;
