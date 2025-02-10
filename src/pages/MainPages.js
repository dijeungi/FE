// src/components/Main/MainPages.js

import "../styles/Main/MainPages.css";

import TicketOpen from "../components/Main/TicketOpen";
import MainBanner from "../components/Main/MainBanner";
import Category from "../components/Main/Category";
import SubBanner from "../components/Main/SubBanner";
import RegionRanking from "../components/Main/RegionRanking";

export default function MainPages() {

    return (
        <div className="mainpage_container">
            <MainBanner />
            <Category/>
            <TicketOpen/>
            <SubBanner/>
            <RegionRanking/>
        </div>
    );
}
