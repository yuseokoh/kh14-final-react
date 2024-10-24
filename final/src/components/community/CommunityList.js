import axios from "axios";
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import Jumbotron from "../Jumbotron";
import { NavLink, useNavigate } from "react-router-dom";
import { loginState, memberIdState, memberLoadingState } from "../../utils/recoil";
import { useRecoilValue } from "recoil"

const CommunityList = () => {
    // navigator
    const navigate = useNavigate();

    // state
    const [communityList, setCommunityList] = useState([]);
    const [keyword, setKeyword] = useState(""); // 검색어
    const [results, setResults] = useState([]); // 검색 결과 목록

    // recoil
    const login = useRecoilValue(loginState);
    const memberId = useRecoilValue(memberIdState);
    const memberLoading = useRecoilValue(memberLoadingState);

    // effect: 처음에 전체 목록을 불러옴
    useEffect(() => {
        loadCommunityList();
    }, []);

    // 전체 커뮤니티 목록을 불러오는 함수
    const loadCommunityList = async () => {
        try {
            const resp = await axios.get("/community/");
            setCommunityList(resp.data);
            setResults(resp.data); // 초기 검색 결과는 전체 목록과 동일
        } catch (error) {
            console.error("목록 로드 중 오류 발생:", error);
        }
    };

    // 검색 버튼을 눌렀을 때 호출되는 함수
    const handleSearch = async () => {
        if (!keyword.trim()) {
            setResults(communityList); // 검색어가 없을 경우 전체 목록으로 설정
            return;
        }

        try {
            const response = await axios.get(`/community/search/title/${keyword}`);
            setResults(response.data); // 검색 결과 설정
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    };

    return (
        <>
            {/* 제목 */}
            <Jumbotron title="게임게시판" content="커뮤니티" />

            {/* 검색창 */}
            <div className="row mt-4">
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="검색어를 입력하세요" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} // 검색어 상태 업데이트
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={handleSearch}>
                        검색
                    </button>
                </div>
            </div>

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
};

export default CommunityList;
