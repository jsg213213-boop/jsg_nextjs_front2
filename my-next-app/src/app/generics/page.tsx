'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 제네릭이 없을 때 (답답한 상황)
// ==========================================
// 타입별로 똑같은 로직의 함수를 계속 만들어야 합니다.
function getFirstString(arr: string[]): string { return arr[0]; }
function getFirstNumber(arr: number[]): number { return arr[0]; }

// ==========================================
// 2. 제네릭(Generics) 사용 (해결책)
// ==========================================
// <T> : '타입 매개변수'라고 부릅니다. (Type의 약자로 관례상 T를 많이 씁니다)
// "어떤 타입(T)의 배열이 들어오든, 그 타입(T)의 첫 번째 요소를 반환하겠다"는 뜻입니다.
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

export default function GenericsPage() {
  // --- 상태 관리 ---
  const [strResult, setStrResult] = useState<string | null>(null);
  const [numResult, setNumResult] = useState<number | null>(null);
  const [boolResult, setBoolResult] = useState<boolean | null>(null);

  // --- 이벤트 핸들러 ---
  const handleStringArray = () => {
    // TypeScript가 ['사과', '바나나']를 보고 T가 string임을 '자동 추론'합니다.
    const result = getFirst(['사과', '바나나']); 
    setStrResult(result);
  };

  const handleNumberArray = () => {
    // TypeScript가 [10, 20, 30]을 보고 T가 number임을 '자동 추론'합니다.
    const result = getFirst([10, 20, 30]);
    setNumResult(result);
  };

  const handleBooleanArray = () => {
    // <boolean>이라고 명시적으로 타입을 지정해 줄 수도 있습니다. (권장되는 안전한 방법)
    const result = getFirst<boolean>([true, false, true]);
    setBoolResult(result);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript 제네릭(Generics) 실습
      </h1>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>마법의 함수: getFirst&lt;T&gt;()</h3>
        <p>하나의 함수로 문자열, 숫자, 불리언 배열을 모두 처리합니다.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* 문자열 배열 테스트 */}
        <section style={{ padding: '15px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
          <h4>문자열 배열: {`['사과', '바나나']`}</h4>
          <button onClick={handleStringArray} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
            첫 번째 요소 가져오기
          </button>
          <p style={{ marginTop: '10px' }}>결과: <strong>{strResult !== null ? strResult : '대기 중...'}</strong></p>
        </section>

        {/* 숫자 배열 테스트 */}
        <section style={{ padding: '15px', backgroundColor: '#fffbe1', borderRadius: '8px' }}>
          <h4>숫자 배열: [10, 20, 30]</h4>
          <button onClick={handleNumberArray} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px' }}>
            첫 번째 요소 가져오기
          </button>
          <p style={{ marginTop: '10px' }}>결과: <strong>{numResult !== null ? numResult : '대기 중...'}</strong></p>
        </section>

        {/* 불리언 배열 테스트 */}
        <section style={{ padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
          <h4>불리언 배열: [true, false, true]</h4>
          <button onClick={handleBooleanArray} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px' }}>
            &lt;boolean&gt; 명시적 호출
          </button>
          <p style={{ marginTop: '10px' }}>결과: <strong>{boolResult !== null ? (boolResult ? '참(true)' : '거짓(false)') : '대기 중...'}</strong></p>
        </section>
      </div>
    </div>
  );
}