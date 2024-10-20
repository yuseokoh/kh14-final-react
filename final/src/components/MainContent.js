import { Routes, Route } from "react-router";
import Home from './Home';
import { useRecoilValue } from "recoil";
import { loginState } from "../utils/recoil";
import MemberLogin from "./member/MemberLogin";
import PaymentMethodPage from "./payment/PaymentMethodPage";
import PaymentConfirmationPage from "./payment/PaymentConfirmationPage";
import PaymentSuccessPage from "./payment/PaymentSuccessPage";
import PrivateRoute from "../router/PrivateRoute";
import PaymentCancellationPage from "./payment/PaymentCancellationPage";

import FriendRequest from "./friend/FriendRequest";
import FriendList from "./friend/FriendList";

import SingUp from './member/SingUp'; 
import { useTranslation } from 'react-i18next';
import CommunityList from "./community/CommunityList";
import WishList from "./wishlist/WishList";


const MainContent = () => {
    const { t } = useTranslation(); // 번역 훅 사용
    //recoil에서 login 상태를 불러온다
    const login = useRecoilValue(loginState);

    return (<>
        {/* 컨테이너 */}
        <div className="container-fluid">

            {/* 메인 폭 조절 영역 */}
            <div className="row my-5 pt-4">

                {/* 주소에 따라 배치될 화면에 대한 설정(라우터) */}
                <Routes>
                    <Route exact path="/" element={<Home />} />

                    {/* 로그인이 필요한 페이지라면 element에 PrivateRoute를 적어서 대상을 명시하면 된다 */}



                    {/* 경로변수를 사용할 경우 콜론과 이름을 합쳐 변수명으로 지정 */}

                        {/* 결제 */}
                        <Route path="/payment/method" element={<PaymentMethodPage/>}/>
                        <Route path="/payment/confirmation" element={<PaymentConfirmationPage/>}/>
                        <Route path="/payment/confirmation/success/:partnerOrderId" element={<PaymentSuccessPage />} />
                        <Route path="/payment/cancel" element={<PaymentCancellationPage />} />


                    {/* 기존 : 일반 라우팅 */}
                    {/* <Route path="/search/autocomplete" element={<AutoComplete/>}/> */}
                    {/* <Route path="/search/autocomplete2" element={<AutoComplete2/>}/> */}
                    {/* <Route path="/search/member" element={<MemberComplexSearch/>}/> */}

                    {/* 변경 : 중첩 라우팅 */}

                    {/* 회원 로그인 */}
                    <Route path="/member/login" element={<MemberLogin />} />



                    {/* 친구목록 */}
                    <Route path="/friend/list" element={<FriendList/>} />
                    <Route path="/friend/request" element={<FriendRequest/>} />


                    {/* 커뮤니티(게시판) */}
                    <Route path="/community/CommunityList" element={<CommunityList/>} />



                    {/* 회원가입 */}
                    <Route path="/member/signup" element={<SingUp />} />

                    {/* 결제 */}
                    <Route path="/payment/method" element={<PaymentMethodPage />} />
                    <Route path="/payment/confirmation" element={<PaymentConfirmationPage />} />
                    <Route path="/payment/confirmation/success/:partnerOrderId" element={<PaymentSuccessPage />} />
                    <Route path="/payment/cancel" element={<PaymentCancellationPage />} />

                    {/* 회원 로그인 */}
                    <Route path="/member/login" element={<MemberLogin />} />
                    {/* 찜 */}
                    <Route path="/wishlist" element={<WishList />} />
                </Routes>

            </div>
        </div>
    </>);
};
export default MainContent;