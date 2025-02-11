// src/components/Main/MainPages.js

import "../styles/Main/MainPages.css";

import TicketOpen from "../components/Main/TicketOpen";
import MainBanner from "../components/Main/MainBanner";
import Category from "../components/Main/Category";
import SubBanner from "../components/Main/SubBanner";
import RegionRanking from "../components/Main/RegionRanking";
import WeekExhibition from "../components/Main/WeekExhibition";
import Pop from "../components/Pop";
import Video from "../components/Main/Video";

export default function MainPages() {

    return (
        <div className="mainPages">
            <Pop/>
            <MainBanner/>
            <Category/>
            <TicketOpen/>
            <SubBanner/>
            <RegionRanking/>
            <WeekExhibition/>
            <Video/>
        </div>
    );
}
