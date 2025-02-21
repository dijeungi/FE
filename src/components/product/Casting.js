import { useState } from 'react';
import '../../styles/info/Casting.css';

const Casting = ({ castingList = [] }) => {

    // 더보기
    const [showAll, setShowAll] = useState(false);

    if (castingList.length === 0) {
        return <p className="Casting_NoData">캐스팅 가 없습니다.</p>;
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

export default Casting;
