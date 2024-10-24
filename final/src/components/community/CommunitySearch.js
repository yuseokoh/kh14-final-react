import { useState } from 'react';
import axios from 'axios';

const CommunitySearch = () => {
    const [keyword, setKeyword] = useState(""); // 사용자가 입력한 검색어
    const [results, setResults] = useState([]); // 검색 결과

    // 검색 버튼을 눌렀을 때 호출되는 함수
    const handleSearch = async () => {
        if (keyword.length > 0) {  
            try {
                const response = await axios.get(`/community/search/title/${keyword}`);
                setResults(response.data); // 검색 결과 업데이트
            } catch (error) {
                console.error("검색 중 오류 발생:", error);
            }
        } else {
            setResults([]); // 검색어가 없으면 결과를 비웁니다.
        }
    };
    //dsada

    return (
        <div>
            <h2>게시글 제목 검색</h2>
            <input 
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)} // 검색어 입력 시 상태 업데이트
                placeholder="제목 검색"
            />
            <button onClick={handleSearch}>검색</button> {/* 검색 버튼 추가 */}
            
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((result) => (
                            <li key={result.communityNo}>
                                <a href={`/community/detail/${result.communityNo}`}>
                                    {result.communityTitle}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CommunitySearch;
