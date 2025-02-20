const KakaoChannelButton = () => {
    return (
        <a
            href="https://pf.kakao.com/_ieHbn"
            target="_blank"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "-30rem",
                zIndex: "1000"
            }}
        >
            <img
                src="https://dijeungi.github.io/imageHosting/images/kakaoChat.png"
                width="60"
                alt="카카오톡 채널 추가하기"
                style={{
                    width: "30%",
                    background: "transparent",
                }}
            />
        </a>
    );
};

export default KakaoChannelButton;
