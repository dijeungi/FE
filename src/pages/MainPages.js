// src/components/Main/MainPages.js

import TicketOpen from "../components/main/TicketOpen";
import MainBanner from "../components/main/MainBanner";
import Category from "../components/main/MiniBanner";
import SubBanner from "../components/main/SubBanner";
import Ranking from "../components/main/Ranking";
import CCPlay from "../components/main/PromotionalVideo";
import Pop from "../components/share/Pop";
import Video from "../components/main/Video";

export default function MainPages() {
    return (
        <div className="mainPages">
            <Pop />
            <MainBanner />
            <Category />
            <Ranking />
            <SubBanner />
            <TicketOpen />
            <Video />
            <CCPlay />
        </div>
    );
}
