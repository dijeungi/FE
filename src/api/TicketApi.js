// src/api/reviewApi.js
import axiosInstance from "../api/AxiosInstance";
import axios from "axios";
import {useSelector} from "react-redux";

// Ticket
export const getTicketList = async (pageParam) => {
    const { page, size, sort, userId } = pageParam;
    const response = await axiosInstance.get(`/ticket/list`, {
        params: {
            page: page,
            size: size,
            sort: sort,
            userId: userId,
        },
    });
    return response.data;
};

// Ticket Seat
export const getSeatTickets = async (params) => {
    const { festivalId, dateId } = params;
    const response = await axiosInstance.get(`/ticket/seat`, {
        params: {
            festivalId: festivalId,
            dateId: dateId,
        },
    });
    return response.data;
};
// Ticket Add
export const addSeatTickets = async (requestBody) => {
    console.log(requestBody);
        const response = await axiosInstance.post(`/ticket/add`, {
            orderId: requestBody.orderId,
            festivalId: requestBody.festivalId,
            dateId: requestBody.dateId,
            memberId: requestBody.memberId,
            reFundStateName: "YET",
            locationNum: requestBody.seats
        });

        return  response.data();


};