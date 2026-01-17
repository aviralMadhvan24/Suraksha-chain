import { Request , Response } from "express";

import { calculateRisk } from "../services/RiskEngine";
 
export function checkUpi(req : Request , res : Response) {
    const {upiId , amount} = req.body ; 
    const result = calculateRisk({
        upiId,
        amount,
        isNewPayee:true , 
        recentScamCall : true 
    }); 

    res.json(result) ; 
}