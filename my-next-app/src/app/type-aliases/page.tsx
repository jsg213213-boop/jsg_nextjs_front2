'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 객체 타입 정의 (interface와 거의 동일한 역할)
// ==========================================
type Point = {
  x: number;
  y: number;
};

// ==========================================
// 2. 유니온 타입 (💡 interface로는 절대 불가능!)
// ==========================================
type StringOrNumber = string | number;

// ==========================================
// 3. 함수 타입 (💡 interface로는 복잡하고 어색함)
// ==========================================
// 메시지를 받아서 아무것도 반환하지 않는 함수 모양 자체를 'Callback'이라 부르기로 함
type Callback = (message: string) => void;

// ==========================================
// 4. 제네릭 튜플 타입 (💡 interface로는 불가능!)
// ==========================================
// 같은 타입 두 개가 묶인 쌍(Pair)을 정의
type Pair<T> = [T, T];

export default function TypeAliasPage() {
  // --- 상태 관리 ---
  
  // 1. 객체 타입 사용
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  // 2. 유니온 타입 사용
  const [flexibleId, setFlexibleId] = useState<StringOrNumber>(100);

  // 4. 튜플 타입 사용 (문자열 쌍, 숫자 쌍)
  const [stringPair, setStringPair] = useState<Pair<string>>(['좌', '우']);
  const [numberPair, setNumberPair] = useState<Pair<number>>([10, 20]);

  // --- 이벤트 핸들러 ---

  // 3. 함수 타입 사용 (인자로 Callback 타입을 받음)
  const executeCallback = (cb: Callback) => {
    // 넘겨받은 함수(cb)를 실행
    cb('콜백 함수가 성공적으로 실행되었습니다!');
  };

  const movePosition = () => {
    setPosition({ x: position.x + 10, y: position.y + 5 });
  };

  const changeIdType = () => {
    // 현재 숫자면 문자열로, 문자열이면 숫자로 변경
    if (typeof flexibleId === 'number') {
      setFlexibleId('USER_ABC');
    } else {
      setFlexibleId(100);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript Type Alias (타입 별칭) 실습
      </h1>

      {/* 1. 객체 타입 영역 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fdf4ff', borderRadius: '8px' }}>
        <h3>1. 객체 타입 (Point)</h3>
        <p>현재 좌표: X({position.x}), Y({position.y})</p>
        <button onClick={movePosition} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          좌표 이동시키기
        </button>
      </div>

      {/* 2. 유니온 타입 영역 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
        <h3>2. 유니온 타입 (StringOrNumber)</h3>
        <p>현재 ID: <strong>{flexibleId}</strong> (타입: {typeof flexibleId})</p>
        <button onClick={changeIdType} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          ID 타입 스위치 (Number ↔ String)
        </button>
      </div>

      {/* 3. 함수 & 튜플 타입 영역 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
        <h3>3 & 4. 함수 타입 (Callback) & 튜플 (Pair)</h3>
        <ul>
          <li>문자열 쌍: {stringPair[0]}, {stringPair[1]}</li>
          <li>숫자 쌍: {numberPair[0]}, {numberPair[1]}</li>
        </ul>
        <button 
          // 버튼 클릭 시 executeCallback에 '메시지를 띄우는 함수' 자체를 전달
          onClick={() => executeCallback((msg) => alert(msg))} 
          style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          콜백 함수 실행하기
        </button>
      </div>
    </div>
  );
}