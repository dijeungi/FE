// src/components/Main/MainPages.js

import "../styles/Main/MainPages.css";

import TicketOpen from "../components/Main/TicketOpen";
import MainBanner from "../components/Main/MainBanner";
import Category from "../components/Main/Category";

export default function MainPages() {

    return (
        <div className="mainpage_container">
            <MainBanner />
            <Category/>
            <TicketOpen/>
        </div>
    );
}
