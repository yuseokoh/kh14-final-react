/*
    점보트론
    - 화면의 제목을 나타내기 위한 태그 모음
    - 자주 등장할 예정이므로 모듈화해서 사용
    - 외부에서 전달된 값을 props라고 선언해서 사용할 수 있다
    - 전달된 항목들을 props를 이용하여 접근할 수 있다(ex : props.항목명)
*/

const Jumbotron = (props)=>{
    return (<>
        <div className="row">
            <div className="col">
                <div className="bg-dark p-4 rounded">
                    <h1 className="text-light">{props.title || '제목'}</h1>
                    <p className="text-light">{props.content}</p>
                </div>
            </div>
        </div>
    </>);
};

export default Jumbotron;