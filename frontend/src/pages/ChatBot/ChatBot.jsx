import React, {useState} from "react";
import "./ChatBot.css";
import chatBoxIcon from "../../assets/chatBoxIcon.png";
import innerChatIcon from "../../assets/innerChatIcon.png";
import sendIcon from "../../assets/sendIcon.png";
import editIcon from "../../assets/editIcon.png";
import axios from "axios";

const ChatBot = ({chatConfig}) => {
  console.log('config chat in chatbot jsx is : ', chatConfig);
  const [headerColor, setHeaderColor] = useState(chatConfig?.headerColor || "#33475B");
  const [messageBackgroundColor, setMessageBackgroundColor] = useState(chatConfig?.messageBackgroundColor || "#d5d6da");
  const [messageFontColor, setMessageFontColor] = useState(chatConfig?.messageFontColor || "#000000");
  const [introMsg1, setIntroMsg1] = useState(chatConfig?.customizedMessages[0] || "How can I help you?");
  const [introMsg2, setIntroMsg2] = useState(chatConfig?.customizedMessages[1] || "Ask me anything!");
  const [welcomeMessage, setWelcomeMessage] = useState(chatConfig?.welcomeMessage || "👋 Want to chat about Hubly? I'm a chatbot here to help you find your way.");

  const handleSave = async () => {
    const payload = {
      headerColor,
      messageBackgroundColor,
      customizedMessages: [introMsg1, introMsg2],
      welcomeMessage
    };

    try {
      const token = localStorage.getItem("token");
      console.log("token is : ", token);
      await axios.put(
        "http://localhost:5000/api/chatCustomization",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      alert("Customization saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save customization.");
    }
  };
  return (
    <div className="chatBoxContainer">
      <div className="left">
        <p>Chat Bot</p>
      </div>
      <div className="middleContainer">
        <div className="chatContainer">
          <div className="header" style={{backgroundColor: headerColor}}>
            <img src={chatBoxIcon} alt="" />
            <p style={{color: chatConfig?.headerFontColor? chatConfig?.headerFontColor: "#FFFFFF"}}>Hubly</p>
          </div>
          <div className="mssgsContainer" style={{backgroundColor: messageBackgroundColor}}>
            <div className="introQues" style={{backgroundColor: messageBackgroundColor}} >
              <img src={innerChatIcon} alt="" />
              <div className="ques">
                <p style={{color: messageFontColor}}>How can i help you?</p>
                <p style={{color: messageFontColor}}>Ask me anything!</p>
              </div>
            </div>
            <div className="userIntro" style={{backgroundColor: messageBackgroundColor}}>
              <div className="infoContainer">
                <div className="heading">
                  <p>Introduction Yourself</p>
                </div>
                <div className="infos">
                  <p className="labelName">Your name</p>
                  <p className="labelVal">Your name</p>
                  <p className="labelName">Your Phone</p>
                  <p className="labelVal">+1(000)000-0000</p>
                  <p className="labelName">Your Email</p>
                  <p className="labelVal">example@gmail.com</p>
                  <div className="btnDiv">
                    <button>Thank You!</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="inpBox">
              <input
                type="text"
                name="mssg"
                id="mssg"
                placeholder="Write a message"
              />
              <img src={sendIcon} alt="send" className="sendIcon" />
            </div>
          </div>
        </div>
        <div className="downContainer">
          <img src={innerChatIcon} alt="icon" />
          <div className="content">
            <p className="crossIcon">X</p>
            <p className="help">
              👋Want to chat about Hubly? I'm an chatbot here to help you find
              your way.
            </p>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <div className="headerContainer">
          <p>Header Color</p>
          <div className="colors">
          {["white", "black", "#33475B"].map((color) => (
            <div
              key={color}
              className="circle"
              style={{ backgroundColor: color, border: headerColor === color ? "2px solid #000" : "none" }}
              onClick={() => setHeaderColor(color)}
            ></div>
          ))}
          </div>
          <div className="selectedClrContainer">
          <div className="square" style={{ backgroundColor: headerColor }}></div>
          <div className="colorId">{headerColor}</div>
          </div>
        </div>
        <div className="customContainer">
          <p>Custom Background Color</p>
          <div className="colors">
          {["white", "black", "#d5d6da"].map((color) => (
            <div
              key={color}
              className="circle"
              style={{ backgroundColor: color, border: messageBackgroundColor === color ? "2px solid #000" : "none" }}
              onClick={() => setMessageBackgroundColor(color)}
            ></div>
          ))}
          </div>
          <div className="selectedClrContainer">
          <div className="square" style={{ backgroundColor: messageBackgroundColor }}></div>
          <div className="colorId">{messageBackgroundColor}</div>
          </div>
        </div>
        <div className="customMssgContainer">
          <p>Customize Message</p>
          <div className="mssgs">
            <div className="mssg">
            <input
            type="text"
            value={introMsg1}
            onChange={(e) => setIntroMsg1(e.target.value)}
            style={{border: "none"}}
          />
              <img src={editIcon} alt="" />
            </div>
            <div className="mssg">
            <input
                type="text"
                value={introMsg2}
                onChange={(e) => setIntroMsg2(e.target.value)}
                style={{border: "none"}}
              />
            <img src={editIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="userIntro">
          <div className="infoContainer">
            <div className="heading">
              <p>Introduction Yourself</p>
            </div>
            <div className="infos">
              <p className="labelName">Your name</p>
              <p className="labelVal">Your name</p>
              <p className="labelName">Your Phone</p>
              <p className="labelVal">+1(000)000-0000</p>
              <p className="labelName">Your Email</p>
              <p className="labelVal">example@gmail.com</p>
              <div className="btnDiv">
                <button>Thank You!</button>
              </div>
            </div>
          </div>
        </div>
        <div className="welcomeContainer">
          <p>Welcome Message</p>
          <div className="mssg">
          <textarea
          rows={3}
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          style={{width:"90%", border: "1px solid gray", borderRadius: "4px"}}
        />
            <img src={editIcon} alt="" />
          </div>
        </div>
        <div className="saveChanges">
          <button onClick={handleSave}>Save</button>
          
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
