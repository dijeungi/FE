import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFestivalDetail } from "../../redux/DetailSlice";
import { useEffect } from "react";
import "../../styles/info/Tabs.css";
import "../../styles/info/Casting.css";

const tabs = [
    { key: "FestivalInfo", label: "공연정보" },
    { key: "UseInfo", label: "이용정보" },
    { key: "Review", label: "이용후기" },
    { key: "Expectation", label: "기대평" },
    { key: "Qna", label: "Q&A" },
];

const DetailFooter = (props) => {
    const {
        festivalId,
        festivalDetails,
        totalStar,
        isLiked,
        likeCount,
        placeLocation,
        selectedDate,
        selectedTime,
        festivalTimeData,
        festivalName,
        ranking,
        fromDate,
        toDate,
        festivalPrice,
        salePrice,
        postImage,
        runningTime,
        age,
        placeDetailName,
        isMapOpen,
        castingList,

        imgSrc1,
        imgSrc2,
        imgSrc3,
    } = props;

    const [showAll, setShowAll] = useState(false);
    const [currentTab, setCurrentTab] = useState("FestivalInfo");

    const displayedList = showAll ? castingList : castingList.slice(0, 5);

    const renderContent = () => {
        switch (currentTab) {
            case "FestivalInfo":
                return (
                    <div className="Casting_Section">
                        <div className="Casting_Container">
                            <h3 className="Casting_Title">캐스팅</h3>
                        </div>
                        <div className="Casting_Wrap">
                            <ul className="Casting_List">
                                {displayedList.map((casting, index) => (
                                    <li key={index} className="Casting_Item">
                                        <div className="Casting_Profile">
                                            <img
                                                src={
                                                    casting.profileImage ||
                                                    "//ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/19/08/0400041908_45194_02803.gif"
                                                }
                                                alt={`${casting.actorName} 프로필 사진`}
                                                className="Casting_Image"
                                            />
                                        </div>
                                        <div className="Casting_Info">
                                            <div className="Casting_Actor">{casting.role}</div>
                                            <div className="Casting_Name">{casting.actorName}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="Casting_ToggleButton" onClick={() => setShowAll(!showAll)}>
                            {showAll ? "접기" : "더보기"}
                        </button>
                        <div className="Casting_InformationImage">
                            {imgSrc1 ? <img src={imgSrc1} alt="Additional Image" /> : null}
                            {imgSrc2 ? <img src={imgSrc2} alt="Additional Image" /> : null}
                            {imgSrc3 ? <img src={imgSrc3} alt="Additional Image" /> : null}
                        </div>
                    </div>
                );
            case "UseInfo":
                return <p>이용 정보 내용이 여기에 들어갑니다.</p>;
            case "Review":
                return <p>이용 후기 내용이 여기에 들어갑니다.</p>;
            case "Expectation":
                return <p>기대평 내용이 여기에 들어갑니다.</p>;
            case "Qna":
                return <p>Q&A 내용이 여기에 들어갑니다.</p>;
            default:
                return <p>해당하는 탭이 없습니다.</p>;
        }
    };

    return (
        <div className="TabContainer">
            <ul className="TabList">
                {tabs.map((tab) => (
                    <li key={tab.key} className={`TabItem ${currentTab === tab.key ? "active" : ""}`}>
                        <button
                            className={`TabButton ${currentTab === tab.key ? "active" : ""}`}
                            onClick={() => setCurrentTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="TabContent">{renderContent()}</div>
        </div>
    );
};

export default DetailFooter;
