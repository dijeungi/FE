import { useState } from "react";
import "../../styles/info/Tabs.css";
import "../../styles/info/Casting.css";

const DetailFooter = (props) => {
    const { castingList, imgSrc1, imgSrc2, imgSrc3 } = props;

    const [showAll, setShowAll] = useState(false);

    const displayedList = showAll ? castingList : castingList.slice(0, 5);

    return (
        <div className="TabContainer">
            {/* <ul className="TabList">
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
            </ul> */}
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
                                        src={casting.profileImage || "https://hkapp.kr/common/img/default_profile.png"}
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
        </div>
    );
};

export default DetailFooter;
