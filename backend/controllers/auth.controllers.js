import bcryptjs from "bcryptjs"
import User from "../models/user.models.js"
import generateTokenSetCookie from "../utils/generateToken.js";

const signup = async(req, res) => {
    try {
        const { fullName, username, password, confirmpassword, gender } = req.body;

        if(password != confirmpassword){
            return res.status(400).json({
                error : "Password don't match"
            })
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({
                error: "Username already exist"
            })
        }

        //HASh pass
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await new User({
            fullName, 
            username,
            password: hashPassword,
            gender, 
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        })

        if(!newUser){
            res.status(400).json({
                error: "Invalid user Data"
            })
        }

        //JWT here
        generateTokenSetCookie(newUser._id, res);

        await newUser.save();
        console.log("user has signed up")

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
         
    } catch (error) {
        console.log("Error in signup controller ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

const login = async(req, res) => {
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenSetCookie(user._id, res);

		return res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});

	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

const logout = async(req, res) => {
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export { login, signup, logout }