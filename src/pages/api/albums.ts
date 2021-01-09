import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/database";

let day = new Date();

// presentDate = 'yyyy-mm-dd'
const presentDate: string = [
    day.getFullYear(),
    ('0' + (day.getMonth() + 1)).slice(-2),
    ('0' + day.getDate()).slice(-2)
  ].join('-');

// queryDate = '-mm-dd'
const queryDate: string = presentDate.slice(4);

export default async function (req: NextApiRequest, res:NextApiResponse) {
    try {
        const { db } = await connect();
        const albums = await db.collection("albums").find({ release_date: { $regex: queryDate }}).toArray();
        res.status(200);
        res.json({ albums });
    } catch (e) {
       res.status(500);
       res.json({ error: "Unable to fetch data" });
    }
}
