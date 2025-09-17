import userCreateService from "../../services/user/user.create.service.js";
import { userDetailsService } from "../../services/user/user.details.service.js";
import userLoginService from "../../services/user/user.login.service.js";
import userResetService from "../../services/user/user.reset.service.js";
import userUpdateService from "../../services/user/user.update.service.js";
import userVerifyEmailService from "../../services/user/user.verifyemail.service.js";
import userVerifyOtpService from "../../services/user/user.verifyotp.service.js";

import UserModel from "../../models/Users/user.model.js";
import OTPModel from "../../models/Users/otp.model.js";

export const UserController = {
    create: async (req, res) => {
        try {
            const result = await userCreateService(req, UserModel);
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Server error" });
        }
    },

    details: async (req, res) => {
        try {
            const result = await userDetailsService(req, UserModel);
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Server error" });
        }
    },

    login: async (req, res) => {
        try {
            const result = await userLoginService(req, UserModel);
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Server error" });
        }
    },

    reset: async (req, res) => {
        try {
            const result = await userResetService(req, UserModel);
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Server error" });
        }
    },

    update: async (req, res) => {
        try {
            const result = await userUpdateService(req, UserModel);
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Server error" });
        }
    },

    verifyEmail: async (req, res) => {
        try {
            const result = await userVerifyEmailService(req, UserModel);
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Server error" });
        }
    },

    verifyOtp: async (req, res) => {
        try {
            const result = await userVerifyOtpService(req, OTPModel);
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Server error" });
        }
    }
};
