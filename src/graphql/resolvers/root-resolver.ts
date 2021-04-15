import bcrypt from "bcrypt";
import User from "../../models/user";
import RequestError from "../../utils/RequestError";

export default {
    registerUser: async ({ userInput }:any) => {
        const {
            name, email, password, phone,
        } = userInput;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new RequestError(422, "User exists already, please login instead.");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name, email, phone, password: hashedPassword,
        });
        await user.save();
        // console.log(user);
        return user;
    },
    // loginUser: async ({})
};
