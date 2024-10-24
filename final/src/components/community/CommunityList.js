import axios from "axios";
import { useState, useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { GoTrash } from "react-icons/go";
import { Modal } from "bootstrap";
import { FaPlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { useMemo } from 'react';
import Jumbotron from "../Jumbotron";
import { NavLink, useNavigate } from "react-router-dom";
import { loginState, memberIdState, memberLoadingState } from "../../utils/recoil";
import { useRecoilValue } from "recoil"

const CommunityList = ()=>{
    //navigator
    const navigate = useNavigate();
    //dsad

    //state
    const [communityList, setCommunityList] = useState([]);

    //recoil
    const login = useRecoilValue(loginState);
    const memberId = useRecoilValue(memberIdState);
    const memberLoading = useRecoilValue(memberLoadingState);

    //token
    const accessToken = axios.defaults.headers.common["Authorization"];
    const refreshToken = window.localStorage.getItem("refreshToken")
                                        || window.sessionStorage.getItem("refreshToken");

    //effect
    useEffect(()=>{
        loadCommunityList();
    }, []);

    //callback
    const loadCommunityList = useCallback(async ()=>{
        const resp = await axios.get("/community/");
        setCommunityList(resp.data);
    }, [communityList]);

    return (<>
        {/* 제목 */}
        <Jumbotron title="게임게시판" content="커뮤니티"/>
        
        {/* 검색창 */}
        <div className="row mt-4">
            <div className="col">
                검색창 자리
            </div>
        </div>

        {/* 등록 버튼 */}
        <div className="row mt-4">
            <div className="col">
                <NavLink className="btn btn-success" to="/community/add">
                    <FaPlus/>
                    등록
                </NavLink>

                <button className="btn btn-success ms-2" 
                            onClick={e=>navigate("/community/add")}>
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
                                <th>글 번호</th>
                                <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                            {communityList.map(community=>(
                            <tr key={community.communityNo}>
                                <td>{community.communityNo}</td>
                                <td>
                                    <NavLink to={"/community/detail/"+community.communityNo}>
                                        {community.communityTitle}
                                    </NavLink>
                                </td>
                                <td>{community.communityNo}</td>
                                <td>{community.communityTitle}</td>
                                <td>
                                    {/* 
                                    <GoPencil className="text-warning"
                                        onClick={e=>editBook(book)}/>
                                    <GoTrash className="text-danger ms-2"
                                        onClick={e=>deleteBook(book)}/>
                                     */}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
<<<<<<< HEAD

            {/* 등록 버튼 */}
            <div className="row mt-4">
                <div className="col">
                    <NavLink className="btn btn-success" to="/community/add">
                        <FaPlus />
                        등록
                    </NavLink>

                    <button className="btn btn-success ms-2" 
                            onClick={() => navigate("/community/add")}>
                        <FaPlus />
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
                                    <th>글 번호</th>
                                    <th>제목</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.length > 0 ? (
                                    results.map(community => (
                                        <tr key={community.communityNo}>
                                            <td>{community.communityNo}</td>
                                            <td>
                                                <NavLink to={`/community/detail/${community.communityNo}`}>
                                                    {community.communityTitle}
                                                </NavLink>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">검색 결과가 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>  
    );
=======
        </div>
    </>);
>>>>>>> origin/main
};

export default CommunityList;