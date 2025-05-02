import React, { useEffect, useState } from "react";
import "./ContactCenter.css";
import personIcon from "../../assets/personIcon.png";
import contactIcon from "../../assets/contactIcon.png";
import emailIcon from "../../assets/emailIcon.png";
import { chatData } from "../../utils/chatListData";
import dashboardImg from "./../../assets/dashboardImg.png";
import ticketIcon from "./../../assets/ticketIcon.png";
import dropDownIcon from "./../../assets/dropDownIcon.png";
import axios from "axios";
import sendMsgChatIcon from "./../../assets/sendMsgChatIcon.png";

const ContactCenter = () => {
  // const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [showTeamMates, setShowTeamMates] = useState(false);
  const [showTicketStatus, setShowTicketStatus] = useState(false);
  const [showResolvedPopUp, setShowResolvedPopUp] = useState(false);
  const [assignedTo, setAssignedTo] = useState(null);
  const [chatMssg, setChatMssg] = useState("");

  const handleChange = (e) => {
    setChatMssg(e.target.value);
  };

  const handleShowResolvedPopUp = () => {
    setShowResolvedPopUp(!showResolvedPopUp);
  };

  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://ticketing-system-usx8.onrender.com/api/chats",
        {
          ticketId: activeTicket.id,
          sender: "admin",
          message: chatMssg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setAllTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === activeTicket.id
            ? {
                ...ticket,
                wholeChat: [...ticket.wholeChat, data],
              }
            : ticket
        )
      );
      setActiveTicket((prevTicket) => ({
        ...prevTicket,
        wholeChat: [...prevTicket.wholeChat, data],
      }));
      setChatMssg("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const confirmResolved = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://ticketing-system-usx8.onrender.com/api/tickets/${activeTicket.id}/status`,
        { status: "Resolved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setAllTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === activeTicket.id
            ? { ...ticket, status: "Resolved" }
            : ticket
        )
      );
      setActiveTicket((prevTicket) => ({ ...prevTicket, status: "Resolved" }));
      setShowResolvedPopUp(false);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://ticketing-system-usx8.onrender.com/api/tickets/contactsCenter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setAllTickets(data.tickets);
        setTeamMembers(data.teamMembers);
        setActiveTicket(data?.tickets[0]);
        setAssignedTo(data?.tickets[0]?.assignedTo);
        // setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleActiveTicket = (ticket) => {
    setActiveTicket({ ...ticket });
    if (ticket.replyDate == null) {
      const currDateTimeIs = new Date().toISOString();
      const date = new Date(currDateTimeIs);
      const localDateTime = date.toLocaleString();
      console.log(localDateTime);
    }
    console.log("active ticket in handle function", ticket);
  };

  const handleShowTeamMates = () => {
    setShowTeamMates(!showTeamMates);
  };

  const handleShowTicketStatus = () => {
    setShowTicketStatus(!showTicketStatus);
  };

  return (
    <div className="contactCenterContainer">
      <div className="firstDiv">
        <div className="heading">
          <p>Contact Center</p>
        </div>
        <div className="chats">
          <div className="chatHeading">Chats</div>
          <div className="chatLists">
            {allTickets.map((chat, id) => (
              <div
                className={`chatList ${
                  activeTicket?.id === chat.id ? "active" : ""
                }`}
                key={id}
                onClick={() => handleActiveTicket(chat)}
              >
                <div className="chatName">Chat {id + 1}</div>
                <div className="lastMsg">{chat.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="midDiv">
        <div className="topHead">
          <div className="id">
            <p>{activeTicket?.ticketId}</p>
          </div>
          <div className="imgDiv">
            <img src={dashboardImg} alt="" />
          </div>
        </div>
        <div className="ticketChatDiv">
          <div className="chatDiv">
            {activeTicket?.status === "Resolved" ? (
              <div className="resolvedChat">
                <hr />
                <p>This chat has been resolved</p>
              </div>
            ) : (
              <div className="unresolvedChat">
                <hr />
                {activeTicket?.wholeChat.map((chat, id) => (
                  <div className="chat" key={id}>
                    <div className={`chatName ${chat.sender}contactCenter`}>
                      {chat.sender === "visitor" ? "Chat" : assignedTo.name}
                    </div>
                    <div className={`msg ${chat.sender}contactCenter`}>
                      {chat.message}
                    </div>
                    {chat.sender === "visitor" && activeTicket.isMissed && (
                      <div className="missedChat">
                        <p>Replying to missed chat</p>
                      </div>
                    )}
                  </div>
                ))}
                <div className="chatInput">
                  <input
                    type="text"
                    placeholder="Type here"
                    value={chatMssg}
                    onChange={handleChange}
                  />
                  <button onClick={handleSendMessage}>
                    <img src={sendMsgChatIcon} alt="" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lastDiv">
        <div className="top">
          <p>Chat</p>
        </div>
        <div className="detailsContainer">
          <div className="details">
            <p>Details</p>
          </div>
          <div className="contDetails">
            <div className="innerDiv">
              <img src={personIcon} alt="" />
              <div>{activeTicket?.visitor.name}</div>
            </div>
            <div className="innerDiv">
              <img src={contactIcon} alt="" />
              <div>{activeTicket?.visitor.phone}</div>
            </div>
            <div className="innerDiv">
              <img src={emailIcon} alt="" />
              <div>{activeTicket?.visitor.email}</div>
            </div>
          </div>
        </div>
        <div className="teamMatesContainer">
          <div className="heading">
            <p>Teammates</p>
          </div>
          <div className="teammatesDetails">
            <div className="innerDiv">
              <img src={personIcon} alt="" />
              <div>
                <p>{activeTicket?.assignedTo?.name}</p>
                <img
                  src={dropDownIcon}
                  alt="downIcon"
                  onClick={() => handleShowTeamMates()}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            {showTeamMates && (
              <div className="teamMatesList">
                {teamMembers.map((member, id) => (
                  <div className="teamMates" key={id}>
                    <img src={personIcon} alt="" />
                    <p>{member.firstName + " " + member.lastName}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="innerDiv">
              <img src={ticketIcon} alt="" />
              <div>
                <p>Ticket Status</p>
                <img
                  src={dropDownIcon}
                  alt="downIcon"
                  onClick={() => handleShowTicketStatus()}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            {showTicketStatus && (
              <div className="ticketStatusList">
                <p className="ticketStatus" onClick={handleShowResolvedPopUp}>
                  Resolved
                </p>
                <p className="ticketStatus">Unresolved</p>
              </div>
            )}
            {showResolvedPopUp && (
              <div className="resolvedPopUp">
                <p>Chat will be closed</p>
                <div className="btns">
                  <button
                    className="cancelBtn"
                    onClick={handleShowResolvedPopUp}
                  >
                    Cancel
                  </button>
                  <button className="confirmBtn" onClick={confirmResolved}>
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCenter;
