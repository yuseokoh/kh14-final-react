import { CgLogIn } from "react-icons/cg";
import { useState, useCallback } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { memberIdState, memberLevelState } from "../../utils/recoil";
import styles from './Login.module.css';
import { useTranslation } from 'react-i18next';

const MemberLogin = () => {

  // navigation & translation
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
      console.log(resp.data); // 응답 데이터 로그

      // 로그인 성공 시
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
      // 에러 핸들링
      if (e.response && e.response.status === 404) {
        console.log("아이디가 없거나 비밀번호가 틀립니다.");
      } else {
        console.log("로그인 요청 중 오류가 발생했습니다.");
      }
    }
  }, [input, stay, navigate]);

  // view
  return (
    <div className={styles.loginPage}>
      <div className="row">
        <div className="col">
          <div className={styles.jumbotronTitle}>{t('loginPage.title')}</div>

          <div className={styles.container}>
            <span>{t('loginPage.userIdPlaceholder')}</span>
            <br />
            <span>{t('loginPage.passwordPlaceholder')}</span>
            <br />
            <span>아이디: testuser123</span>
            <br />
            <span>비밀번호: Testuser123!!</span>

            <div className="row mt-4">
              <div className="col-9">
                <span className={styles.spanid}>{t('loginPage.loginWithId')}</span>
                <input
                  type="text"
                  name="memberId"
                  className={styles.formControl}
                  value={input.memberId}
                  onChange={changeInput}
                />
                <div className="mt-4">
                  <span className={styles.spanpw}>{t('loginPage.password')}</span>
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
                    <span className="form-check-label"> {t('loginPage.showPassword')}</span>
                  </label>
                </div>

                <div className={styles.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={stay}
                      onChange={(e) => setStay(e.target.checked)}
                    />
                    <span className="form-check-label"> {t('loginPage.keepLoggedIn')}</span>
                  </label>
                </div>

                <div className="mt-4">
                  <button className={styles["btn-success"]} onClick={sendLoginRequest}>
                    {t('loginPage.loginButton')}
                  </button>
                </div>
              </div>

              <div className="col-3">
                <div className={styles.loginQrPlaceholder}>
                  <span>{t('loginPage.qrCodePlaceholder')}</span>
                </div>
              </div>
            </div>

            <div className={styles.accession}>
              <div className="row mt-5">
                <div className="col-6">
                  <h2>{t('loginPage.newToSteam')}</h2>
                </div>
                <div className="col-6">
                  <span>{t('loginPage.signUpMessage')}</span>
                  <div className="row mt-4">
                    <div className="col">
                      <button className={styles.button} onClick={() => navigate("/member/signupPage")}>
                        {t('loginPage.signUpButton')}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <span className={styles.span2}>
                    {t('loginPage.signUpDescription')}
                  </span>
                  <br />
                  <span className={styles.span3}>
                    {t('loginPage.learnMore')}
                  </span>
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
