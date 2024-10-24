import axios from "axios";
import Jumbotron from "../Jumbotron";
import { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router";

const CommunityAdd = () => {
    //navigate
    const navigate = useNavigate();
    //dsd

    //state
    const [input, setInput] = useState({
        communityTitle: "",
        communityState: "",
        communityCategory: "자유",  
        communityNo: "",
        communityWrite: "",
        communityContent: ""
    });

    //callback
    const changeInput = useCallback(e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const saveCommunity = useCallback(async () => {
        try {
            //input의 형식 검사 후 차단 또는 허용 
            const resp = await axios.post("/community/", input);
            // 성공적으로 등록되면 목록으로 이동
            navigate("/community/list");
        } catch (error) {
            console.error("Error while saving the community post:", error);
        }
    }, [input, navigate]);

    //view
    return (<>
        <Jumbotron title="게시글 등록" />

        <div className="row mt-4">
            <div className="col">
                <label>제목</label>
                <input type="text" name="communityTitle" className="form-control"
                    value={input.communityTitle} onChange={changeInput} />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>상태</label>
                <select name="communityState" className="form-control" value={input.communityState} onChange={changeInput}>
                    <option value="public">공개</option>
                    <option value="private">비공개</option>
                </select>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                <label>카테고리</label>
                <select name="communityCategory" className="form-control" value={input.communityCategory} onChange={changeInput}>
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
                    value={input.communityContent} onChange={changeInput} />
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
                        onClick={saveCommunity}>등록</button>
                <button type="button" className="btn btn-lg btn-secondary ms-2"
                        onClick={e=>navigate("/community/list")}>목록</button>
            </div>
        </div>
    </>);
};

export default CommunityAdd;
