import React, { useState } from "react";
import "./Dashboard.css";
import CheckIcon from "./../assets/Icon.png";
import githubIcon from "./../assets/githubIcon.png";
import mssgIcon from "./../assets/mssgIcon.png";
import linkedInIcon from "./../assets/linkedInIcon.png";
import thirdIcon from "./../assets/thirdIcon.png";
import twitterIcon from "./../assets/twitterIcon.png";
import youtubeIcon from "./../assets/youtubeIcon.png";
import instaIcon from "./../assets/instaIcon.png";
import { NavLink } from "react-router-dom";
import mssgBoxIcon from "./../assets/mssgBoxIcon.png";
import chatBoxIcon from "./../assets/chatBoxIcon.png";
import innerChatIcon from "./../assets/innerChatIcon.png";
import sendIcon from "./../assets/sendIcon.png";

import arrowIcon from "./../assets/arrowIcon.png";
import videoIcon from "./../assets/videoIcon.png";
import company_logo from "./../assets/company_logo.png";
import axios from "axios";
import logoImg from "./../assets/logoImg.png";

const Dashboard = ({chatConfig}) => {
  // console.log("data is ", chatConfig);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleChatBox = () => {
    setIsVisible(!isVisible);
    const chatBox = document.getElementById("chatBox");
    if (isVisible) {
      chatBox.classList.add("hidden");
    } else {
      chatBox.classList.remove("hidden");
    }
  };

  const [mssg, setMssg] = useState("");
  const [mssgList, setMssgList] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [visitorId, setVisitorId] = useState(null);
  const [showIntroMssg, setShowIntroMssg] = useState(false);
  const [introMssgs, setIntroMssgs] = useState([
    { sender: "hubly", message: chatConfig?.customizedMessages ? chatConfig?.customizedMessages[0] : "How can I help you?" },
    { sender: "hubly", message: chatConfig?.customizedMessages ? chatConfig?.customizedMessages[1] : "Ask me anything!" },

  ]);

  const handleSendMessage = async () => {
    
    if (mssg.trim() === "") return;
    if (mssgList.length === 0) {
      setShowUserForm(true);
      setMssgList([...mssgList, { sender: "visitor", message: mssg }]);
      return;
    }

    try {
      const id = localStorage.getItem("visitorId");
      const createdTicket = await axios.post(
        "https://ticketing-system-usx8.onrender.com/api/tickets",
        {
          visitorId: id,
          initialMessage: mssg,
        }
      );
      setShowIntroMssg(true);
      console.log("Ticket created:", createdTicket.data);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }

  };

  const handleSubmitForm = async () => {
    if (name.trim() === "" || phone.trim() === "" || email.trim() === "") {
      alert("Please fill all the fields");
      return;
    }
    const data = {
      name: name,
      phone: phone,
      email: email,
    };
    try {
      const response = await axios.post(
        "https://ticketing-system-usx8.onrender.com/api/visitors",
        data
      );
      console.log(response.data);
      console.log("msssgList", mssgList);
      localStorage.setItem("visitorId", response.data._id);
      setVisitorId(response.data._id);
      setShowUserForm(false);
      handleSendMessage();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  const handleInputChange = (e) => {
    setMssg(e.target.value);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="left">
          <img src={logoImg} alt="logo" />
          <h1>Hubly</h1>
        </div>
        <div className="right">
          <NavLink to="/login">
            <button className="loginBtn">Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="signupBtn">Sign up</button>
          </NavLink>
        </div>
      </nav>
      <div className="section_first">
        <div className="leftOuterDiv">
          <div className="left">
            <h2>Grow Your Business Faster with Hubly CRM</h2>
            <p>
              Manage leads, automate workflows, and close deals effortlessly-all
              in one powerful platform.
            </p>
            <div className="btns">
              <button className="first">
                Get Started
                <img src={arrowIcon} alt="arrow" />
              </button>
              <button className="second">
                <img src={videoIcon} alt="videoIcon" />
                Watch Video
              </button>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="mainImg">
            <img
              className="rightImg"
              src="./../src/assets/ImgSectionFirst.png"
              alt="img"
            />
          </div>

          <img
            className="calendarImg"
            src="./../src/assets/calendar.png"
            alt="calendar"
          />

          <img className="barImg" src="./../src/assets/barImg.png" alt="bar" />
        </div>
      </div>
      <div className="companyLogos">
        <img src={company_logo} alt="logos" />
      </div>
      <div className="frame1">
        <div className="div">
          <p className="title">At its core, Hubly is a robust CRM solution.</p>

          <p className="category-name">
            Hubly helps businesses streamline customer interactions, track
            leads, and automate tasks—saving you time and maximizing revenue.
            Whether you’re a startup or an enterprise, Hubly adapts to your
            needs, giving you the tools to scale efficiently.
          </p>
        </div>

        <div className="div-2">
          <div className="div-3">
            <div className="overlap-group">
              <div className="ellipse" />

              <div className="div-4">
                <img
                  className="img"
                  alt="Frame"
                  src="./../src/assets/downImg.png"
                />

                <div className="headline">CAPTURE</div>

                <div className="text-wrapper">NURTURE</div>

                <div className="headline-2">CLOSE</div>
              </div>

              <img
                className="dadcda-b"
                alt="Dadcda b"
                src="./../src/assets/topImg.png"
              />
            </div>

            <div className="div-5">
              <div className="div-6">
                <div className="headline-3">MULTIPLE PLATFORMS TOGETHER!</div>

                <p className="p">
                  Email communication is a breeze with our fully integrated,
                  drag &amp; drop email builder.
                </p>
              </div>

              <div className="div-7">
                <div className="div-6">
                  <div className="category-name-2">CLOSE</div>

                  <p className="category-name-3">
                    Capture leads using our landing pages, surveys, forms,
                    calendars, inbound phone system &amp; more!
                  </p>
                </div>

                <div className="div-6">
                  <div className="category-name-2">NURTURE</div>

                  <p className="category-name-4">
                    Capture leads using our landing pages, surveys, forms,
                    calendars, inbound phone system &amp; more!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame2">
        <div className="div">
          <div className="div-2">
            <p className="title">We have plans for everyone!</p>

            <p className="category-name">
              We started with a strong foundation, then simply built all of the
              sales and marketing tools ALL businesses need under one platform.
            </p>
          </div>

          <div className="div-3">
            <div className="div-4">
              <div className="div-5">
                <div className="div-6">
                  <div className="price">STARTER</div>

                  <p className="paragraph">
                    Best for local businesses needing to improve their online
                    reputation.
                  </p>
                </div>

                <div className="div-7">
                  <div className="element">
                    <div className="text-wrapper">$199</div>

                    <div className="monthly">
                      <div className="text-wrapper-2">/monthly</div>
                    </div>
                  </div>

                  <div className="div-8">
                    <div className="text">What’s included</div>

                    <div className="div-9">
                      <div className="point">
                        <img src={CheckIcon} className="check-icon" />
                        <div className="text-2">Unlimited Users</div>
                      </div>

                      <div className="point-2">
                        <img src={CheckIcon} className="check-icon" />
                        <div className="text-2">GMB Messaging</div>
                      </div>

                      <div className="point-3">
                        <img src={CheckIcon} className="check-icon" />
                        <div className="text-2">Reputation Management</div>
                      </div>

                      <div className="point-4">
                        <img src={CheckIcon} className="check-icon" />
                        <div className="text-2">GMB Call Tracking</div>
                      </div>

                      <div className="point-5">
                        <img src={CheckIcon} className="check-icon" />
                        <div className="text-2">24/7 Award Winning Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper">
                <div className="text-wrapper-3">SIGN UP FOR STARTER</div>
              </div>
            </div>

            <div className="div-10">
              <div className="div-6">
                <div className="price">GROW</div>

                <p className="paragraph">
                  Best for all businesses that want to take full control of
                  their marketing automation and track their leads, click to
                  close.
                </p>
              </div>

              <div className="div-7">
                <div className="element">
                  <div className="text-wrapper">$399</div>

                  <div className="monthly">
                    <div className="text-wrapper-2">/monthly</div>
                  </div>
                </div>

                <div className="div-8">
                  <div className="text">What’s included</div>

                  <div className="div-9">
                    <div className="point-6">
                      <img src={CheckIcon} className="check-icon" />
                      <div className="text-2">Pipeline Management</div>
                    </div>

                    <div className="point-7">
                      <img src={CheckIcon} className="check-icon" />
                      <div className="text-2">
                        Marketing Automation Campaigns
                      </div>
                    </div>

                    <div className="point-8">
                      <img src={CheckIcon} className="check-icon" />
                      <div className="text-2">Live Call Transfer</div>
                    </div>

                    <div className="point-2">
                      <img src={CheckIcon} className="check-icon" />
                      <div className="text-2">GMB Messaging</div>
                    </div>

                    <div className="point-9">
                      <img src={CheckIcon} className="check-icon" />
                      <div className="text-2">Embed-able Form Builder</div>
                    </div>

                    <div className="point-3">
                      <img src={CheckIcon} className="check-icon" />
                      <div className="text-2">Reputation Management</div>
                    </div>

                    <div className="point-10">
                      <img src={CheckIcon} className="check-icon" />
                      <div className="text-2">24/7 Award Winning Support</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="div-wrapper">
                <div className="text-wrapper-3">SIGN UP FOR STARTER</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-flex">
        <div className="leftOuterDiv">
          <div className="leftDiv">
            <img src={logoImg} alt="logo" />
            <h1>Hubly</h1>
          </div>
        </div>
        <div className="div">
          <div className="div-2">
            <div className="heading">
              <div className="text-wrapper">Product</div>
            </div>

            <div className="link">
              <div className="text-wrapper-2">Universal checkout</div>
            </div>

            <div className="div-wrapper">
              <div className="text-wrapper-3">Payment workflows</div>
            </div>

            <div className="link-2">
              <div className="text-wrapper-4">Observability</div>
            </div>

            <div className="link-3">
              <div className="text-wrapper-5">UpliftAI</div>
            </div>

            <div className="link-4">
              <div className="apps-integrations">Apps &amp; integrations</div>
            </div>
          </div>

          <div className="div-3">
            <div className="heading">
              <div className="text-wrapper-6">Why Primer</div>
            </div>

            <div className="link">
              <div className="text-wrapper-7">Expand to new markets</div>
            </div>

            <div className="div-wrapper">
              <div className="text-wrapper-8">Boost payment success</div>
            </div>

            <div className="link-2">
              <div className="text-wrapper-9">Improve conversion rates</div>
            </div>

            <div className="link-3">
              <div className="text-wrapper-10">Reduce payments fraud</div>
            </div>

            <div className="link-4">
              <div className="text-wrapper-11">Recover revenue</div>
            </div>
          </div>

          <div className="div-4">
            <div className="heading">
              <div className="text-wrapper-12">Developers</div>
            </div>

            <div className="link">
              <div className="text-wrapper-13">Primer Docs</div>
            </div>

            <div className="div-wrapper">
              <div className="text-wrapper-14">API Reference</div>
            </div>

            <div className="link-2">
              <div className="text-wrapper-15">Payment methods guide</div>
            </div>

            <div className="link-3">
              <div className="text-wrapper-16">Service status</div>
            </div>

            <div className="link-4">
              <div className="text-wrapper-17">Community</div>
            </div>
          </div>

          <div className="div-5">
            <div className="heading">
              <div className="text-wrapper-18">Resources</div>
            </div>

            <div className="link">
              <div className="text-wrapper-19">Blog</div>
            </div>

            <div className="div-wrapper">
              <div className="text-wrapper-20">Success stories</div>
            </div>

            <div className="link-2">
              <div className="text-wrapper-21">News room</div>
            </div>

            <div className="link-3">
              <div className="text-wrapper-22">Terms</div>
            </div>

            <div className="link-4">
              <div className="text-wrapper-23">Privacy</div>
            </div>
          </div>

          <div className="div-6">
            <div className="heading">
              <div className="text-wrapper-24">Company</div>
            </div>

            <div className="link">
              <div className="text-wrapper-25">Careers</div>
            </div>
          </div>

          <div className="div-flex-wrapper">
            <div className="div-7">
              <img className="link-SVG" alt="Link SVG" src={mssgIcon} />

              <img className="img" alt="Link SVG" src={linkedInIcon} />

              <img className="link-SVG-2" alt="Link SVG" src={twitterIcon} />

              <img className="link-SVG-3" alt="Link SVG" src={youtubeIcon} />

              <img className="link-SVG-4" alt="Link SVG" src={githubIcon} />

              <img className="link-SVG-5" alt="Link SVG" src={thirdIcon} />

              <img className="link-SVG-6" alt="Link SVG" src={instaIcon} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="chatBoxIcon"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          toggleChatBox();
        }}
      >
        <img src={mssgBoxIcon} alt="" />
      </div>
      <div id="chatBox" className="chat-box hidden chatContainer">
        <div className="header" style={{backgroundColor: chatConfig?.headerColor? chatConfig?.headerColor : "#33475B"}}>
          <img src={chatBoxIcon} alt="" />
          <p style={{color: chatConfig?.headerFontColor? chatConfig?.headerFontColor: "#FFFFFF"}}>Hubly</p>
        </div>
        <div className="mssgsContainer" style={{backgroundColor: chatConfig?.messageBackgroundColor ? chatConfig?.messageBackgroundColor: "#EEEEEE" }}>
          {mssgList.length === 0 && (
            <div className="startConv">
              <p style={{ color: "gray" }}>Start a Conversation</p>
              <hr
                style={{
                  backgroundColor: "gray",
                  height: "1px",
                  width: "100%",
                }}
              />
            </div>
          )}
          {showUserForm && (
            <div className="userIntro">
              <div className="infoContainer">
                <div className="heading">
                  <p>Introduction Yourself</p>
                </div>
                <div className="infos">
                  <p className="labelName">Your name</p>
                  <input
                    type="text"
                    className="labelVal"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className="labelName">Your Phone</p>
                  <input
                    type="text"
                    className="labelVal"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="labelName">Your Email</p>
                  <input
                    type="email"
                    className="labelVal"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="btnDiv" onClick={handleSubmitForm}>
                    <button>Thank You!</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {
            !showUserForm && mssgList.length > 0 && (
              <div className="mssgList">
                {mssgList.map((mssg, index) => (
                  <div
                    key={index}
                    className={`mssg ${mssg.sender === "visitor" ? "visitor" : "hubly"
                      }`}
                  >
                    <p style={{color: chatConfig?.messageFontColor ? chatConfig?.messageFontColor : "#000000"}}>{mssg.message}</p>
                  </div>
                ))}
              </div>
            )

          }
          {
            showIntroMssg && introMssgs.map((mssg, index) => (
              <div
                key={index}
                className={`mssg ${mssg.sender === "visitor" ? "visitor" : "hubly"
                  }`}
              >
                <p style={{color: chatConfig?.messageFontColor ? chatConfig?.messageFontColor : "#000000"}}>{mssg.message}</p>
              </div>
            ))
          }

          <div className="inpBox">
            <input
              type="text"
              name="mssg"
              id="mssg"
              placeholder="Write a message"
              value={mssg}
              onChange={(e) => setMssg(e.target.value)}
            />
            <img
              src={sendIcon}
              alt="send"
              className="sendIcon"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
