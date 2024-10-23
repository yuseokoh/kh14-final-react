import Jumbotron from "../Jumbotron";
import { CgLogIn } from "react-icons/cg";
import { useState, useCallback } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { memberIdState, memberLevelState } from "../../utils/recoil";
import styles from './Login.module.css';
import { useTranslation } from 'react-i18next';

const MemberLogin = () => {
  // translation and navigation hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  // state
  const [input, setInput] = useState({
    memberId: "",
    memberPw: ""
  });
  const [display, setDisplay] = useState(false);
  const [stay, setStay] = useState(false);

  // recoil state
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);

  // Kakao configuration
  const REST_API_KEY = "e027bcf677db65dbc9a5954313eb0a3f";
  const REDIRECT_URI = "http://localhost:3000/member/MemberLogin";

  // callback for input change
  const changeInput = useCallback(e => {
    setInput(prevInput => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  }, []);

  // 로그인 요청
  const sendLoginRequest = useCallback(async () => {
    try {
      const resp = await axios.post("/member/login", input);
      console.log(resp.data);

      // 성공적으로 로그인했을 경우
      setMemberId(resp.data.memberId);
      setMemberLevel(resp.data.memberLevel);

      // Authorization 헤더에 토큰 설정
      axios.defaults.headers.common["Authorization"] = "Bearer " + resp.data.accessToken;

      // refreshToken 저장
      if (stay) {
        window.localStorage.setItem("refreshToken", resp.data.refreshToken);
      } else {
        window.sessionStorage.setItem("refreshToken", resp.data.refreshToken);
      }

      // 홈 화면으로 이동
      navigate("/");
    } catch (e) {
      if (e.response && e.response.status === 404) {
        console.log("아이디가 없거나 비밀번호가 틀립니다.");
      } else {
        console.log("로그인 요청 중 오류가 발생했습니다.");
      }
    }
  }, [input, stay]);

  // 카카오 로그인 요청
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=consent`;
  };

  // 카카오 로그인 QR 코드 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=consent`;

  // 카카오 로그인 후 인증 코드 처리
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      console.log("인증 코드 확인: ", code);

      // 인증 코드를 백엔드로 전송하는 로직
      axios.post("http://localhost:8080/member/kakaoLogin", { code }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log("백엔드 응답: ", response.data);

          // JWT 토큰을 로컬 스토리지에 저장하여 로그인 상태 유지
          const { accessToken, refreshToken, memberId, memberLevel } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('memberId', memberId);
          localStorage.setItem('memberLevel', memberLevel);

          setMemberId(memberId);
          setMemberLevel(memberLevel);

          // 홈 화면으로 이동
          navigate('/');
        })
        .catch(error => {
          console.error("로그인 실패: ", error);
          alert('로그인에 실패했습니다.');
        });
    } else {
      console.log("인증 코드가 없습니다.");
    }
  }, [navigate, setMemberId, setMemberLevel]);

  // view
  return (
    <div className={styles.loginPage}>
      <div className="row">
        <div className="col">
          <div className={styles.jumbotronTitle}>로그인</div>

          <div className={styles.container}>
            <span>아이디: testuser123</span>
            <br />
            <span>비밀번호: Testuser123!!</span>

            <div className="row mt-4">
              <div className="col-9">
                <span className={styles.spanid}>계정 이름으로 로그인</span>
                <input
                  type="text"
                  name="memberId"
                  className={styles.formControl}
                  value={input.memberId}
                  onChange={changeInput}
                />
                <div className="mt-4">
                  <span className={styles.spanpw}>비밀번호</span>
                  <input
                    type={display ? "text" : "password"}
                    name="memberPw"
                    className={styles.formControl}
                    value={input.memberPw}
                    onChange={changeInput}
                  />
                </div>

                <div className={styles.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={display}
                      onChange={(e) => setDisplay(e.target.checked)}
                    />
                    <span className="form-check-label"> 비밀번호 표시</span>
                  </label>
                  
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={stay}
                      onChange={(e) => setStay(e.target.checked)}
                    />
                    <span className="form-check-label"> 로그인 유지</span>
                  </label>
                </div>

                <div className="mt-4">
                  <button className={styles["btn-success"]} onClick={sendLoginRequest}>
                    로그인
                  </button>
                </div>
              </div>

              <div className="col-3" style={{ position: 'relative' }}>
                <div className={styles.loginQrPlaceholder}>
                  <QRCodeCanvas value={kakaoURL} size={256} includeMargin={true} />
                  <button 
                    className={styles.kakaoLoginButton} 
                    onClick={handleKakaoLogin}
                    style={{
                      position: 'absolute',
                      top: '35%',
                      left: '40%',
                      width: '80%',
                      height: '60%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      backgroundColor: '#FEE500',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span className={styles.span4}> 카카오로그인</span>
                    <br></br>
                    <span className={styles.span5}>QR코드는<br/> 배포 후 사용가능</span>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.accession}>
              <div className="row mt-5">
                <div className="col-6">
                  <h2 className={styles.span1}>Steam에 처음 오셨나요?</h2>
                  <button className={styles.button} onClick={() => navigate("/member/signupPage")}>가입하기</button>
                </div>
                <div className="col-6">
                  <span className={styles.span2}>무료로 쉽게 가입할 수 있습니다. 수천 종류의 게임을 전 세계 새로운 친구들과 함께 즐겨보세요.<br /> Steam에 대해 자세히 알아보기</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;
