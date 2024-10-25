import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

const GameAdd = ()=>{
    const navigate = useNavigate();

    //state
    //입력창
    const [input, setInput] = useState({
        gameTitle:"",
        gamePrice:"",
        gameDeveloper:"",
        gamePublicationDate:"",
        gameDiscount:"",
        gameCategory:"",
        gameGrade:"",
        gameTheme:"",
        gameDescription:"",
        gameShortDescription:"",
        gameUserScore:"",
        gameReviewCount:"",
        gamePlatforms:"",
        gameSystemRequirement:"",
    });

    //게임 등록에 사용할 함수
    const changeInput = useCallback(e=> {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }, [input]);

    const saveGame = useCallback(async()=> {
        try {
            // 콤마 제거하고 숫자로 변환
            const formattedInput = {
                ...input,
                gamePrice: parseInt(input.gamePrice.replace(/,/g, '')),
                gameDiscount: parseInt(input.gameDiscount),
                gameUserScore: parseFloat(input.gameUserScore),
                gameReviewCount: parseInt(input.gameReviewCount)
            };
            
            const resp = await axios.post("http://localhost:8080/game/", formattedInput);
            navigate("/game/list");
        } catch(error) {
            console.error("Error:", error);
        }
    }, [input, navigate]);

    return (<>
        <h1>게임 등록페이지</h1>
        <div className="row mt-4">
            <div className="col">
                <button type="button" className="btn btn-lg btn-success"
                onClick={saveGame}>
                    등록
                </button>
                <button type="button" className="btn btn-lg btn-success ms-2"
                    onClick={e=>navigate("/game/list")}>
                    목록                        
                </button>

                <div className="modal-body">
                    <div className="row mt-4">
                        <div className="col">
                            <label>게임명</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ex)Dark Souls3"
                                name="gameTitle"
                                value={input.gameTitle}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>금액</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ex)33,000"
                                name="gamePrice"
                                value={input.gamePrice}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>개발자</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ex)FromSoftware"
                                name="gameDeveloper"
                                value={input.gameDeveloper}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>출시일</label>
                            <input
                                type="date"
                                className="form-control"
                                name="gamePublicationDate"
                                value={input.gamePublicationDate}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>할인율</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="ex)17%"
                                name="gameDiscount"
                                value={input.gameDiscount}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>카테고리</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ex)RPG"
                                name="gameCategory"
                                value={input.gameCategory}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>등급</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ex)15세 이용가"
                                name="gameGrade"
                                value={input.gameGrade}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>설명</label>
                            <input
                                type="text"
                                className="form-control"
                                name="gameDescription"
                                value={input.gameDescription}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>한줄설명</label>
                            <input
                                type="text"
                                className="form-control"
                                name="gameShortDescription"
                                value={input.gameShortDescription}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>평점</label>
                            <input
                                type="number"
                                className="form-control"
                                name="gameUserScore"
                                value={input.gameUserScore}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>리뷰 수</label>
                            <input
                                type="number"
                                className="form-control"
                                name="gameReviewCount"
                                value={input.gameReviewCount}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>지원플랫폼</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ex)Linux,Mac,Window"
                                name="gamePlatforms"
                                value={input.gamePlatforms}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <label>시스템 요구사항</label>
                            <input
                                type="text"
                                className="form-control"
                                name="gameSystemRequirement"
                                value={input.gameSystemRequirement}
                                onChange={changeInput}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
    </>);
};

export default GameAdd;