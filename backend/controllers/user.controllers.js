import User from "../models/user.models.js"

const getUsersForSideBar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({
            _id: { $ne : loggedInUserId }
        }).select("-password")

        if(!filteredUsers){
            return res.status(401).json({
                error: "Users not found"
            })
        }

        return res.status(200).json(filteredUsers);
         
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export { getUsersForSideBar }