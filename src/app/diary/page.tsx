"use client";

import { useState, useRef, useEffect } from "react";

interface DiaryEntry {
  id: string;
  author: "아빠" | "엄마" | "지솔이";
  title: string;
  content: string;
  image?: string;
  date: string;
}

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  // Form states
  const [author, setAuthor] = useState<"아빠" | "엄마" | "지솔이">("아빠");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEntry) {
      setEntries(prev => prev.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, author, title, content, image: selectedImage || undefined } 
          : entry
      ));
    } else {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        author,
        title,
        content,
        image: selectedImage || undefined,
        date: new Date().toLocaleDateString("ko-KR", { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }),
      };
      setEntries(prev => [newEntry, ...prev]);
    }

    closeModal();
  };

  const handleEdit = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setAuthor(entry.author);
    setTitle(entry.title);
    setContent(entry.content);
    setSelectedImage(entry.image || null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("이 기록을 삭제하시겠습니까?")) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const closeModal = () => {
    setEditingEntry(null);
    setAuthor("아빠");
    setTitle("");
    setContent("");
    setSelectedImage(null);
    setIsModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getAuthorBadgeColor = (authorName: string) => {
    switch (authorName) {
      case "아빠": return "bg-blue-100 text-blue-700";
      case "엄마": return "bg-rose-100 text-rose-700";
      case "지솔이": return "bg-amber-100 text-amber-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 min-h-screen">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[var(--muted)] pb-10">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-black text-foreground mb-3 tracking-tight">우리들의 기록</h1>
          <p className="text-muted-foreground text-lg font-medium">가족 모두가 함께 써 내려가는 따뜻한 일기장입니다.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          일기 쓰기
        </button>
      </header>

      {/* Diary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeModal} />
          <div className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-foreground tracking-tight">
                  {editingEntry ? "기록 수정" : "오늘의 기록 남기기"}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Author Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">누가 쓰는 글인가요?</label>
                  <div className="flex gap-4">
                    {(["아빠", "엄마", "지솔이"] as const).map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setAuthor(name)}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 ${
                          author === name 
                            ? "border-primary bg-primary/5 text-primary scale-105 shadow-sm" 
                            : "border-[var(--muted)] text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title and Image Selection */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">제목</label>
                    <input
                      type="text"
                      placeholder="오늘 하루를 한마디로 표현한다면?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-5 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-xl font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">사진 (선택)</label>
                    <div 
                      className="aspect-square bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer group border-2 border-dashed border-[var(--muted)]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {selectedImage ? (
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">내용</label>
                  <textarea
                    placeholder="지솔이가 오늘 처음으로 혼자 걸었어요! 너무나 감격스러운 하루였습니다..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-6 rounded-[24px] bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 outline-none resize-none text-lg leading-relaxed h-48"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button type="button" onClick={closeModal} className="px-8 py-4 rounded-2xl font-bold text-muted-foreground bg-muted hover:bg-zinc-200 transition-colors order-last sm:order-first">취소</button>
                  <div className="flex-1 flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => { alert("기능 준비 중: 선택한 시간에 글이 자동으로 올라갑니다."); closeModal(); }}
                      className="flex-1 bg-white border-2 border-accent text-accent px-8 py-4 rounded-2xl font-bold hover:bg-accent/5 transition-colors shadow-sm"
                    >
                      예약하기
                    </button>
                    <button 
                      type="submit" 
                      className="flex-[1.5] bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                      {editingEntry ? "수정 완료" : "지금 올리기"}
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {/* Diary List */}
      <section className="space-y-12">
        {entries.length === 0 ? (
          <div className="py-40 bg-white/50 backdrop-blur-sm rounded-[50px] border-4 border-dashed border-muted text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-muted-foreground text-2xl font-bold mb-2">아직 기록된 일기가 없어요</p>
            <p className="text-muted-foreground/60 text-lg">우리 가족의 소중한 하루를 기록해 보세요.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {entries.map((entry) => (
              <article key={entry.id} className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-black/[0.02] border border-muted hover:shadow-2xl transition-all group animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getAuthorBadgeColor(entry.author)}`}>
                        {entry.author}의 기록
                      </span>
                      <span className="text-muted-foreground font-medium">{entry.date}</span>
                    </div>
                    <h3 className="text-3xl font-black text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                      {entry.content}
                    </p>
                    <div className="flex gap-3 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(entry)} className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(entry.id)} className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {entry.image && (
                    <div className="md:w-1/3 aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg">
                      <img src={entry.image} alt="Diary memo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
