import { useState } from 'react';
import '../../styles/info/Tabs.css';
import '../../styles/info/Casting.css';
import '../../styles/info/UseInfo.css';

const tabs = [
    { key: 'FestivalInfo', label: '공연정보' },
    { key: 'CastingInfo', label: '캐스팅정보' },
    { key: 'UseInfo', label: '이용정보' },
    { key: 'Review', label: '이용후기' },
    { key: 'Expectation', label: '기대평' },
    { key: 'Qna', label: 'Q&A' },
];

const Casting = ({ castingList = [] }) => {
    const [showAll, setShowAll] = useState(false);

    if (castingList.length === 0) {
        return <p className="Casting_NoData">캐스팅 정보가 없습니다.</p>;
    }

    const displayedList = showAll ? castingList : castingList.slice(0, 5);

    return (
        <div className="Casting_Container">
            <h3 className="Casting_Title">캐스팅</h3>
            <button className="Casting_ToggleButton" onClick={() => setShowAll(!showAll)}>
                {showAll ? '접기' : '더보기'}
            </button>
            <div className="Casting_Wrap">
                <ul className="Casting_List">
                    {displayedList.map((casting, index) => (
                        <li key={index} className="Casting_Item">
                            <div className="Casting_Top">
                                <a className="Casting_Link">
                                    <div className="Casting_Profile">
                                        <img
                                            src={casting.profileImage || '//ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040004/19/08/0400041908_45194_02803.gif'}
                                            className="Casting_Image"
                                            alt={`${casting.actorName} 프로필 사진`}
                                        />
                                    </div>
                                </a>
                            </div>
                            <div className="Casting_Info">
                                <div className="Casting_Actor">{casting.role}</div>
                                <div className="Casting_Name">{casting.actorName}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const UseInfo = () => {
    return (
        <div className='Information1Box'>
            <h2>관람시간 정보</h2>
            <strong>[관람시간]</strong>
            <p>월-일 (휴관일 없음)</p>
            <p>오전 10시 - 오후 7시</p>
            <p>매월 마지막주 수요일 문화가 있는날</p>
            <p>오전 10시 - 오후 9시</p>
            <p>관람종료 1시간 전 입장 마감</p>
            <strong>[공휴일 정상개관]</strong>
            <p>5월 5일 부처님 오신날 / 어린이날</p>
            <p>5월 6일 대체 휴일</p>
            <p>6월 6일 현충일</p>

            <h2>할인 정보</h2>
            <p>* 성인 / 청소년 및 어린이 1인 1매 16,500원</p>
            <p>* 단체관람은 02-585-8988 로 문의바랍니다.</p>
        </div>
    );
};

const DetailTabs = () => {
    const [currentTab, setCurrentTab] = useState('FestivalInfo');

    const renderContent = () => {
        switch (currentTab) {
            case 'CastingInfo':
                return <Casting castingList={[]} />;
            case 'UseInfo':
                return <UseInfo />;
            default:
                return <p>현재 탭: {currentTab}</p>;
        }
    };

    return (
        <div className='TabContainer'>
            <ul className='TabList'>
                {tabs.map((tab) => (
                    <li
                        key={tab.key}
                        className={`TabItem ${currentTab === tab.key ? 'active' : ''}`}
                    >
                        <button
                            className={`TabButton ${currentTab === tab.key ? 'active' : ''}`}
                            onClick={() => setCurrentTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className='TabContent'>{renderContent()}</div>
        </div>
    );
};

export default DetailTabs;
