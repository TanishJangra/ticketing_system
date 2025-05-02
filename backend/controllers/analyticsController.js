import asyncHandler from "express-async-handler";
import Ticket from "../models/Ticket.js";

export const getTotalChats = asyncHandler(async (req, res) => {
  const total = await Ticket.countDocuments();
  res.json({ totalTickets: total });
});

export const getResolvedChats = asyncHandler(async (req, res) => {
  const count = await Ticket.countDocuments({ status: "Resolved" });
  res.json({ resolvedTickets: count });
});

export const getMissedChats = asyncHandler(async (req, res) => {
  const count = await Ticket.countDocuments({ missedChat: true });
  res.json({ missedChats: count });
});

export const getMissedChatsPerWeek = asyncHandler(async (req, res) => {
  const data = await Ticket.aggregate([
    { $match: { missedChat: true } },
    {
      $project: {
        year: { $year: "$createdAt" },
        week: { $week: "$createdAt" },
      },
    },
    {
      $group: {
        _id: { year: "$year", week: "$week" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.week": 1 } },
  ]);

  const result = data.map((item, id) => ({
    week: id + 1,
    count: item.count,
  }));
  res.json(result);
});

export const averageReplyTime = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();
  console.log(tickets);
  if (tickets.length === 0) {
    return res.json({ averageReplyTime: 0 });
  }

  const totalReplyTime = tickets.reduce((acc, ticket) => {
    return acc + (ticket.firstReplyAt - ticket.createdAt);
  }, 0);

  const average = (totalReplyTime / tickets.length);
  const avgInSeconds = Math.floor(average / 1000);
  return res.json({ averageReplyTime: avgInSeconds });
});
