import { useNavigate, useParams } from "react-router";
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import Jumbotron from "../Jumbotron";

const CommunityEdit = ()=>{
    //파라미터 추출
    const {communityNo} = useParams();

    //네비게이터
    const navigate = useNavigate();
    //dsdsds

    //state
    const [community, setCommunity] = useState(null);

    //effect
    //- effect에는 async를 쓸 수 없다
    useEffect(()=>{
        loadCommunity();
    }, []);

    //callback
    const loadCommunity = useCallback(async ()=>{
        try {
            //플랜 A
            const resp = await axios.get("/community/"+communityNo);
            setCommunity(resp.data);
        }
        catch(e) {
            //플랜 B(A에서 조회가 안될 때 - 404가 반환될 때)
            setCommunity(null);
        }
    }, [community, communityNo]);

    const changeCommunity = useCallback(e=>{
        setCommunity({
            ...community,
            [e.target.name] : e.target.value
        });
    }, [community]);

    const updateCommunity = useCallback(async () => {
        // communityNo가 community 객체에 없다면 추가
        const updatedCommunity = { ...community, communityNo };
    
        await axios.put(`/community/${communityNo}`, updatedCommunity);
        navigate(`/community/detail/${communityNo}`); // 상세 페이지로 이동
    }, [community, communityNo]);
    
    //view
    return (community !== null ? (<>
        <Jumbotron title={community.communityNo+"번 글 수정"}/>

        <div className="row mt-4">
            <div className="col">
                <label>제목</label>
                <input type="text" name="communityTitle" className="form-control"
                    value={community.communityTitle} onChange={changeCommunity} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>상태</label>
                <select name="communityState" className="form-control"
                    value={community.communityState} onChange={changeCommunity} >
                    <option value="public">공개</option>
                    <option value="private">비공개</option>
                </select>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>카테고리</label>
                <select name="communityCategory" className="form-control"
                    value={community.communityCategory} onChange={changeCommunity} >
                    <option value="자유">자유</option>
                    <option value="질문">질문</option>
                    <option value="공략">공략</option>
                    <option value="스포">스포</option>
                </select>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>내용</label>
                <input type="text" name="communityContent" className="form-control"
                    value={community.communityContent} onChange={changeCommunity} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>파일첨부(미정)</label>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col text-center">
                <button type="button" className="btn btn-lg btn-success"
                        onClick={updateCommunity}>수정</button>
                <button type="button" className="btn btn-lg btn-secondary ms-2"
                        onClick={e=>navigate("/community/list")}>목록</button> 
            </div>
        </div>
    </>) : (<></>));
};

export default CommunityEdit;