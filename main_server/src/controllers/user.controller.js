import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import sendemail from "../middlewares/sendotp.middleware.js";
import { generateReferenceCode } from "../utils/referenceCodeGenFun.js";
import OTP from "../models/otp.model.js";
const sendOtp= asyncHandler(async(res,req)=>{
    const {email}=req.body;
    if(!email){
        throw new ApiError(400,"Email is required.")
    }
    const isFristUser= await User.findOne({email}).lean();
    if(isFristUser){
        return res.status(200).json(new ApiResponse(200,null,"You already have an account."))
    }
    const otp = Math.floor((Math.random() * 1000000) + 1);
    const referenceCode = generateReferenceCode();
    await sendemail(email , otp);
    const newOtp= new OTP({
        OTPNO:otp,
        referenceCode
    });
    await newOtp.save()
    return res.status(200).json(new ApiResponse(200,{referenceCode},"The mail is alrady is send to your mail box."))
});

const verifyOtp= asyncHandler(async(req,res)=>{
    const {referenceCode,otp}=req.body;
    const findTheOtp= (
        await OTP.findOne(
            { referenceCode },
            { OTPNO: 1, _id: 0 }
        ).lean()
    )?.OTPNO;
    if(!findTheOtp){
        throw new ApiError(400, "Invalid OTP")
    }
    if(findTheOtp==otp){
        return res.status(200).json(new ApiResponse(200,null,"OTP Matched"))
    }
    throw new ApiError(400, 'Inavlid otp')


})

export {sendOtp,verifyOtp}