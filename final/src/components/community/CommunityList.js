import Jumbotron from "../Jumbotron";
import axios from "axios";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Modal } from "bootstrap";
// import Modal from 'react-modal';
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { useRecoilValue } from "recoil";
import { loginState, memberIdState, memberLoadingState } from "../../utils/recoil";

const CommunityList = () =>{
//state
const [communityList, setCommunityList] = useState([]);

const login = useRecoilValue(loginState);
const memberId = useRecoilValue(memberIdState);
const memberLoading = useRecoilValue(memberLoadingState);

//커뮤니티게시글 수정 및 등록 한번에 처리하기 위한 State
const [input, setInput] = useState({
    communityNo: "", //커뮤니티글 번호
    communityCategory: "", //카테고리
    communityTitle: "", //제목
    communityContent: "", //내용
    communityState: "" //공개,비공개
    // communityWrite: "" //작성 시간 및 수정 시간 넣는지 아직 잘 모름
});

//effect
useEffect(()=>{
    if(memberLoadingState) return;
    loadCommunityList(); //커뮤니티게시글 목록 불러오기?
}, []);

//callback
//useCallback 불필요한 함수 재생성 방지
//loadCommunityList 서버에서 커뮤니티 목록을 불러오는 비동기함수
const loadCommunityList = useCallback(async ()=>{
    const resp = await axios.get("/community/");
    setCommunityList(resp.data);
}, [communityList]);

//삭제
const deleteCommunity = useCallback(async (community)=>{
    const choice = window.confirm("정말 이 게시글을 지우시겠습니까?");
    if(choice === false) return;

    await axios.delete("/community/" + community.communityNo);
    loadCommunityList();
},[communityList]);

//modal
const modal = useRef();
const openModal = useCallback(()=>{
    const target = Modal.getOrCreateInstance(modal.current);
    target.show();
},[modal]);
const closeModal = useCallback(()=>{
    const target = Modal.getInstance(modal.current);
    target.hide();

    clearInput();
}, [modal]);

//등록 및 수정에서 사용할 입력 함수
const changeInput = useCallback(e=>{
    setInput({
        ...input,
        [e.target.name] : e.target.value
    });
},[input]);
const clearInput = useCallback(()=>{
    setInput({
        communityNo:"",
        communityTitle:"",
        communityContent:"",
        communityState:"",
    });
}, [input]);

//수정
const editCommunity = useCallback((community)=>{
    setInput({...community});
    openModal();
},[communityList, input]);

const saveCommunity = useCallback(async ()=>{
    //communityNo 지우려면 delete사용
    const copy = {...input};
    delete copy.communityNo;
        await axios.post("/community/", copy);
        loadCommunityList();
        closeModal();
    }, [input]);

    const updateCommunity = useCallback(async ()=>{
        await axios.put("/community/", input);
        loadCommunityList();
        closeModal();
    }, [input]);

//memo
 const addMode = useMemo(()=>{
    return input?.communityNo === "";
}, [input]);

//검색
const [column, setColumn] = useState("community_title");
const [keyword, setKeyword] = useState("");
    
 const searchCommunityList = useCallback(async ()=>{
        if(keyword.trim().length === 0) {
            loadCommunityList();
            return;
        }

        const encodeKeyword = encodeURIComponent(keyword);
        const resp = await axios.get(`/community/column/${column}/keyword/${encodeKeyword}`);
        setCommunityList(resp.data);
}, [column, keyword, communityList]);


//view
  return(<>
     {/* 제목 */}
     <Jumbotron title="게시판" content="게임 커뮤니티"/>
     {/* 검색창 */}
     <div className="row mt-4">
            <div className="col-md-8 offset-md-2">
                
                <div className="input-group">
                    <div className="col-3">
                        <select className="form-select" 
                            value={column} onChange={e=>setColumn(e.target.value)}>
                            <option value="community_title">제목</option>
                        </select>
                    </div>
                    <div className="col-7">
                        <input type="text" className="form-control"
                            value={keyword} onChange={e=>setKeyword(e.target.value)}/>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary w-100"
                                onClick={searchCommunityList}>
                            <FaMagnifyingGlass/>
                            검색
                        </button>
                    </div>
                </div>
                
            </div>
        </div>

         {/* 등록 버튼 */}
         <div className="row mt-4">
            <div className="col">
                <button className="btn btn-success" onClick={openModal}>
                    <FaPlus/>
                    등록
                </button>
            </div>
        </div>

        {/* 목록 표시 자리 */}
        <div className="row mt-4">
            <div className="col">
                {/* 폭이 좁아지면 횡스크롤이 생기는 테이블 */}
                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <thead>
                            <tr>
                                <th>글번호</th>
                                <th>글제목</th>
                                <th>내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {communityList.map(community=>(
                            <tr key={community.communityNo}>
                                <td>{community.communityNo}</td>
                                <td>{community.communityTitle}</td>
                                <td>{community.communityContent}</td>
                                <td>
                                    <GoPencil className="text-warning"
                                        onClick={e=>editCommunity(community)}/>
                                    <GoTrash className="text-danger ms-2"
                                        onClick={e=>deleteCommunity(community)}/>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* 모달(등록+수정) */}
        <div className="modal fade" tabIndex="-1" ref={modal} data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* <!-- 모달 헤더 - 제목, x버튼 --> */}
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {addMode ? '게시글 등록' : '게시글 수정'}
                        </h5>
                        <button type="button" className="btn-close btn-manual-close"
                                        onClick={closeModal}></button>
                    </div>
                    {/* <!-- 모달 본문 --> */}
                    <div className="modal-body">
                        
                        <div className="row">
                            <div className="col">
                                <label>제목</label>
                                <input type="text" name="communityTitle" className="form-control"
                                        value={input.communityTitle} onChange={changeInput}/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>상태</label>
                                <input type="text" name="communityState" className="form-control"
                                        value={input.communityState} onChange={changeInput}/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <label>내용</label>
                                <input type="text" name="communityContent" className="form-control"
                                        value={input.communityContent} onChange={changeInput}/>
                            </div>
                        </div>
                        
                    </div>
                    {/* <!-- 모달 푸터 - 종료, 확인, 저장 등 각종 버튼 --> */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-manual-close"
                                    onClick={closeModal}>닫기</button>
                        {addMode ? (
                            <button type="button" className="btn btn-success"
                                    onClick={saveCommunity}>저장</button>
                        ) : (
                            <button type="button" className="btn btn-warning"
                                    onClick={updateCommunity}>수정</button>
                        )}
                    </div>
                </div>
            </div>
        </div>


  </>);
}
export default CommunityList;