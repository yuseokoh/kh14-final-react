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
import SingUp from './member/SingUp'; 
import { useTranslation } from 'react-i18next';
import CommunityList from "./community/CommunityList";


const MainContent = () => {
    const { t } = useTranslation(); // 번역 훅 사용
    const login = useRecoilValue(loginState); //recoil에서 login 상태를 불러온다

    return (<>
        <div className="container-fluid">
            <div className="row my-5 pt-4">
                <Routes>
                    <Route exact path="/" element={<Home />} />

                    {/* 결제 */}
                    <Route path="/payment/method" element={<PaymentMethodPage/>}/>
                    <Route path="/payment/confirmation" element={<PaymentConfirmationPage/>}/>
                    <Route path="/payment/confirmation/success/:partnerOrderId" element={<PaymentSuccessPage />} />
                    <Route path="/payment/cancel" element={<PaymentCancellationPage />} />

                    {/* 회원 로그인 */}
                    <Route path="/member/login" element={<MemberLogin />} />
                    {/* 회원가입 */}
                    <Route path="/member/signup" element={<SingUp />} />
                    {/* 결제 */}
                    <Route path="/payment/method" element={<PaymentMethodPage />} />
                    <Route path="/payment/confirmation" element={<PaymentConfirmationPage />} />
                    <Route path="/payment/confirmation/success/:partnerOrderId" element={<PaymentSuccessPage />} />
                    <Route path="/payment/cancel" element={<PaymentCancellationPage />} />

                    {/* 회원 로그인 */}
                    <Route path="/member/login" element={<MemberLogin />} />
                </Routes>
            </div>
        </div>
    </>);
};

export default MainContent;
