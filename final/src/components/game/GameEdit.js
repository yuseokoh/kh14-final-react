import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const GameEdit = ()=>{
    //파라미터 추출
    const{gameNo} = useParams();

    //네비게이터
    const navigate = useNavigate();

    //state
    const [game, setGame] = useState(null);

    //effect
    useEffect(() =>{
        loadGame();

    },[]);
    
    //callback
    const loadGame = useCallback(async ()=> {
        try {
            const resp = await axios.get("http://localhost:8080/game"+gameId);
            setGame(resp.data);
        }
        catch(e){
            setGame(null);
        }
    }, [game, gameNo]);

    const changeGame = useCallback(E=>{
        setGame({
            ...game,
            [e.target.name] : e.target.value
        });
    }, [game]);

    const updateGame = useCallback(async () => {
        //추가한다면 변경내용이 없을때 차단

        await axios.put("http://localhost:8080/game/", game);

        navigate("/game/detail/"+gameNo);
    },[game]);

    return(game !== null ? (<>
        <h1>{game.gameTitle+" 정보 수정"}</h1>
        
        <div className="row mt-4">
            <div className="col">
                <label>게임제목</label>    
                <input type="text" name="gameTitle" className="form-control"
                    value={game.gameTitle} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>금액</label>    
                <input type="number" name="gamePrice" className="form-control"
                    value={game.gamePrice} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>개발자</label>    
                <input type="text" name="gameDeveloper" className="form-control"
                    value={game.gameDeveloper} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>출시일</label>    
                <input type="date" name="gamePublicationDate" className="form-control"
                    value={game.gamePublicationDate} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>할인율</label>    
                <input type="number" name="gameDiscount" className="form-control"
                    value={game.gameDiscount} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>카테고리</label>    
                <input type="text" name="gameCategory" className="form-control"
                    value={game.gameCategory} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>등급</label>    
                <input type="text" name="gameGrade" className="form-control"
                    value={game.gameGrade} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>테마</label>    
                <input type="text" name="gameTheme" className="form-control"
                    value={game.gameTheme} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>설명</label>    
                <input type="text" name="gameDescription" className="form-control"
                    value={game.gameDescription} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>간단설명</label>    
                <input type="text" name="gameShortDescription" className="form-control"
                    value={game.gameShortDescription} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>평점</label>    
                <input type="number" name="gameUserScore" className="form-control"
                    value={game.gameUserScore} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>리뷰스</label>    
                <input type="numbber" name="gameReviewCount" className="form-control"
                    value={game.gameReviewCount} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>플랫폼</label>    
                <input type="text" name="gamePlatforms" className="form-control"
                    value={game.gamePlatforms} onChange={changeGame}/>
            </div>
        </div>            
        
        <div className="row mt-4">
            <div className="col">
                <label>시스템요구사항</label>    
                <input type="text" name="gameSystemRequirement" className="form-control"
                    value={game.gameSystemRequirement} onChange={changeGame}/>
            </div>
        </div>            

    </>) : (<></>));
};

export default GameEdit;