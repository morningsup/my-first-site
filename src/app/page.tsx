import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-[var(--muted)] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            우리 가족의 <span className="text-primary">소중한 기록</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            매일의 소소한 일상부터 특별한 기념일까지, 
            우리 가족만의 이야기를 이곳에 하나씩 채워갑니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/gallery" 
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              사진첩 구경하기
            </Link>
            <Link 
              href="/diary" 
              className="bg-white border border-[var(--muted)] text-foreground px-8 py-3 rounded-full font-semibold hover:bg-zinc-50 transition-colors"
            >
              기록 남기기
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--muted)] hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">일상 사진첩</h3>
          <p className="text-muted-foreground leading-relaxed">
            오늘 찍은 따끈따끈한 사진들을 가족들과 함께 공유하세요.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--muted)] hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">소중한 기록</h3>
          <p className="text-muted-foreground leading-relaxed">
            잊고 싶지 않은 순간들을 글로 남겨 영원히 간직하세요.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--muted)] hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">우리 가족 소개</h3>
          <p className="text-muted-foreground leading-relaxed">
            사랑하는 가족 구성원들의 프로필과 특징을 소개합니다.
          </p>
        </div>
      </section>
    </div>
  );
}

