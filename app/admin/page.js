"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus, Terminal, Lock, Loader2, RefreshCw, FileText, Award, FolderGit2 } from "lucide-react";

export default function AdminDashboard() {
  // --- STATE SYSTEM ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("projects"); // Default tab: projects

  // DATA STORE
  const [dataList, setDataList] = useState([]); // Menyimpan list data (entah project/blog/cert)

  // FORM INPUTS (Satu object besar buat nampung semua jenis input)
  const [formData, setFormData] = useState({
    title: "", description: "", techStack: "", repoLink: "", demoLink: "", // Project
    slug: "", excerpt: "", content: "", tags: "", // Blog
    issuer: "", date: "", category: "Coding", credentialLink: "" // Certificate & Blog Category
  });

  // --- LOGIN FUNCTION ---
  const handleLogin = async () => {
    setIsLoading(true);
    const res = await fetch("/api/admin/auth", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setIsLoading(false);
    if (res.ok) {
      setIsAuthenticated(true);
      fetchData("projects"); // Load data project dulu
    } else {
      alert("ACCESS DENIED! Wrong Password.");
    }
  };

  // --- FETCH DATA (DINAMIS SESUAI TAB) ---
  const fetchData = async (type = activeTab) => {
    try {
      const res = await fetch(`/api/admin/${type}`);
      if (res.ok) {
        const data = await res.json();
        setDataList(data);
      }
    } catch (error) { console.error("Error fetching data"); }
  };

  // Ganti Tab & Fetch Ulang
  const switchTab = (tab) => {
    setActiveTab(tab);
    setDataList([]); // Kosongkan dulu biar gak kedip
    fetchData(tab);
    // Reset Form
    setFormData({ title: "", description: "", techStack: "", repoLink: "", demoLink: "", slug: "", excerpt: "", content: "", tags: "", issuer: "", date: "", category: "Coding", credentialLink: "" });
  };

  // --- SUBMIT (DINAMIS) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const res = await fetch(`/api/admin/${activeTab}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, secret: password }),
    });

    setIsLoading(false);
    if (res.ok) {
      alert("Data Uploaded Successfully!");
      fetchData(); 
    } else {
      const err = await res.json();
      alert("Failed: " + err.error);
    }
  };

  // --- DELETE (DINAMIS) ---
  const handleDelete = async (id) => {
    if (!confirm("Are you sure? Deleted data cannot be recovered.")) return;
    const res = await fetch(`/api/admin/${activeTab}`, {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, secret: password }),
    });
    if (res.ok) fetchData();
  };


  // --- TAMPILAN LOCK SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
        <div className="max-w-md w-full border border-green-500/30 bg-gray-900/50 p-8 rounded-xl backdrop-blur-md text-center space-y-6 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          <Lock className="w-12 h-12 text-green-500 mx-auto animate-pulse" />
          <h1 className="text-2xl text-white tracking-widest">RESTRICTED AREA</h1>
          <input type="password" placeholder="Enter Admin Code..." className="w-full bg-black/50 border border-green-500/50 text-green-400 p-3 rounded text-center outline-none focus:border-green-400"
            onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          <button onClick={handleLogin} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 rounded transition-all">
            {isLoading ? "AUTHENTICATING..." : "ACCESS DASHBOARD"}
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 font-mono">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 gap-4">
        <div className="flex items-center gap-2 text-green-500">
          <Terminal className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-widest">COMMAND CENTER v2.0</h1>
        </div>
        
        {/* TABS NAVIGATION */}
        <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
          <button onClick={() => switchTab("projects")} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === "projects" ? "bg-green-600 text-black font-bold" : "text-gray-400 hover:text-white"}`}>
            <FolderGit2 className="w-4 h-4" /> Projects
          </button>
          <button onClick={() => switchTab("blogs")} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === "blogs" ? "bg-green-600 text-black font-bold" : "text-gray-400 hover:text-white"}`}>
            <FileText className="w-4 h-4" /> Blogs
          </button>
          <button onClick={() => switchTab("certificates")} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === "certificates" ? "bg-green-600 text-black font-bold" : "text-gray-400 hover:text-white"}`}>
            <Award className="w-4 h-4" /> Certs
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* === KOLOM KIRI: FORM INPUT (BERUBAH SESUAI TAB) === */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 h-fit shadow-xl backdrop-blur-sm">
          <h2 className="text-lg text-green-400 mb-6 flex items-center gap-2 border-b border-gray-800 pb-2 uppercase">
            <Plus className="w-5 h-5" /> ADD NEW {activeTab.slice(0, -1)}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* FORM KHUSUS PROJECTS */}
            {activeTab === "projects" && (
              <>
                <input required placeholder="Project Title" className="input-field" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <textarea required placeholder="Description" className="input-field h-24" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                <input placeholder="Tech Stack (React, Next.js...)" className="input-field" value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Repo Link" className="input-field" value={formData.repoLink} onChange={(e) => setFormData({...formData, repoLink: e.target.value})} />
                  <input placeholder="Demo Link" className="input-field" value={formData.demoLink} onChange={(e) => setFormData({...formData, demoLink: e.target.value})} />
                </div>
              </>
            )}

            {/* FORM KHUSUS BLOGS */}
            {activeTab === "blogs" && (
              <>
                <input required placeholder="Blog Title" className="input-field" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Slug (judul-pake-strip)" className="input-field" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} />
                  <input placeholder="Category (Islamic/Coding)" className="input-field" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                </div>
                <input required placeholder="Excerpt (Ringkasan singkat)" className="input-field" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} />
                <textarea required placeholder="Full Content (Markdown/Text)" className="input-field h-40" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
                <input placeholder="Tags (Adab, Security...)" className="input-field" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} />
              </>
            )}

            {/* FORM KHUSUS CERTIFICATES */}
            {activeTab === "certificates" && (
              <>
                <input required placeholder="Certificate Title" className="input-field" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <input required placeholder="Issuer (Penyelenggara)" className="input-field" value={formData.issuer} onChange={(e) => setFormData({...formData, issuer: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Date (ex: Oct 2025)" className="input-field" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  <input placeholder="Category (Akademik/Lomba)" className="input-field" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                </div>
                <input placeholder="Credential Link (Drive/Web)" className="input-field" value={formData.credentialLink} onChange={(e) => setFormData({...formData, credentialLink: e.target.value})} />
              </>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 rounded mt-4 transition-all flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "EXECUTE UPLOAD"}
            </button>
          </form>
        </div>

        {/* === KOLOM KANAN: LIST DATA (PREVIEW) === */}
        <div className="space-y-4">
           <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
             <h2 className="text-lg text-gray-400 uppercase">DATABASE: {activeTab}</h2>
             <span className="text-xs text-gray-600">{dataList.length} RECORDS</span>
           </div>
           
           <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
             {dataList.length === 0 && <div className="text-center p-8 border border-dashed border-gray-800 rounded-xl text-gray-600 text-sm">No records found.</div>}

             {dataList.map((item) => (
               <div key={item.id} className="bg-black/40 border border-gray-800 rounded-xl p-4 flex justify-between items-start group hover:border-green-500/50 hover:bg-green-900/5 transition-all">
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-200 group-hover:text-green-400 transition-colors">{item.title}</h3>
                      <button onClick={() => handleDelete(item.id)} className="text-gray-600 hover:text-red-500 p-1 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    {/* Tampilkan detail kecil tergantung tipe */}
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {activeTab === "projects" && item.description}
                      {activeTab === "blogs" && item.excerpt}
                      {activeTab === "certificates" && `${item.issuer} • ${item.date}`}
                    </p>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </div>

      {/* CSS KHUSUS BUAT INPUT BIAR RAPI */}
      <style jsx>{`
        .input-field {
          width: 100%;
          background-color: black;
          border: 1px solid #374151;
          border-radius: 0.25rem;
          padding: 0.75rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: #22c55e;
        }
      `}</style>
    </div>
  );
}