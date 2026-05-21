'use client'; // 상태 변화(useState)와 버튼 클릭 이벤트를 위해 선언

import React, { useState } from 'react';

export default function ArraysTuplesPage() {
  // ==========================================
  // 1. 배열 선언 방법 2가지 (둘 다 동일하게 작동)
  // ==========================================
  const initialFruits: string[] = ['사과', '바나나', '딸기'];
  const numbers: Array<number> = [1, 2, 3, 4, 5];

  // React 상태로 배열 관리 (타입스크립트 제네릭 <string[]> 사용)
  const [fruits, setFruits] = useState<string[]>(initialFruits);

  // ==========================================
  // 2. 읽기 전용 배열 (readonly)
  // ==========================================
  const ROLES: readonly string[] = ['admin', 'user', 'guest'];

  // ==========================================
  // 3. 튜플 (Tuple) - 길이와 각 위치의 타입이 고정된 배열
  // ==========================================
  const coordinate: [number, number] = [37.5, 127.0]; // 반드시 [숫자, 숫자]
  const entry: [string, number] = ['사과', 1500];     // 반드시 [문자열, 숫자]

  // --- 이벤트 핸들러 ---

  // 일반 배열 추가 테스트
  const addFruit = () => {
    // string[] 타입이므로 문자열인 '포도'는 정상적으로 추가됩니다.
    setFruits([...fruits, '포도']);
  };

  // 읽기 전용 배열 테스트용 함수
  const testReadonly = () => {
    // ❌ 강사님/수강생님! 아래 주석을 풀고 VS Code의 반응을 확인해 보세요.
    // ROLES.push('super');
    
    alert('readonly 배열에는 push()를 쓸 수 없습니다. VS Code에서 주석을 풀어 빨간 줄을 직접 확인하세요!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>TypeScript 배열과 튜플 실습</h1>

      {/* 1. 일반 배열 영역 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>1. 일반 배열 (string[], Array&lt;number&gt;)</h3>
        <p><strong>과일 목록:</strong> {fruits.join(', ')}</p>
        <button 
          onClick={addFruit} 
          style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {'포도'} 추가하기
        </button>
        <p style={{ marginTop: '15px' }}><strong>숫자 목록:</strong> {numbers.join(' - ')}</p>
      </div>

      {/* 2. 읽기 전용 배열 영역 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>2. 읽기 전용 배열 (readonly)</h3>
        <p><strong>시스템 권한:</strong> {ROLES.join(' | ')}</p>
        <button 
          onClick={testReadonly} 
          style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px' }}
        >
          읽기 전용 배열에 데이터 추가 시도
        </button>
      </div>

      {/* 3. 튜플 영역 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e2e3e5', borderRadius: '8px' }}>
        <h3>3. 튜플 (Tuple)</h3>
        <p>길이와 위치별 타입이 정확히 고정되어 있습니다.</p>
        <ul>
          <li><strong>지도 좌표:</strong> 위도 {coordinate[0]}, 경도 {coordinate[1]}</li>
          <li><strong>상품 정보:</strong> {entry[0]}의 가격은 {entry[1]}원 입니다.</li>
        </ul>
      </div>
    </div>
  );
}