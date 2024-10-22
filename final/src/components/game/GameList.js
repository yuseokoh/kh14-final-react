import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";

const GameList = ()=>{
    //navigator
    const navigate = useNavigate();

    //state
    const [gameList , setGameList] = useState({});

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
        gamePlatform:"",
        gameSystemRequirement:"",
    });

    //game목록구현
    const loadList = useCallback(async () => {
        const resp = await axios.get("http://localhost:8080/game/");
        setGameList(resp.data);
    }, []);

    //effect
    useEffect(()=>{
        loadList();
    }, [loadList]);

    return (<>
        <h1>gameList</h1>
        <div className="row mt-4">
            <div className="col">

                <NavLink className="btn btn-success" to="/book/add">
                    등록
                </NavLink>

                <button className="btn btn-success ms-2"
                    onClick={e=> navigate("/game/add")}>
                    등록
                </button>

            </div>
        </div>

        <div className="row mt-4">
            <div className="col">
                <div className="table table-responsive">

                    <thead>
                        <tr>
                            <th>게임명</th>
                            <th>가격</th>
                            <th>개발자</th>
                            <th>출시일</th>
                            <th>할인율</th>
                            <th>카테고리</th>
                            <th>등급</th>
                            <th>테마</th>
                            <th>상세설명</th>
                            <th>간단설명</th>
                            <th>평점</th>
                            <th>리뷰수</th>
                            <th>플랫폼</th>
                            <th>시스템요구사항</th>
                        </tr>
                    </thead>

                    <tbody>
                        {GameList.map((game) => (
                            <tr key={game.gameNo}>
                                <td>{game.gameNo}</td>
                                <td>
                                    <NavLink to={"/game/detail/"+game.gameNo}>{game.gameTitle}</NavLink>
                                </td>
                                <td>{game.gamePrice}</td>
                                <td>{game.gameDeveloper}</td>
                                <td>{game.gamePublicationDate}</td>
                                <td>{game.gameDiscount}</td>
                                <td>{game.gameCategory}</td>
                                <td>{game.gameTheme}</td>
                                <td>{game.gameDescription}</td>
                                <td>{game.gameShortDescription}</td>
                                <td>{game.gameUserScore}</td>
                                <td>{game.gameReviewCount}</td>
                                <td>{game.gamePlatform}</td>
                                <td>{game.gameSystemRequirement}</td>
                            </tr>
                        ))}
                    </tbody>

                </div>
            </div>
        </div>
    </>);
};

export default GameList;