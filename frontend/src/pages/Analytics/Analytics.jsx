import React, { useEffect, useState } from "react";
import "./Analytics.css";
import LineChartComponent from "./../../components/LineChartComponent";
import axios from "axios";

const Analytics = () => {
  const missedChatsData = [
    { week: "Week 1", missedChats: 5 },
    { week: "Week 2", missedChats: 8 },
    { week: "Week 3", missedChats: 3 },
    { week: "Week 4", missedChats: 10 },
  ];

  const [totalChats, setTotalChats] = useState(0);
  const [resolvedTickets, setResolvedTickets] = useState(0);
  const [missedChats, setMissedChats] = useState(0);
  const [averageReplyTime, setAverageReplyTime] = useState(0);
  const [resolvedTicketsPercentage, setResolvedTicketsPercentage] = useState(0);
  const [missedChatsPerWeek, setMissedChatsPerWeek] = useState([]);

  useEffect(() => {
    const fetchTotalChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ticketing-system-usx8.onrender.com/api/analytics/total-chats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalChats(response.data.totalTickets);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching total chats:", error);
      }
    };

    fetchTotalChats();
  }, []);

  useEffect(() => {
    const fetchResolvedTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ticketing-system-usx8.onrender.com/api/analytics/resolved-chats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResolvedTickets(response.data.resolvedTickets);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching resolved tickets:", error);
      }
    };

    fetchResolvedTickets();
  }, []);

  useEffect(() => {
    if (totalChats > 0 && resolvedTickets >= 0) {
      setResolvedTicketsPercentage((resolvedTickets / totalChats) * 100);
    }
  }, [totalChats, resolvedTickets]);

  useEffect(() => {
    const fetchMissedChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ticketing-system-usx8.onrender.com/api/analytics/missed-chats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMissedChats(response.data.missedChats);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching missed chats:", error);
      }
    };

    fetchMissedChats();
  }, []);

  useEffect(() => {
    const fetchAverageReplyTime = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ticketing-system-usx8.onrender.com/api/analytics/average-reply-time",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAverageReplyTime(response.data.averageReplyTime);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching average reply time:", error);
      }
    };

    fetchAverageReplyTime();
  }, []);

  useEffect(() => {
    const fetchMissedChatsPerWeek = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ticketing-system-usx8.onrender.com/api/analytics/missed-chats-per-week",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMissedChatsPerWeek(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching missed chats per week:", error);
      }
    };

    fetchMissedChatsPerWeek();
  }, []);

  return (
    <div className="analyticsContainer">
      <div className="header">
        <p>Analytics</p>
      </div>
      <div className="graphContainer">
        <p className="heading">Missed Chats</p>
        {<LineChartComponent data={missedChatsPerWeek} />}
      </div>
      <div className="secondCont">
        <div className="head">
          <p>Average Reply time</p>
        </div>
        <div className="content">
          <p>
            For highest customer satisfaction rates you should aim to reply to
            an incoming customer's message in 15 seconds or less. Quick
            responses will get you more conversations, help you earn customers
            trust and make more sales.
          </p>
          <p className="secs" style={{ color: "green", fontSize: "16px" }}>
            {averageReplyTime} secs
          </p>
        </div>
      </div>
      <div className="thirdCont">
        <div className="head">
          <p>Resolved Tickets</p>
        </div>
        <div className="content">
          <p>
            A callback system on a website, as well as proactive invitations,
            help to attract even more customers. A separate round button for
            ordering a call with a small animation helps to motivate more
            customers to make calls.
          </p>
          <p style={{ color: "green", fontSize: "16px" }}>
            {resolvedTicketsPercentage}%
          </p>
        </div>
      </div>
      <div className="fourthCont">
        <div className="head">
          <p>Total Chats</p>
        </div>
        <div className="content">
          <p>
            This metric Shows the total number of chats for all Channels for the
            selected the selected period{" "}
          </p>
          <p style={{ color: "green", fontSize: "16px" }}>{totalChats} Chats</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
