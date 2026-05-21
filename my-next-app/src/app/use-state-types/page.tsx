'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 상태로 관리할 객체의 타입(설계도) 정의
// ==========================================
interface User {
  id: number;
  name: string;
}

export default function UseStateTypesPage() {
  // ==========================================
  // 2. 타입 자동 추론 (초기값이 명확한 경우)
  // ==========================================
  // 0이라는 숫자를 보고 TypeScript가 알아서 count를 number 타입으로 지정합니다.
  const [count, setCount] = useState(0);       
  
  // 빈 문자열('')을 보고 name을 string 타입으로 지정합니다.
  const [name, setName] = useState('');        

  // ==========================================
  // 3. 명시적 제네릭 타입 지정 (초기값만으로는 알 수 없는 경우)
  // ==========================================
  // 초기값이 null이면 TypeScript는 영원히 null만 들어오는 줄 압니다.
  // 그래서 <User | null> 이라고 "지금은 null이지만 나중에 User 객체가 들어올 수 있어!"라고 알려줍니다.
  const [user, setUser] = useState<User | null>(null);
  
  // 초기값이 빈 배열 [] 이면 어떤 타입의 배열인지 알 수 없습니다.
  // 그래서 <User[]> 라고 "이건 User 객체들이 담길 배열이야!"라고 알려줍니다.
  const [users, setUsers] = useState<User[]>([]);

  // --- 이벤트 핸들러 ---
  
  // 자동 추론 테스트 함수
  const handleIncrement = () => setCount(count + 1);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  // 명시적 제네릭 테스트 함수
  const handleLogin = () => {
    // 지정된 User 타입에 맞게 객체를 넣어줍니다.
    setUser({ id: 101, name: '정성규' });
  };

  const handleLogout = () => {
    // 유니온 타입(|)으로 null을 허용했기 때문에 다시 null로 되돌릴 수 있습니다.
    setUser(null);
  };

  const handleAddUser = () => {
    const newUser: User = { id: Date.now(), name: name || '익명 사용자' };
    setUsers([...users, newUser]);
    setName(''); // 입력창 초기화
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript useState 타입 실습
      </h1>

      {/* 1. 자동 추론 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
        <h3>1. 자동 추론 (number, string)</h3>
        <p style={{ fontSize: '18px' }}>현재 카운트: <strong>{count}</strong></p>
        <button onClick={handleIncrement} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '15px' }}>
          카운트 증가
        </button>

        <div>
          <input 
            type="text" 
            value={name} 
            onChange={handleNameChange} 
            placeholder="이름을 입력하세요"
            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
          />
          <span>입력된 이름: <strong>{name}</strong></span>
        </div>
      </section>

      {/* 2. 단일 객체 (null 허용) 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fffbe1', borderRadius: '8px' }}>
        <h3>2. 제네릭 &lt;User | null&gt;</h3>
        <div style={{ marginBottom: '10px' }}>
          <button onClick={handleLogin} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}>로그인</button>
          <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}>로그아웃</button>
        </div>
        
        <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
          {/* 옵셔널 체이닝(?.)과 널 병합 연산자(??)의 콜라보레이션 */}
          <p>현재 사용자: <strong>{user?.name ?? '없음 (로그인해주세요)'}</strong></p>
          {user && <p style={{ fontSize: '14px', color: '#666' }}>회원 ID: {user.id}</p>}
        </div>
      </section>

      {/* 3. 배열 객체 영역 */}
      <section style={{ padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
        <h3>3. 제네릭 &lt;User[]&gt;</h3>
        <button onClick={handleAddUser} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '10px' }}>
          현재 입력된 이름으로 유저 추가하기
        </button>
        
        <ul style={{ paddingLeft: '20px' }}>
          {users.length === 0 ? (
            <li style={{ color: '#888' }}>배열이 비어있습니다.</li>
          ) : (
            users.map((u) => (
              <li key={u.id}>{u.name} (ID: {u.id})</li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}