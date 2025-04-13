import User from "./Models/user.model.js";

const updateUser = async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        if(!updatedUser){
            return res.status(404).json({
                message: "user not found",
            });
        }
        res.status(200).json({
            message: "user updated successfully",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "user update failed!",
            data: error,
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "user has been deleted!",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "user delete failed!",
        })
    }
}

export default {
    updateUser,
    deleteUser,
}