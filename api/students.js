// Backend độc lập trên Vercel
let students = []; // Dữ liệu sẽ lưu tạm ở đây

export default function handler(req, res) {
    // Cấu hình Header để không bị trình duyệt chặn
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET') {
        return res.status(200).json(students);
    }

    if (req.method === 'POST') {
        const { name, mssv, class_name } = req.body;
        const newStudent = { id: Date.now(), name, mssv, class_name };
        students.push(newStudent);
        return res.status(200).json({ status: 'success' });
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;
        students = students.filter(s => s.id != id);
        return res.status(200).json({ status: 'success' });
    }
}