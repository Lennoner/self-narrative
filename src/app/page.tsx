'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
  const [shareName, setShareName] = useState('');

  const handleSearchResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchName.trim()) {
      router.push(`/report?name=${encodeURIComponent(searchName.trim())}`);
    }
  };

  const handleGoToShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (shareName.trim()) {
      router.push(`/share?name=${encodeURIComponent(shareName.trim())}`);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
            Self Narrative
          </Link>
          <nav className="flex items-center gap-10">
            <a
              href="https://tally.so/r/ODl9AK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-gray-600 hover:text-black transition-colors"
            >
              설문하기
            </a>
            <Link
              href="/demo"
              className="text-base text-gray-600 hover:text-black transition-colors"
            >
              데모 보기
            </Link>
          </nav>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-24">
        <div className="max-w-4xl text-center">
          <p className="text-base text-gray-500 mb-8 tracking-widest uppercase animate-fade-in">
            Self Narrative Project
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-10 animate-fade-in">
            나는 나를
            <br />
            <span className="font-semibold">과소평가</span>하고 있다
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-16 max-w-2xl mx-auto animate-fade-in">
            내가 보는 나와 타인이 보는 나의 인식 격차를 데이터로 분석하여,
            당신의 숨겨진 가치를 발견합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in">
            <a
              href="https://tally.so/r/ODl9AK"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              나의 서사 찾기 →
            </a>
            <Link
              href="/demo"
              className="px-10 py-5 bg-white text-black text-base font-medium rounded-full border-2 border-gray-200 hover:border-black hover:scale-105 transition-all duration-300"
            >
              결과 미리보기
            </Link>
          </div>
        </div>
      </section>

      {/* 결과 검색 섹션 */}
      <section className="py-40 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            {/* 내 결과 보기 */}
            <div className="group">
              <p className="text-sm text-gray-400 mb-5 tracking-widest uppercase">
                My Report
              </p>
              <h2 className="text-3xl md:text-4xl font-light mb-8">
                <span className="font-semibold">내 결과</span> 보기
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                설문에 참여하셨다면, 본인 이름을 입력하여 결과를 확인하세요.
              </p>
              <form onSubmit={handleSearchResult} className="flex gap-4">
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="이름 입력"
                  className="flex-1 px-6 py-5 bg-gray-50 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-10 py-5 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                >
                  확인
                </button>
              </form>
            </div>

            {/* 지인 공유하기 */}
            <div className="group">
              <p className="text-sm text-gray-400 mb-5 tracking-widest uppercase">
                Share
              </p>
              <h2 className="text-3xl md:text-4xl font-light mb-8">
                <span className="font-semibold">지인에게</span> 공유하기
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                설문 완료 후 지인에게 공유하고 싶다면, 본인 이름을 입력하세요.
              </p>
              <form onSubmit={handleGoToShare} className="flex gap-4">
                <input
                  type="text"
                  value={shareName}
                  onChange={(e) => setShareName(e.target.value)}
                  placeholder="이름 입력"
                  className="flex-1 px-6 py-5 bg-gray-50 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-10 py-5 bg-white text-black text-base font-medium rounded-full border-2 border-gray-200 hover:border-black hover:scale-105 transition-all duration-300"
                >
                  공유
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 프로세스 섹션 */}
      <section className="py-40 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-5 tracking-widest uppercase">
            Process
          </p>
          <h2 className="text-4xl md:text-5xl font-light mb-20">
            3분 투자로
            <br />
            <span className="font-semibold">진짜 나</span>를 발견하세요
          </h2>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="group cursor-pointer">
              <div className="text-7xl font-light text-gray-200 mb-6 group-hover:text-black transition-colors duration-500">
                01
              </div>
              <h3 className="text-2xl font-semibold mb-4">나의 설문</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                과거의 성취, 현재의 가치, 미래의 잠재력에 대한
                나의 생각을 기록합니다.
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="text-7xl font-light text-gray-200 mb-6 group-hover:text-black transition-colors duration-500">
                02
              </div>
              <h3 className="text-2xl font-semibold mb-4">지인 초대</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                가까운 친구, 가족, 동료에게 나에 대한
                솔직한 평가를 부탁합니다.
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="text-7xl font-light text-gray-200 mb-6 group-hover:text-black transition-colors duration-500">
                03
              </div>
              <h3 className="text-2xl font-semibold mb-4">인식 격차 리포트</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                나와 지인들의 평가를 비교 분석하여
                숨겨진 강점을 발견합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 가치 섹션 */}
      <section className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-5 tracking-widest uppercase">
            Value
          </p>
          <h2 className="text-4xl md:text-5xl font-light mb-20">
            왜 자아 서사가
            <br />
            <span className="font-semibold">중요할까요?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-10 rounded-3xl hover:shadow-lg transition-shadow duration-500">
              <p className="text-sm text-gray-400 mb-4 tracking-widest">과거</p>
              <h3 className="text-2xl font-semibold mb-4">인지적 오류 교정</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                "운이 좋았을 뿐"이라고 생각했던 성과,
                친구들은 당신의 노력을 알고 있습니다.
              </p>
            </div>

            <div className="bg-gray-50 p-10 rounded-3xl hover:shadow-lg transition-shadow duration-500">
              <p className="text-sm text-gray-400 mb-4 tracking-widest">현재</p>
              <h3 className="text-2xl font-semibold mb-4">사회적 가치 입증</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                당신이 사라진다면 얼마나 큰 빈자리가 생길까요?
                친구들의 답은 다를 수 있어요.
              </p>
            </div>

            <div className="bg-gray-50 p-10 rounded-3xl hover:shadow-lg transition-shadow duration-500">
              <p className="text-sm text-gray-400 mb-4 tracking-widest">미래</p>
              <h3 className="text-2xl font-semibold mb-4">잠재역량 도출</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                두려움 없이 발휘하고 싶은 잠재력,
                친구들이 기대하는 당신의 모습을 만나보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-48 px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-8">
            당신의 서사를
            <br />
            <span className="font-semibold">시작하세요</span>
          </h2>
          <p className="text-xl text-gray-400 mb-14">
            설문은 약 3분, 친구들의 응답이 모이면 리포트가 완성됩니다.
          </p>
          <a
            href="https://tally.so/r/ODl9AK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-14 py-6 bg-white text-black text-lg font-medium rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            지금 시작하기 →
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-16 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-base text-gray-400">
            © 2024 Self Narrative Project
          </p>
          <p className="text-base text-gray-400">
            당신이 몰랐던 당신의 진짜 이야기를 찾아서
          </p>
        </div>
      </footer>
    </main>
  );
}
