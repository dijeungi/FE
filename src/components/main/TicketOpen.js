import { useEffect, useState } from "react";
import { getTickOpenList } from "../../api/festivalApi";
import Slide from "./Slide";

const TicketOpen = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await getTickOpenList();
            setTickets(data);
        };
        fetchTickets();
    }, []);

    return <Slide data={tickets} title="티켓오픈 🎉" link="/ranking" isRanking={false} />;
};

export default TicketOpen;
