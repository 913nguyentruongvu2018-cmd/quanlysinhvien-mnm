import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    // Cấp quyền CORS để không bị trình duyệt chặn
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await client.connect();
        const database = client.db('student_management');
        const collection = database.collection('students');

        // Lấy danh sách sinh viên từ MongoDB
        if (req.method === 'GET') {
            const students = await collection.find({}).toArray();
            const formatted = students.map(s => ({ ...s, id: s._id }));
            return res.status(200).json(formatted);
        }

        // Thêm sinh viên mới
        if (req.method === 'POST') {
            const { name, mssv, class_name } = req.body;
            if (!name || !mssv) return res.status(400).json({ error: "Thiếu dữ liệu" });
            await collection.insertOne({ name, mssv, class_name });
            return res.status(200).json({ status: 'success' });
        }

        // Cập nhật thông tin sinh viên
        if (req.method === 'PUT') {
            const { id, name, mssv, class_name } = req.body;
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { name, mssv, class_name } }
            );
            return res.status(200).json({ status: 'success' });
        }

        // Xóa sinh viên
        if (req.method === 'DELETE') {
            const { id } = req.query;
            await collection.deleteOne({ _id: new ObjectId(id) });
            return res.status(200).json({ status: 'success' });
        }
    } catch (error) {
        // Trả về lỗi chi tiết để soi trong tab Network
        return res.status(500).json({ error: error.message });
    }
}