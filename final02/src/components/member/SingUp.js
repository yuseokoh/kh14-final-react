import { useState, useCallback, useMemo } from 'react';
import axios from "axios";

const SignUp = () => {
  // State 관리
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [memberPwRe, setMemberPwRe] = useState('');

  const [emailClass, setEmailClass] = useState('');
  const [memberIdClass, setMemberIdClass] = useState('');
  const [memberPwClass, setMemberPwClass] = useState('');
  const [memberPwReClass, setMemberPwReClass] = useState('');

  // 이메일 유효성 검사
  const checkEmail = useCallback(() => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = regex.test(email);
    setEmailValid(valid);

    if (email.length === 0) setEmailClass('');
    else setEmailClass(valid ? 'is-valid' : 'is-invalid');
  }, [email]);

  // 이메일 인증 전송
  const sendEmailVerification = async () => {
    if (!emailValid) return;

    try {
        const response = await fetch('http://localhost:8080/member/email', {  // 전체 URL 사용
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email),  // body에 이메일 문자열을 바로 전달
        });

        console.log('Response status:', response.status);  // 응답 상태 확인
        console.log('Response body:', await response.text());  // 응답 본문 확인

        if (response.ok) {
            alert('인증 이메일을 전송했습니다. 확인 후 계속 진행해주세요.');
        } else {
            alert('이메일 전송에 실패했습니다.');
        }
    } catch (error) {
        console.error('Error sending email verification:', error);
    }
};

  

  // 다른 유효성 검사 함수 (아이디, 비밀번호 등)
  const checkMemberId = useCallback(() => {
    const regex = /^[a-z][a-z0-9]{7,19}$/;
    const valid = regex.test(memberId);
    setMemberIdClass(valid ? 'is-valid' : 'is-invalid');
  }, [memberId]);

  const checkMemberPw = useCallback(() => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,16}$/;
    const valid = regex.test(memberPw);
    setMemberPwClass(valid ? 'is-valid' : 'is-invalid');
  }, [memberPw]);

  const checkMemberPwRe = useCallback(() => {
    const valid = memberPw.length > 0 && memberPw === memberPwRe;
    setMemberPwReClass(valid ? 'is-valid' : 'is-invalid');
  }, [memberPw, memberPwRe]);

  // 전체 유효성 검사
  const isAllValid = useMemo(() => {
    return emailValid && memberId.length > 0 && memberPw.length > 0 && memberPw === memberPwRe;
  }, [emailValid, memberId, memberPw, memberPwRe]);

  return (
    <div className="container mt-5">
      {/* 이메일 입력 */}
      <div className="form-group">
        <input
          type="email"
          className={`form-control ${emailClass}`}
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={checkEmail}
        />
        <button onClick={sendEmailVerification} disabled={!emailValid}>
          이메일 인증 보내기
        </button>
      </div>

      {/* 이메일 인증 후 입력 */}
      <div className="form-group">
        <input
          type="text"
          className={`form-control ${memberIdClass}`}
          placeholder="아이디 입력"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          onBlur={checkMemberId}
        />
        <input
          type="password"
          className={`form-control ${memberPwClass}`}
          placeholder="비밀번호 입력"
          value={memberPw}
          onChange={(e) => setMemberPw(e.target.value)}
          onBlur={checkMemberPw}
        />
        <input
          type="password"
          className={`form-control ${memberPwReClass}`}
          placeholder="비밀번호 확인"
          value={memberPwRe}
          onChange={(e) => setMemberPwRe(e.target.value)}
          onBlur={checkMemberPwRe}
        />
        <button disabled={!isAllValid} className="btn btn-primary">
          가입 완료
        </button>
      </div>
    </div>
  );
};

export default SignUp;
