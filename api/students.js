let students = []; // Lưu trữ trên RAM của Vercel

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET') return res.status(200).json(students);

    if (req.method === 'POST') {
        const newStudent = { id: Date.now(), ...req.body };
        students.push(newStudent);
        return res.status(200).json({ status: 'success' });
    }

    if (req.method === 'PUT') {
        const { id, name, mssv, class_name } = req.body;
        const idx = students.findIndex(s => s.id == id);
        if (idx !== -1) students[idx] = { id, name, mssv, class_name };
        return res.status(200).json({ status: 'success' });
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;
        students = students.filter(s => s.id != id);
        return res.status(200).json({ status: 'success' });
    }
}