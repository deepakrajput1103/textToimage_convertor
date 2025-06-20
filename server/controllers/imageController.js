// import axios from "axios"
// import userModel from "../models/userModel.js"
// import FormData from "form-data"
// import { userCredits } from "./userController.js"

// export const generateImage = async (req,res)=>{
//     try{
//         const {userId, prompt} = req.body
//         const user = await userModel.findById(userId)

//         if(!user || !prompt){
//             return res.json({
//                 success: false,
//                 message:'Missing Details'
//             })
//         }

//         if(user.creditBalance == 0 || user.creditBalance<0){
//             return res.json({
//                  success:false,
//                  message:'No Credit Balance',
//                  creditBalance: user.creditBalance
//             })
//         }

//         const formData = new FormData()
//         formData.append('prompt',prompt)
//       const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
//             headers:{
//                 'x-api-key':process.env.CLIPDROP_API,
//             },
//             responseType:'arraybuffer'
//         })

//         const base64Image = Buffer.from(data, 'binary').toString('base64')
//         const resultImage = `data:image/png;base64,${base64Image}`

//         await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

//         res.json({
//             success:true,
//             message:"Image Generated",
//             creditBalance: user.creditBalance-1,
//             resultImage
//         })

//     } catch (error){

//     }
// }





import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        // 1. Get prompt from body and userId from middleware
        const { prompt } = req.body;
        const userId = req.user.id; // From userAuth middleware

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }

        // 2. Find user and check credits
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.creditBalance <= 0) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient credits',
                creditBalance: user.creditBalance
            });
        }

        // 3. Call Clipdrop API
        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(), // Required for FormData
                    'x-api-key': process.env.CLIPDROP_API,
                },
                responseType: 'arraybuffer'
            }
        );

        // 4. Process image
        const base64Image = Buffer.from(data).toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // 5. Update credits (atomic operation)
        await userModel.findByIdAndUpdate(
            userId,
            { $inc: { creditBalance: -1 } }
        );

        res.json({
            success: true,
            message: "Image generated successfully",
            creditBalance: user.creditBalance - 1,
            resultImage: resultImage
        });

    } catch (error) {
        console.error('Image generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Image generation failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};