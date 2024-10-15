import Jumbotron from "../Jumbotron";
import { CgLogIn } from "react-icons/cg";
import { useState } from 'react';
import { useCallback } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { memberIdState, memberLevelState } from "../../utils/recoil";
import './Login.css';

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
  const sendLoginRequest = useCallback(async ()=>{
    try {//로그인 성공
        const resp = await axios.post("/member/login", input);
        console.log(resp.data);
        setMemberId(resp.data.memberId);
        setMemberLevel(resp.data.memberLevel);
        axios.defaults.headers.common["Authorization"] 
                            = "Bearer " + resp.data.accessToken;
        if(stay === true) {//로그인 유지 체크 시
            window.localStorage.setItem("refreshToken", resp.data.refreshToken);
        }
        else {//로그인 유지 미 체크시
            window.sessionStorage.setItem("refreshToken", resp.data.refreshToken);
        }
        navigate("/"); //함수에서 사용해야 할 경우...
    }
    catch(e) {//로그인 실패
        console.log("아이디 없거나 비밀번호 틀림");
    }
}, [input, stay]);


  //view
  return (<>
    <div className="login-page" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/login.png)`
    }}></div>
    <div className="jumbotron-title">로그인</div>
    <div className="container">

    <span>아이디:user123</span>
    <br></br>
    <span>비밀번호:password123</span>

      <div className="row mt-4">
        <div className="col-9">

          <span className="spanid">계정 이름으로 로그인</span>
          <input
            type="text"
            name="memberId"
            className="form-control"
            // placeholder="user123"
            value={input.memberId}
            onChange={changeInput}
          />

          <div className="mt-4">
            <span className="spanpw">비밀번호</span>
            <input
              type={display ? "text" : "password"}
              name="memberPw"
              className="form-control"
              // placeholder="password123"
              value={input.memberPw}
              onChange={changeInput}
            />
          </div>

          <div className="mt-3">
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                className="form-check-input"
                checked={display}
                onChange={(e) => setDisplay(e.target.checked)}
              />
              <span className="form-check-label"> 비밀번호 표시</span>
            </label>

            <div className="checkbox-group login">
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
          <button className="btn btn-success " onClick={sendLoginRequest}>
            로그인
          </button>
        </div>
        </div>


        <div className="col-3">
          <div className="login-qr-placeholder">
            <span>QR 코드 자리</span>
          </div>
        </div>

      </div>
    </div>





  </>
  );
};
export default MemberLogin;