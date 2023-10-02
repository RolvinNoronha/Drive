import { s3Client } from "../Utils/s3Config.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import User from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();


const uploadToS3 = async (file, uid) => {

    const command = new PutObjectCommand ({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uid}/${file.originalname}`,
        Body: file.buffer,
    });
    
    try {
        const result = await s3Client.send(command);
        return result;
    }
    catch(err) {
        console.log(err);
    }
};



export const uploadFile = async (req, res) => {
    try {
        const results = await uploadToS3(req.file, req.body.uid);
        
        await User.updateOne(
            { _id: req.body.uid }, { $push: 
                { videos: { 
                    videoName: req.file.originalname, 
                    caption: req.body.caption,
                }
            }},
        );

        return res.json(results);
    } catch (err) {
        console.log(err);
    }
}