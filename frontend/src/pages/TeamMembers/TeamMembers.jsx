import React, { useState, useEffect } from "react";
import "./TeamMembers.css";
import editIcon from "./../../assets/editIcon.png";
import deleteIcon from "./../../assets/deleteIcon.png";
import addIcon from "./../../assets/addIcon.png";
import axios from "axios";

const TeamMembers = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    designation: "member",
  });
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [editFormData, setEditFormData] = useState({
    userName: "",
    email: "",
    designation: "member",
    id: "",
  });

  const [deleteFormData, setDeleteFormData] = useState({
    userName: "",
    email: "",
    designation: "member",
    id: "",
  });

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    console.log("Delete form submitted:", deleteFormData);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/team/${deleteFormData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Team member deleted:", response.data);
      alert("Team member deleted successfully");
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
    setShowDeletePopUp(false);
  };
  const handleDeleteClick = (member) => {
    console.log("Deleting member:", member);
    setDeleteFormData({
      userName: member.firstName + " " + member.lastName,
      email: member.email,
      designation: member.designation,
      id: member._id,
    });
    setShowDeletePopUp(true);
  };
  const handleDeleteCancel = () => { 
    console.log("Delete cancelled");
    setShowDeletePopUp(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Delete confirmed");
    deleteMember(deleteFormData.id);
    setShowDeletePopUp(false);
  };

  const deleteMember = async (memberId) => {
    console.log("Deleting member with ID:", memberId);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/team/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Team member deleted:", response.data);
      alert("Team member deleted successfully");
    } catch (error) {
      console.error("Error deleting team member:", error);
    } 
  };

  const editMember = (member) => {
    console.log("Editing member:", member);
    setEditFormData({
      userName: member.firstName + " " + member.lastName,
      email: member.email,
      designation: member.designation,
      id: member._id,
    });
    setShowEditPopUp(true);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Edit form submitted:", editFormData);

    const { userName, email, designation } = editFormData;
    const firstName = userName?.split(" ")[0];
    const lastName = userName?.split(" ")[1] || "";
    if (
      firstName === "" ||
      lastName === "" ||
      email == "" ||
      designation == ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/team/${editFormData.id}`,
        { firstName, lastName, email, designation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Team member updated:", response.data);
      alert("Team member updated successfully");
    } catch (error) {
      console.error("Error updating team member:", error);
    }
    setShowEditPopUp(false);
  };

  const [teamMembersList, setTeamMembersList] = useState([]);
  useEffect(() => {
    const fetchTeamMembers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/team",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeamMembersList(response.data.members);
        console.log("Fetched team members:", response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTeamMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const { userName, email, designation } = formData;
    const firstName = userName?.split(" ")[0];
    const lastName = userName?.split(" ")[1] || "";
    if (
      firstName === "" ||
      lastName === "" ||
      email == "" ||
      designation == ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/team",
        { firstName, lastName, email, designation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Team member added:", response.data);
      alert("Team member added successfully");
    } catch (error) {
      console.error("Error adding team member:", error);
    }
    setShowPopup(false);
  };

  return (
    <div className="teamMembersContainer">
      <div className="header">
        <p>Team</p>
      </div>
      <div className="teamMembersBox">
        <table className="teamTable">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembersList.map((member) => (
              <tr key={member._id}>
                <td>
                  {member.firstName} {member.lastName}
                </td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td className="actionButtons">
                  <button
                    className="editBtn"
                    onClick={() => {
                      editMember(member);
                    }}
                  >
                    <img src={editIcon} alt="Edit" />
                  </button>
                  <button className="deleteBtn" onClick={() => handleDeleteClick(member)}>
                    <img src={deleteIcon} alt="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="addMemberBtn">
          <button onClick={() => setShowPopup(true)}>
            <img src={addIcon} alt="Add" className="addIcon" />
            <p>Add Team members</p>
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupBox">
            <h2>Add Team Members</h2>
            <p>
              Talk with colleagues in a group chat. Messages in this group are
              only visible to it's participants. New teammates may only be
              invited by the administrators.
            </p>
            <form onSubmit={handleSubmit}>
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="User name"
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email ID"
                required
              />

              <label>Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>

              <div className="popupActions">
                <button type="button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditPopUp && (
        <div className="popupOverlay">
          <div className="popupBox">
            <h2>Edit Team Members</h2>
            <p>
              Talk with colleagues in a group chat. Messages in this group are
              only visible to it's participants. New teammates may only be
              invited by the administrators.
            </p>
            <form onSubmit={handleEditSubmit}>
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                value={editFormData.userName}
                onChange={handleEditInputChange}
                placeholder="User name"
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                placeholder="Email ID"
                required
              />

              <label>Designation</label>
              <select
                name="designation"
                value={editFormData.designation}
                onChange={handleEditInputChange}
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>

              <div className="popupActions">
                <button type="button" onClick={() => setShowEditPopUp(false)}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {
        showDeletePopUp && (
          <div className="popupOverlay">
            <div className="popupBox">
              <h2>Delete Team Member</h2>
              <p>Are you sure you want to delete this team member?</p>
              <form onSubmit={handleDeleteSubmit}>
                <label>User Name</label>
                <input
                  type="text"
                  name="userName"
                  value={deleteFormData.userName}
                  placeholder="User name"
                  disabled
                />

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={deleteFormData.email}
                  placeholder="Email ID"
                  disabled
                />

                <label>Designation</label>
                <select
                  name="designation"
                  value={deleteFormData.designation}
                  disabled
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>

                <div className="popupActions">
                  <button type="button" onClick={handleDeleteCancel}>
                    Cancel
                  </button>
                  <button type="submit">Delete</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default TeamMembers;
