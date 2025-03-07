// src/components/Main/MainPages.js

import TicketOpen from "../components/main/TicketOpen";
import MainBanner from "../components/main/MainBanner";
import Category from "../components/main/MiniBanner";
import { SubBanner, SubBanner1 } from "../components/main/SubBanner";
import Ranking from "../components/main/Ranking";
import CCPlay from "../components/main/PromotionalVideo";
import Pop from "../components/share/Pop";
import Video from "../components/main/Video";
import Subpop from "../components/main/Subpop";
// import {getUserIdCookie} from "../utils/Cookie";
import UserMostFavorite from "../components/main/UserMostFavorite";
import { useSelector } from "react-redux";

export default function MainPages() {
    const userId = useSelector((state) => state.loginSlice.id);
    if (userId == null) {
    }
    return (
        <div className="mainPages">
            <Subpop />
            <Pop />
            <MainBanner />
            <Category />
            {userId !== null ? <UserMostFavorite userId={userId} /> : null}
            <Ranking />
            <SubBanner />
            <TicketOpen />
            <Video />
            <CCPlay />
        </div>
    );
}
