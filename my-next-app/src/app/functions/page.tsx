'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 기본 함수 및 화살표 함수 타입
// ==========================================
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

// ==========================================
// 2. 선택적 매개변수 (?)
// ==========================================
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}님` : `${name}님`;
}

// ==========================================
// 3. 기본값 매개변수 (Default Parameters)
// ==========================================
function createUser(name: string, role: string = 'user') {
  return { name, role };
}

// ==========================================
// 4. 나머지 매개변수 (Rest Parameters)
// ==========================================
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

export default function FunctionsPage() {
  // --- 상태 관리 (화면에 결과를 보여주기 위함) ---
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [greetResult, setGreetResult] = useState<string>('');
  const [userResult, setUserResult] = useState<{ name: string; role: string } | null>(null);
  const [sumResult, setSumResult] = useState<number | null>(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript 함수 타입 실습
      </h1>

      {/* 1. 기본 연산 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>1. 필수 매개변수 (add, multiply)</h3>
        <p>인자의 개수와 타입이 정확히 일치해야 합니다.</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => setCalcResult(add(10, 5))} style={{ padding: '8px' }}>
            add(10, 5) 실행
          </button>
          <button onClick={() => setCalcResult(multiply(10, 5))} style={{ padding: '8px' }}>
            multiply(10, 5) 실행
          </button>
        </div>
        <p><strong>연산 결과:</strong> {calcResult !== null ? calcResult : '대기 중...'}</p>
      </section>

      {/* 2. 선택적 매개변수 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
        <h3>2. 선택적 매개변수 (?)</h3>
        <p>두 번째 인자(title)는 생략이 가능합니다.</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => setGreetResult(greet('이상용'))} style={{ padding: '8px' }}>
            greet({'이상용'})
          </button>
          <button onClick={() => setGreetResult(greet('이상용', '강사'))} style={{ padding: '8px' }}>
            greet({'이상용'}, {'강사'})
          </button>
        </div>
        <p><strong>인사말:</strong> {greetResult || '대기 중...'}</p>
      </section>

      {/* 3. 기본값 매개변수 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fffbe1', borderRadius: '8px' }}>
        <h3>3. 기본값 매개변수 (=)</h3>
        <p>인자를 생략하면 미리 지정해 둔 기본값이 들어갑니다.</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => setUserResult(createUser('학생A'))} style={{ padding: '8px' }}>
            createUser({'학생A'})
          </button>
          <button onClick={() => setUserResult(createUser('관리자', 'admin'))} style={{ padding: '8px' }}>
            createUser({'관리자'}, {'admin'})
          </button>
        </div>
        <p>
          <strong>생성된 유저:</strong>{' '}
          {userResult ? JSON.stringify(userResult) : '대기 중...'}
        </p>
      </section>

      {/* 4. 나머지 매개변수 영역 */}
      <section style={{ padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
        <h3>4. 나머지 매개변수 (...numbers)</h3>
        <p>인자의 개수에 제한 없이 모두 배열로 받아 처리합니다.</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => setSumResult(sum(1, 2, 3))} style={{ padding: '8px' }}>
            sum(1, 2, 3)
          </button>
          <button onClick={() => setSumResult(sum(10, 20, 30, 40, 50))} style={{ padding: '8px' }}>
            sum(10, 20, 30, 40, 50)
          </button>
        </div>
        <p><strong>합계 결과:</strong> {sumResult !== null ? sumResult : '대기 중...'}</p>
      </section>
    </div>
  );
}