import Conversation from "../models/conversation.models.js"
import Message from "../models/message.models.js"


const sendMessage = async(req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save();
        // await newMessage.save();

        // SOCKET IO 

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({ 
            error: "Internal Server Error"
        })
    }
}

const getMessage = async(req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		return res.status(200).json(messages); 
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ 
            error: "Internal Server Error"
        })
    }
}
export { sendMessage, getMessage }