import UserModel from "../models/userModels.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    return res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
