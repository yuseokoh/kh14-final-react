import axios from "axios";
import { useEffect, useState, useNavigate, useCallback } from "react";
import { Navigate } from "react-router";

const GameDetail = ()=>{
    //navigatior
    const navigate = useNavigate();

    //Game파라미터를 읽는명령
    const { gameNo } = useParams();
    
    //state
    const [game, setGame] = useState(null);
    const [load, setLoad] = useState(false);

    //effect
    useEffect(() => {
        loadGame();
    }, [gameNo]);

    //callback
    const loadGame = useCallback(async () => {
        try{
            const resp = await axios.get(`http://localhost:8080/game/${gameNo}`);
            setGame(resp.data);
        }
        catch {
            //조회 실패시
            setGame(null);
        }
        setLoad(true);//로딩이 완료되었음을 마킹
    }, [gameNo]); //gameNo 의존성 배열에 추가

    const deleteGame = useCallback(async () => {
        await axios.delete(`http://localhost:8080/game/${gameNo}`);
        navigate("/game/list");
    }, [gameNo, Navigate]);

    if(load === false) {
        return (
            <>
                <h2>로딩중...</h2>
            </>
        );
    }

    if (game === null){
        return <navigate to="/notFound"/>
    }

    return (<>
        <h1>`${gameNo}번게임 상세정보`</h1>
            <div className="row mt-4">
                <div className="col-sm-3">게임명</div>
                <div className="col-sm-9">{game.gameTitle}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 가격</div>
                <div className="col-sm-9">{game.gamePrice}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 개발자</div>
                <div className="col-sm-9">{game.gameDeveloper}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 출시일</div>
                <div className="col-sm-9">{game.gamePublicationDate}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 할인율</div>
                <div className="col-sm-9">{game.gameDiscount}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 카테고리</div>
                <div className="col-sm-9">{game.gameCategory}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 등급</div>
                <div className="col-sm-9">{game.gameGrade}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 테마</div>
                <div className="col-sm-9">{game.gameTheme}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 상세설명</div>
                <div className="col-sm-9">{game.gameDescription}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 간단설명</div>
                <div className="col-sm-9">{game.gameShortDescription}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 평점</div>
                <div className="col-sm-9">{game.gameUserScore}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 리뷰수</div>
                <div className="col-sm-9">{game.gameReviewCount}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 지원 플랫폼</div>
                <div className="col-sm-9">{game.gamePlatform}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 시스템요구사항</div>
                <div className="col-sm-9">{game.gameSystemRequirement}</div>
            </div>

            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={() => navigate("/game/add")}>신규 등록</button>
                    <button className="btn btn-secondary ms-2" onClick={() => navigate("/game/list")}>목록 보기</button>
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/game/edit/${gameNo}`)}>수정하기</button>
                    <button className="btn btn-danger ms-2" onClick={deleteGame}>삭제하기</button>
                </div>
            </div>
    </>);
};

export default GameDetail;