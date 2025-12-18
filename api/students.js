import { MongoClient, ObjectId } from 'mongodb';

// Lấy URI từ biến môi trường Vercel đã cài
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await client.connect();
        const database = client.db('student_management');
        const collection = database.collection('students');

        if (req.method === 'GET') {
            const students = await collection.find({}).toArray();
            // Map lại _id của Mongo thành id để giao diện không bị lỗi
            const formatted = students.map(s => ({ ...s, id: s._id }));
            return res.status(200).json(formatted);
        }

        if (req.method === 'POST') {
            const { name, mssv, class_name } = req.body;
            await collection.insertOne({ name, mssv, class_name });
            return res.status(200).json({ status: 'success' });
        }

        if (req.method === 'PUT') {
            const { id, name, mssv, class_name } = req.body;
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { name, mssv, class_name } }
            );
            return res.status(200).json({ status: 'success' });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await collection.deleteOne({ _id: new ObjectId(id) });
            return res.status(200).json({ status: 'success' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}