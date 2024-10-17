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
import { useTranslation } from 'react-i18next';

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