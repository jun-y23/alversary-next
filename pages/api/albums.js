import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/database";

let day = new Date();

// 'yyyy-mm-dd'
let presentDate = [
    day.getFullYear(),
    ('0' + (day.getMonth() + 1)).slice(-2),
    ('0' + day.getDate()).slice(-2)
  ].join('-');

// '-mm-dd'
const queryDate = presentDate.slice(4);

export default async function (req, res) {
    try {
        const { db } = await connect();
        const albums = await db.collection("albums").find({ release_date: { $regex: '-08-23' }}).toArray();
        res.status(200);
        res.json({ albums });
    } catch (e) {
       res.status(500);
       res.json({ error: "Unable to fetch data" });
    }
}
