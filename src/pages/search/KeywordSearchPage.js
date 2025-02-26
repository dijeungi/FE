import { useEffect, useState } from "react";
import {getKeywordSearch, getRankingList} from "../../api/festivalApi";
// import Slide from "./Slide";
import GridSlide from "./GridSlide";
import {useLocation, useParams} from "react-router-dom";

const KeywordSearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchKeyword = queryParams.get("keyword");
    const [searchKeywordResult, setSearchKeywordResult] = useState([]);

    useEffect(() => {
        if (!searchKeyword) {
            return;
        }
        const fetchKeywordSearch = async () => {
            console.log("검색어", searchKeyword);
            const data = await getKeywordSearch(searchKeyword);
            setSearchKeywordResult(data.festivalResults);
        };

        fetchKeywordSearch();

    }, [searchKeyword]);

    return <GridSlide data={searchKeywordResult} title="검색결과 👁" link={`/search`}
                      isRanking={false}/>;

};

export default KeywordSearchPage;
