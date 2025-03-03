import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { getAccessToken, getMemberWithAccessToken } from "../api/KakaoApi";
import { login } from "../redux/LoginSlice";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const authCode = searchParams.get("code");

    useEffect(() => {
        getAccessToken(authCode).then((accessToken) => {
            // console.log('getAccessToken: ', accessToken);
            getMemberWithAccessToken(accessToken)
                .then((memberInfo) => {
                    // console.log('memberInfo: ', memberInfo);
                    dispatch(login(memberInfo));

                    if (memberInfo) {
                        Swal.fire({
                            title: "로그인 성공",
                            text: "카카오 계정으로 로그인되었습니다.",
                            icon: "success",
                            confirmButtonText: "확인",
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("카카오 로그인 실패:", error);
                    Swal.fire({
                        title: "로그인 실패",
                        text: "카카오 로그인에 실패했습니다.",
                        icon: "error",
                        confirmButtonText: "확인",
                    }).then(() => {
                        navigate("/login");
                    });
                });
        });
    }, [authCode]);

    return (
        // <div>Kakao Login Redirect</div>
        <></>
    );
};

export default KakaoRedirectPage;
