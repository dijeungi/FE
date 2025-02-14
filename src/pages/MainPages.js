// src/components/Main/MainPages.js

import TicketOpen from "../components/Main/TicketOpen";
import MainBanner from "../components/Main/MainBanner";
import Category from "../components/Main/MiniBanner";
import SubBanner from "../components/Main/SubBanner";
import Ranking from "../components/Main/Ranking";
import CCPlay from "../components/Main/PromotionalVideo";
import Pop from "../components/Share/Pop";
import Video from "../components/Main/Video";

export default function MainPages() {

    return (
        <div className="mainPages">
            <Pop/>
            <MainBanner/>
            <Category/>
            <Ranking/>
            <SubBanner/>
            <TicketOpen/>
            <Video/>
            <CCPlay/>
        </div>
    );
}
