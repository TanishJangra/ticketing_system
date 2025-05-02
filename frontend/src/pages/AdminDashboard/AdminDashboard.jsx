import React, {useState, useEffect } from "react";
import "./AdminDashboard.css";
import searchIcon from "./../../assets/searchIcon.png";
import ticketIcon from "./../../assets/ticketsIcon.png";
import axios from "axios";
const AdminDashboard = () => {

  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchTickets = async (tab) => {
      const token = localStorage.getItem("token");
    let endpoint = "https://ticketing-system-usx8.onrender.com/api/tickets";

    if (tab === "Resolved") {
      endpoint = "https://ticketing-system-usx8.onrender.com/api/tickets/resolved";
    } else if (tab === "Unresolved") {
      endpoint = "https://ticketing-system-usx8.onrender.com/api/tickets/unresolved";
    }
      try {
        const response = await axios.get(endpoint, 
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        console.log(response.data);
        setTickets(response.data);
      } catch (error) {
        console.error(`Error fetching ${tab.toLowerCase()} tickets:`, error);
      }
    };

    fetchTickets(activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="AdminDashboardContainer">
      <div className="header">
        <p>Dashboard</p>
      </div>
      <div className="searchBox">
        <img src={searchIcon} alt="search" className="searchIcon" />
        <input
          type="text"
          name="searchTicket"
          id="searchTicket"
          placeholder="Search for ticket"
        />
      </div>
      <div className="ticketsLists">
        <img src={ticketIcon} alt="icon" />
        <ul>
          <li className={activeTab === "All" ? "activeTab" : ""}
          onClick={() => handleTabClick("All")}>All Tickets</li>
          <li className={activeTab === "Resolved" ? "activeTab" : ""}
          onClick={() => handleTabClick("Resolved")}>Resolved</li>
          <li className={activeTab === "Unresolved" ? "activeTab" : ""}
          onClick={() => handleTabClick("Unresolved")}>Unresolved</li>
        </ul>
      </div>
      <div className="ticketDiv">
        {tickets.length>0 ? (tickets?.map((ticket, id) => (
          <div className="ticket" key={id}>
            <div className="ticketId">
              <div className="ticketIdDetails">
                <div
                  className="circle"
                  style={{ backgroundColor: ticket.circleColor }}
                ></div>
                <p>{ticket.ticketId}</p>
              </div>
              <p className="postedTime">Posted at {ticket.postedAt}</p>
            </div>
            <div className="ticketMssgDetails">
              <p>{ticket.msg}</p>
              <p className="responseTime">{ticket.responseTime? ticket.responseTime : "null"}</p>
            </div>
            <div className="bottomDiv">
              <div className="userInfo">
                <p>{ticket.userName}</p>
                <p>{ticket.mobileNo}</p>
                <p>{ticket.email}</p>
              </div>
              <div className="openTicket">
                <a href="/app/contact_center">Open Ticket</a>
              </div>
            </div>
          </div>
        ))):(
          <p style={{ padding: "1rem", color: "#888" }}>No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
