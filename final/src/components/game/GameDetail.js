import { useEffect, useState, useNavigate } from "react";

const GameDetail = ()=>{
    //navigatior
    const navigate = useNavigate();

    //Game파라미터를 읽는명령
    const { gameNo } = useParams();
    
    //state
    const [game, setGame] = useState(null);
    const [load, setLoadf] = useState(false);

    //effect
    useEffect(() => {
        loadGame();
    }, [gameNo]);



    return (<>
        <h1>`${gameNo}번게임 상세정보`</h1>
            <div className="row mt-4">
                <div className="col-sm-3">게임명</div>
                <div className="col-sm-9">{game.gameTitle}</div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-3">게임 가격</div>
                <div className="col-sm-9">{game.game}</div>
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
                    <button className="btn btn-success" onClick={() => navigate("/book/add")}>신규 등록</button>
                    <button className="btn btn-secondary ms-2" onClick={() => navigate("/book/list")}>목록 보기</button>
                    <button className="btn btn-warning ms-2" onClick={() => navigate(`/book/edit/${bookId}`)}>수정하기</button>
                    <button className="btn btn-danger ms-2" onClick={deleteBook}>삭제하기</button>
                </div>
            </div>
    </>);
};

export default GameDetail;