
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, memberLoadingState } from "../../utils/recoil";
import { Navigate } from "react-router";

const PrivateRoute = (props)=>{
    const memberLoading = useRecoilValue(memberLoadingState);
    const login = useRecoilValue(loginState);

    if(memberLoading === false) {
        return <h1>Loading...</h1>
    }

    return login === true ? props.element : <Navigate to="/member/login"/>;
};

export default PrivateRoute;