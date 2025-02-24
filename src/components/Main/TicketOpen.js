import { useEffect, useState } from "react";
import { getTickOpenList } from "../../api/festivalApi";
import Slide from "./Slide";

const TicketOpen = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const data = await getTickOpenList();
                setTickets(data);
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <p>서버와 통신 중..</p>;
    if (error) return <p>티켓 오픈: {error.message}</p>;

    return <Slide data={tickets} title="티켓오픈 🎉" link="/ticketopen" isRanking={false} />;
};

export default TicketOpen;
