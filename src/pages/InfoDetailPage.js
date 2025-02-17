import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import Information from '../components/info/Information';
import UseInfo from '../components/info/UseInfo';
import Review from '../components/info/Review';
import Expectation from '../components/info/Expectation';
import Qna from '../components/info/Qna';
import Tabs from '../components/info/Tabs';
import Casting from '../components/info/Casting';

import { getInfoDetails, getCastingList } from '../api/festivalApi';

const InfoDetailPage = () => {
    const { festivalId } = useParams();
    const [festivalData, setFestivalData] = useState(null);
    const [castingList, setCastingList] = useState([]);
    const [currentTab, setCurrentTab] = useState('UseInfo');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Festival 데이터 가져오기
                const festivalDetails = await getInfoDetails(festivalId);
                setFestivalData(festivalDetails);

                // Casting List 가져오기
                const castings = await getCastingList(festivalId);
                setCastingList(castings);

            } catch (err) {
                console.error("Failed to fetch festival or casting data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [festivalId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading festival details: {error.message}</p>;

    const tabContent = {
        UseInfo: <UseInfo />,
        Review: <Review />,
        Expectation: <Expectation />,
        Qna: <Qna />,
    };

    return (
        <div className="DetailPage-wrap" style={{ margin: "0 auto", width: "1120px" }}>
            <Information festivalData={festivalData} />
            <Casting castingList={castingList} />
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {tabContent[currentTab] || <UseInfo />}
        </div>
    );
};

export default InfoDetailPage;