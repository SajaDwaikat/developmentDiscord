const Message = require("../models/Message");

const getMessages = async (
  req,
  res
) => {
  try {
    const { channel } = req.params;

    const messages =
      await Message.find({
        channel,
      }).sort({
        createdAt: 1,
      });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createMessage = async (
  req,
  res
) => {
  try {
    const message =
      await Message.create(
        req.body
      );

    res.status(201).json(
      message
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMessages,
  createMessage,
};