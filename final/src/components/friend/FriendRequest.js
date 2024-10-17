import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  loginState,
  memberIdState,
  memberLoadingState,
} from "../../utils/recoil";
import axios from "axios";

const FriendRequest = () => {
  //state
  const [requestList, setRequestList] = useState([]); //친구 요청 목록
  const [memberList, setMemberList] = useState([]); //회원 목록
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);

  const [client, setClient] = useState(null);
  const [connect, setConnect] = useState(false);

  //recoil
  const login = useRecoilValue(loginState);
  const memberId = useRecoilValue(memberIdState);
  const memberLoading = useRecoilValue(memberLoadingState);

  //token
  const accessToken = axios.defaults.headers.common["Authorization"];
  const refreshToken =
    window.localStorage.getItem("refreshToken") ||
    window.sessionStorage.getItem("refreshToken");

  //effect
  useEffect(() => {
    if(memberLoading === false) return;
    loadMemberList();
    loadRequestToOther();

    console.log(memberId);
  }, []);

  //callback
  const loadMemberList = useCallback(async () => {
    const resp = await axios.get("http://localhost:8080/friend/member");
    setMemberList(resp.data);
  }, [memberList]);

  const loadRequestToOther = useCallback(async ()=> {
    const resp = await axios.get("http://localhost:8080/friend/"+memberId);
    console.log(memberId);
    setRequestList(resp.data);
  }, [memberId, requestList]);

  const changeKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
      setOpen(e.target.value.length > 0);
    },
    [keyword]
  );
  const selectKeyword = useCallback(
    (text) => {
      setKeyword(text);
      setOpen(false);
    },
    [keyword]
  );
  const sendRequest = useCallback(()=>{

  }, []);
  //memo
  const searchResult = useMemo(() => {
    if (keyword.length === 0) return [];
    return memberList.filter((member) => member.memberId.includes(keyword));
  }, [keyword, memberList]);

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <h3>친구 요청</h3>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          {/* 입력값 useMemo로 memberList에서 조회후 출력*/}
          <input
            type="text"
            className="form-control"
            placeholder="아이디"
            value={keyword}
            onChange={changeKeyword}
          />
          {open === true && (
            <ul className="list-group">
              {searchResult.map((member) => (
                <li
                  key={member.memberId}
                  className="list-group-item"
                  onClick={(e) => selectKeyword(member.memberId)}
                >
                  {member.memberId}
                  <button className="btn btn-success ms-4">친구 추가</button>
                  <button className="btn btn-secondary ms-4">
                    프로필 보기
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default FriendRequest;
