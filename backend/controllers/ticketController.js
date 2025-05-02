import asyncHandler from "express-async-handler";
import Ticket from "../models/Ticket.js";
import Visitor from "../models/Visitor.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

export const createTicket = asyncHandler(async (req, res) => {
  const { visitorId, initialMessage } = req.body;
  console.log("req body is : ", req.body);
  if (!visitorId || !initialMessage) {
    res.status(400);
    throw new Error("Visitor ID and initial message are required");
  }
  const visitor = await Visitor.findById(visitorId);
  if (!visitor) {
    res.status(404);
    throw new Error("Visitor not found");
  }

  let adminUser = await User.findOne({ role: 'admin' }).sort({ _id: 1 });
  console.log("adminUser", adminUser);
  if (!adminUser) {
    res.status(404);
    throw new Error("Assigned user not found");
  }

  const ticket = await Ticket.create({
    visitor: visitor._id,
    assignedTo: adminUser ? adminUser._id : null,
  });
  
  await Chat.create({
    ticket: ticket._id,
    sender: "visitor",
    message: initialMessage,
  });
  res.status(201).json(ticket);
});

export const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find()
    .populate("visitor", "name email phone")
    .populate("assignedTo", "name email");

  const colorOptions = [
    "yellow",
    "orange",
    "blue",
    "green",
    "red",
    "purple",
    "teal",
  ];

  const formattedTickets = await Promise.all(
    tickets.map(async (ticket) => {
      const createdDate = new Date(ticket.createdAt);
      const replyDate = ticket.firstReplyAt
        ? new Date(ticket.firstReplyAt)
        : null;

      const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      const ticketId = `${createdDate.getFullYear()}-${String(
        createdDate.getMonth() + 1
      ).padStart(2, "0")}${String(createdDate.getDate()).padStart(2, "0")}`;

      const lastChat = await Chat.findOne({ ticket: ticket._id })
        .sort({ createdAt: -1 })
        .select("message")
        .lean();

      const responseTime = replyDate
        ? `${Math.floor((replyDate - createdDate) / (1000 * 60))}`
        : null;

      const circleColor =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];

      return {
        ticketId: `Ticket# ${ticketId}`,
        msg: lastChat ? lastChat.message : "",
        userName: ticket.visitor.name,
        mobileNo: ticket.visitor.phone,
        email: ticket.visitor.email,
        postedAt: formatTime(createdDate),
        responseTime: responseTime,
        circleColor: circleColor,
      };
    })
  );

  res.json(formattedTickets);
});

export const getcontactsCenter = asyncHandler(async (req, res) => {
  console.log("called getTicketsAll");

  // 1. Get all team members (users)
  const teamMembers = await User.find().select("firstName lastName _id");

  // 2. Get all tickets, along with their visitors and assigned users
  const tickets = await Ticket.find()
    .populate("visitor", "name email phone")
    .populate("assignedTo", "firstName lastName email");

  // 3. Process each ticket
  const formattedTickets = await Promise.all(
    tickets.map(async (ticket) => {
      const createdDate = new Date(ticket.createdAt);
      const currentTime = new Date();
      const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const replyDate = ticket.firstReplyAt
        ? new Date(ticket.firstReplyAt)
        : null;
        const referenceTime = replyDate || currentTime;
        const diffMinutes = Math.floor((referenceTime - createdDate) / (1000 * 60));
        const isMissed = !replyDate && diffMinutes > 60;
      const responseTime = replyDate
        ? `${diffMinutes}`
        : null;

      const ticketId = `${createdDate.getFullYear()}-${String(
        createdDate.getMonth() + 1
      ).padStart(2, "0")}${String(createdDate.getDate()).padStart(2, "0")}`;

      // Get last message for the ticket
      const lastChat = await Chat.findOne({ ticket: ticket._id })
        .sort({ createdAt: -1 })
        .select("message")
        .lean();
      const wholeChat = await Chat.find({ ticket: ticket._id });

      return {
        id: ticket._id,
        ticketId: `Ticket# ${ticketId}`,
        msg: lastChat ? lastChat.message : "",
        visitor: {
          name: ticket.visitor.name,
          email: ticket.visitor.email,
          phone: ticket.visitor.phone,
        },
        postedAt: formatTime(createdDate),
        responseTime: responseTime,
        isMissed,
        status: ticket.status,
        assignedTo: ticket.assignedTo
          ? {
              name: ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName,
              email: ticket.assignedTo.email,
            }
          : null,
        wholeChat: wholeChat,
      };
    })
  );

  // 4. Final response
  res.json({
    teamMembers,
    tickets: formattedTickets,
  });
});

export const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate("visitor", "name email phone")
    .populate("assignedTo", "name email");
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  res.json(ticket);
});

// @desc    Update ticket (e.g. assign admin, mark resolved)
// @route   PUT /api/tickets/:id
// @access  Protected
export const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  // Update fields if provided
  if (req.body.assignedTo) {
    const user = await User.findById(req.body.assignedTo);
    if (!user) {
      res.status(404);
      throw new Error("Assigned user not found");
    }
    ticket.assignedTo = user._id;
  }
  if (req.body.status) {
    ticket.status = req.body.status;
  }
  // If resolved now, leave firstReplyAt as is
  const updatedTicket = await ticket.save();
  res.json(updatedTicket);
});

export const getResolvedTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ status: "Resolved" })
    .populate("visitor", "name email phone")
    .populate("assignedTo", "name email");
  // Format the tickets as needed
  const colorOptions = [
    "yellow",
    "orange",
    "blue",
    "green",
    "red",
    "purple",
    "teal",
  ];

  const formattedTickets = await Promise.all(
    tickets.map(async (ticket) => {
      const createdDate = new Date(ticket.createdAt);
      const replyDate = ticket.firstReplyAt
        ? new Date(ticket.firstReplyAt)
        : null;

      const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      const ticketId = `${createdDate.getFullYear()}-${String(
        createdDate.getMonth() + 1
      ).padStart(2, "0")}${String(createdDate.getDate()).padStart(2, "0")}`;

      const lastChat = await Chat.findOne({ ticket: ticket._id })
        .sort({ createdAt: -1 })
        .select("message")
        .lean();

      const responseTime = replyDate
        ? `${Math.floor((replyDate - createdDate) / (1000 * 60))} minute(s)`
        : null;

      const circleColor =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];

      return {
        ticketId: `Ticket# ${ticketId}`,
        msg: lastChat ? lastChat.message : "",
        userName: ticket.visitor.name,
        mobileNo: ticket.visitor.phone,
        email: ticket.visitor.email,
        postedAt: formatTime(createdDate),
        responseTime: responseTime,
        circleColor: circleColor,
      };
    })
  );

  res.json(formattedTickets);
});

export const getUnresolvedTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ status: "UnResolved" })
    .populate("visitor", "name email phone")
    .populate("assignedTo", "name email");

  const colorOptions = [
    "yellow",
    "orange",
    "blue",
    "green",
    "red",
    "purple",
    "teal",
  ];

  const formattedTickets = await Promise.all(
    tickets.map(async (ticket) => {
      const createdDate = new Date(ticket.createdAt);
      const replyDate = ticket.firstReplyAt
        ? new Date(ticket.firstReplyAt)
        : null;

      const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      const ticketId = `${createdDate.getFullYear()}-${String(
        createdDate.getMonth() + 1
      ).padStart(2, "0")}${String(createdDate.getDate()).padStart(2, "0")}`;

      const lastChat = await Chat.findOne({ ticket: ticket._id })
        .sort({ createdAt: -1 })
        .select("message")
        .lean();

      const responseTime = replyDate
        ? `${Math.floor((replyDate - createdDate) / (1000 * 60))} minute(s)`
        : null;

      const circleColor =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];

      return {
        ticketId: `Ticket# ${ticketId}`,
        msg: lastChat ? lastChat.message : "",
        userName: ticket.visitor.name,
        mobileNo: ticket.visitor.phone,
        email: ticket.visitor.email,
        postedAt: formatTime(createdDate),
        responseTime: responseTime,
        circleColor: circleColor,
      };
    })
  );

  res.json(formattedTickets);
});
