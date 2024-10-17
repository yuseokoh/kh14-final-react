import Jumbotron from "../Jumbotron";
import { CgLogIn } from "react-icons/cg";
import { useState } from 'react';
import { useCallback } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { memberIdState, memberLevelState } from "../../utils/recoil";
import styles from './Login.module.css';
import LoginImage from './Login.jpg';

const MemberLogin = () => {
  //navigate
  const navigate = useNavigate();

  //state
  const [input, setInput] = useState({
    memberId: "", memberPw: ""
  });
  const [display, setDisplay] = useState(false);
  const [stay, setStay] = useState(false);

  //recoil state
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);

  //callback
  const changeInput = useCallback(e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }, [input]);

  //로그인 요청
  const sendLoginRequest = useCallback(async () => {
    try {//로그인 성공
      const resp = await axios.post("/member/login", input);
      console.log(resp.data);
      setMemberId(resp.data.memberId);
      setMemberLevel(resp.data.memberLevel);
      axios.defaults.headers.common["Authorization"]
        = "Bearer " + resp.data.accessToken;
      if (stay === true) {//로그인 유지 체크 시
        window.localStorage.setItem("refreshToken", resp.data.refreshToken);
      }
      else {//로그인 유지 미 체크시
        window.sessionStorage.setItem("refreshToken", resp.data.refreshToken);
      }
      navigate("/"); //함수에서 사용해야 할 경우...
    }
    catch (e) {//로그인 실패
      console.log("아이디 없거나 비밀번호 틀림");
    }
  }, [input, stay]);


  //view
  return (
    <>
      {/* 배경 이미지와 전체 화면 크기 */}
      <div className={styles.loginPage}>
        <div className="row">
          <div className="col">
            <div className={styles.jumbotronTitle}>로그인</div>

            {/* 로그인 창 */}
            <div className={styles.container}>
              <span>아이디:user123</span>
              <br />
              <span>비밀번호:password123</span>

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

                  <div className="mt-3">
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

                      <div className={`${styles.checkboxGroup} ${styles.login}`}>
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
                    </div>
                  </div>

                  <div className="mt-4">
                    <button className={styles["btn-success"]} onClick={sendLoginRequest}>
                      로그인
                    </button>
                  </div>

                </div>

                <div className="col-3">
                  <div className={styles.loginQrPlaceholder}>
                    <span>QR 코드 자리</span>
                  </div>
                </div>
              </div>
            </div>


            {/* 회원가입 푸터같지않은 푸터 */}
            <div className="container">
              <div className="row mt-4">
                <div className="col-6">
                  <h2>Steam에 처음 오셨나요?</h2>
                </div>

                <div className="col-6">
                  <span>
                    가입하기
                    무료로 쉽게 가입할 수 있습니다. 수
                    천 종류의 게임을 전 세계 새로운
                    친구들과 힘께 즐겨보세요.
                    </span>
                    <span>
                    Steam에 대해 자세히 알아보기
                    </span>
                </div>
              </div>

            </div>
            <div className="row mt-4">
              <div className="col-6">
              <button onClick={() => navigate("/member/signup")}>가입하기</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MemberLogin;