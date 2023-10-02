import User from "../Models/userModel.js"

export const getData = async (req, res) => {
    const uid = req.query.uid;

    const user = await User.findOne({ _id: uid });

    res.send(user.videos);
}