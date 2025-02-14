import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Information from '../components/info/Information';
import UseInfo from '../components/info/UseInfo';
import Review from '../components/info/Review';
import Expectation from '../components/info/Expectation';
import Qna from '../components/info/Qna';
import Tabs from '../components/info/Tabs';
import { getInfoDetails } from '../api/festivalApi';

const InfoDetailPage = () => {
    const { festivalId } = useParams();
    const [festivalData, setFestivalData] = useState(null);
    const [currentTab, setCurrentTab] = useState('UseInfo');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFestivalData = async () => {
            try {
                setLoading(true);
                const data = await getInfoDetails(festivalId);
                setFestivalData(data);
            } catch (err) {
                console.error("Failed to fetch festival details:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFestivalData();
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
        <div className="DetailPage-wrap">
            <Information festivalData={festivalData} />
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {tabContent[currentTab] || <UseInfo />}
        </div>
    );
};

export default InfoDetailPage;