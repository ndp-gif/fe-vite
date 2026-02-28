import React, { useState } from "react";

// --- INTERFACES ---
interface WorkshopHeaderProps {
    title?: string;
    host?: string;
}

interface IWorkshop {
    id: number;
    topic: string;
    category: string;
    isOnline: boolean;
}

// 
const styles = {
    container: { maxWidth: '1000px', margin: '40px auto', padding: '20px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
    header: { border: '1px solid black', color: 'black', padding: '30px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center' as const },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
    card: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eee' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
    buttonPrimary: { width: '100%', padding: '12px', backgroundColor: '#4e73df', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const, transition: '0.3s' },
    buttonAdmin: { width: '100%', padding: '12px', backgroundColor: '#e74a3b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const },
    badge: (isOnline: boolean) => ({
        padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' as const,
        backgroundColor: isOnline ? '#e3f2fd' : '#fff3e0', color: isOnline ? '#1976d2' : '#f57c00'
    }),
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '10px', borderLeft: '5px solid #4e73df', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }
};

const WorkshopManager = (props: WorkshopHeaderProps) => {
    const { title = "Tech Workshop 2026", host = "Gemini Mentor" } = props;
    const [categories] = useState<string[]>(["Frontend", "Backend", "AI"]);
    const [list, setList] = useState<IWorkshop[]>([]);
    const [data, setData] = useState({ topic: "", category: "Frontend", isOnline: false });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = event.target;
        const val = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
        setData(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!data.topic) return alert("Vui lòng nhập chủ đề!");
        const newW: IWorkshop = { ...data, id: Date.now() };
        setList(prev => [newW, ...prev]);
        setData({ topic: "", category: "Frontend", isOnline: false });
    };

    const handleAdmin = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & { adminCode: { value: string } };
        alert("🚀 Hệ thống xác thực mã: " + target.adminCode.value);
    };

    return (
        <div style={styles.container}>
            {/* 1. Header */}
            <header style={styles.header}>
                <h2 style={{ margin: 0, fontSize: '28px' }}>{title}</h2>
                <p style={{ opacity: 0.8, marginTop: '10px' }}>Chủ trì bởi: <strong>{host}</strong></p>
            </header>

            <div style={styles.grid}>
                {/* 2. Form Đăng ký */}
                <section style={styles.card}>
                    <h3 style={{ marginTop: 0, color: '#333' }}>✨ Đăng ký Workshop</h3>
                    <form onSubmit={handleSubmit}>
                        <input name="topic" type="text" placeholder="Chủ đề workshop..." style={styles.input} onChange={handleInputChange} value={data.topic} />

                        <select name="category" value={data.category} style={styles.input} onChange={handleInputChange}>
                            {categories.map((value, index) => (
                                <option value={value} key={index}>{value}</option>
                            ))}
                        </select>

                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input name="isOnline" type="checkbox" id="online" checked={data.isOnline} onChange={handleInputChange} />
                            <label htmlFor="online" style={{ fontSize: '14px', cursor: 'pointer' }}>Hình thức học Online</label>
                        </div>

                        <button type="submit" style={styles.buttonPrimary}>Thêm Workshop</button>
                    </form>
                </section>

                {/* 3. Form Admin */}
                <section style={styles.card}>
                    <h3 style={{ marginTop: 0, color: '#333' }}>🔑 Admin Verify</h3>
                    <form onSubmit={handleAdmin}>
                        <input name="adminCode" type="password" placeholder="Nhập mã bảo mật..." style={styles.input} />
                        <button type="submit" style={styles.buttonAdmin}>Xác nhận quyền</button>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>* Chỉ dành cho ban tổ chức</p>
                    </form>
                </section>
            </div>

            <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />

            {/* 4. Danh sách hiển thị */}
            <section>
                <h3 style={{ color: '#333', marginBottom: '20px' }}>📅 Danh sách sự kiện ({list.length})</h3>
                <div style={{ padding: '0 10px' }}>
                    {list.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#999' }}>Chưa có workshop nào được tạo.</p>
                    ) : (
                        
                        list.map((value) => (
                            <div key={value.id} style={styles.listItem}>
                                <div>
                                    <strong style={{ fontSize: '16px', color: '#2c3e50' }}>{value.topic}</strong>
                                    <div style={{ marginTop: '5px' }}>
                                        <span style={{ fontSize: '13px', color: '#7f8c8d', marginRight: '10px' }}>Lĩnh vực: {value.category}</span>
                                        <span style={styles.badge(value.isOnline)}>
                                            {value.isOnline ? "🌐 Online" : "📍 Offline"}
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setList(prev => prev.filter(item => item.id != value.id))}
                                    style={{ background: 'none', border: 'none', color: '#e74a3b', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    Xóa
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default WorkshopManager;