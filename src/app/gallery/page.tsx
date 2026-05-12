"use client";

import { useState, useRef, useEffect } from "react";

interface Post {
  id: string;
  image: string;
  content: string;
  date: string;
}

export default function GalleryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  // Form states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent scrolling when modal is open
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
    if (!selectedImage) {
      alert("사진을 선택해주세요!");
      return;
    }

    if (editingPost) {
      setPosts(prev => prev.map(p => 
        p.id === editingPost.id 
          ? { ...p, image: selectedImage, content: content } 
          : p
      ));
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        image: selectedImage,
        content: content,
        date: new Date().toLocaleDateString("ko-KR"),
      };
      setPosts(prev => [newPost, ...prev]);
    }

    closeModal();
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setSelectedImage(post.image);
    setContent(post.content);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("정말 이 기록을 삭제할까요?")) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setContent("");
    setEditingPost(null);
    setIsModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 min-h-screen">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-foreground mb-3 tracking-tight">가족 사진첩</h1>
          <p className="text-muted-foreground text-lg font-medium">우리 가족의 소중한 순간들을 기록하고 공유하세요.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          새 추억 올리기
        </button>
      </header>

      {/* Modal Window */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              {/* Left Side: Image Upload */}
              <div 
                className="md:w-1/2 bg-muted flex items-center justify-center relative cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-12">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-foreground font-bold text-xl mb-2">사진 선택하기</p>
                    <p className="text-muted-foreground font-medium">가족의 추억이 담긴 사진을 골라주세요</p>
                  </div>
                )}
                {selectedImage && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold border border-white/40">사진 변경</button>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>

              {/* Right Side: Content */}
              <div className="md:w-1/2 p-10 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-foreground tracking-tight">
                    {editingPost ? "추억 수정" : "새 추억 남기기"}
                  </h2>
                  <button onClick={closeModal} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8">
                  <textarea
                    placeholder="이 사진에는 어떤 이야기가 담겨 있나요? 우리 가족만의 소중한 기록을 남겨주세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 w-full p-6 rounded-[24px] bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 outline-none resize-none text-xl leading-relaxed placeholder:text-muted-foreground/60"
                    required
                  />

                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={closeModal}
                      className="flex-1 px-8 py-4 rounded-2xl font-bold text-muted-foreground bg-muted hover:bg-zinc-200 transition-colors"
                    >
                      취소
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                      {editingPost ? "수정 완료" : "지금 올리기"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid Layout */}
      <section className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {posts.length === 0 ? (
          <div className="col-span-full py-40 bg-white/50 backdrop-blur-sm rounded-[50px] border-4 border-dashed border-muted text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-muted-foreground text-2xl font-bold mb-2">아직 기록이 없어요</p>
            <p className="text-muted-foreground/60 text-lg">가족과 함께한 첫 번째 추억을 남겨볼까요?</p>
          </div>
        ) : (
          posts.map((post) => (
            <article 
              key={post.id} 
              className="break-inside-avoid bg-white rounded-[32px] overflow-hidden shadow-xl shadow-black/[0.03] border border-muted hover:shadow-2xl hover:shadow-black/[0.06] transition-all group animate-in fade-in zoom-in-95 duration-500"
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={post.image} 
                  alt="Family memory" 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-primary transition-all shadow-sm"
                      title="수정하기"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-red-500 transition-all shadow-sm"
                      title="삭제하기"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-white/80 font-bold text-sm tracking-widest">{post.date}</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap font-medium">
                  {post.content}
                </p>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}


