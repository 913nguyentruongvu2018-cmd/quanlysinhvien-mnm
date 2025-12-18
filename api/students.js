import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
// Không tạo biến database ở ngoài, để trong handler cho chắc

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await client.connect();
        const db = client.db('student_management');
        const col = db.collection('students');

        if (req.method === 'GET') {
            const data = await col.find({}).toArray();
            return res.status(200).json(data.map(s => ({ ...s, id: s._id })));
        }

        if (req.method === 'POST') {
            const { name, mssv, class_name } = req.body;
            await col.insertOne({ name, mssv, class_name });
            return res.status(200).json({ status: 'success' });
        }

        if (req.method === 'DELETE') {
            await col.deleteOne({ _id: new ObjectId(req.query.id) });
            return res.status(200).json({ status: 'success' });
        }
    } catch (err) {
        // Trả về lỗi chi tiết để mình nhìn thấy trong tab Network
        return res.status(500).send(err.message);
    }
    // TUYỆT ĐỐI KHÔNG DÙNG client.close() ở đây
}