import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from "axios";

const MyPage = ()=>{
    //state
    const [member, setMember] = useState({});
    
    //effect
    useEffect(()=>{
        loadMember();
    }, []);

    //callback
    const loadMember = useCallback(async ()=>{
        const resp = await axios.get("http://localhost:8080/member/find");
        setMember(resp.data);
    }, [member]);

    return (<>
        <Jumbotron title={`${member.memberId} 님의 정보`}/>

        <div className="row mt-4">
            <div className="col-3">닉네임</div>
            <div className="col-3">{member.memberNickname}</div>
        </div>
        <div className="row mt-4">
            <div className="col-3">전화번호</div>
            <div className="col-3">{member.memberContact}</div>
        </div>
        <div className="row mt-4">
            <div className="col-3">이메일</div>
            <div className="col-3">{member.memberEmail}</div>
        </div>
        <div className="row mt-4">
            <div className="col-3">생년월일</div>
            <div className="col-3">{member.memberBirth}</div>
        </div>
        <div className="row mt-4">
            <div className="col-3">포인트</div>
            <div className="col-3">{member.memberNickname}</div>
        </div>
        <div className="row mt-4">
            <div className="col-3">주소</div>
            <div className="col-3">
                [{member.memberPost}]
                {member.memberAddress1}
                {member.memberAddress2}
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-3">가입일</div>
            <div className="col-3">{member.memberJoin}</div>
        </div>
        <div className="row mt-4">
            <div className="col-3">최종로그인</div>
            <div className="col-3">{member.memberLogin}</div>
        </div>
    </>);
};

export default MyPage;