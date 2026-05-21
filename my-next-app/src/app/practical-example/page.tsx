'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 데이터 설계도 (Interface & Literal Type)
// ==========================================
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user'; // 관리자 또는 일반 유저만 가능 (리터럴 타입)
}

// ==========================================
// 2. 비즈니스 로직 함수
// ==========================================

// 2-1. 관리자만 추출하는 함수
// 입력값: User 배열 / 반환값: User 배열
function getAdmins(users: User[]): User[] {
  return users.filter((u) => u.role === 'admin');
}

// 2-2. 유저 이메일 포맷 생성 함수 (💡 Pick 활용)
// 입력값: 전체 User 객체가 아닌, name과 email만 있는 객체 / 반환값: 문자열
function formatUser(user: Pick<User, 'name' | 'email'>): string {
  // Pick으로 뽑은 속성만 안전하게 사용 가능합니다.
  return `${user.name} 님의 연락처: <${user.email}>`;
}

export default function PracticalExamplePage() {
  // --- 상태 관리 ---
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '정성규', email: 'jsg19920213@test.com', role: 'admin' },
    { id: 2, name: '김지연', email: 'kjy19950819@test.com', role: 'user' },
    { id: 3, name: '이여름', email: 'lyr19990110@test.com', role: 'user' },
    { id: 4, name: '조나단', email: 'jnd20000201@test.com', role: 'user' },
  ]);

  const [adminList, setAdminList] = useState<User[]>([]);
  const [formattedString, setFormattedString] = useState<string>('');

  // --- 이벤트 핸들러 ---
  const handleFilterAdmins = () => {
    // getAdmins 함수에 전체 유저 배열을 넘겨 관리자만 받아옵니다.
    const result = getAdmins(users);
    setAdminList(result);
  };

  const handleFormatClick = (selectedUser: User) => {
    // selectedUser는 User 타입(id, name, email, role 포함)입니다.
    // formatUser 함수는 Pick<User, 'name' | 'email'>을 요구하지만,
    // TypeScript는 "네가 넘긴 객체 안에 name과 email이 확실히 들어있네? 통과!" 하고 유연하게 허용합니다. (구조적 타이핑)
    const result = formatUser(selectedUser);
    setFormattedString(result);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '700px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript 실무 종합 활용 실습
      </h1>

      {/* 1. 전체 유저 목록 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>👥 전체 회원 목록</h3>
        <ul>
          {users.map((u) => (
            <li key={u.id} style={{ marginBottom: '8px' }}>
              [{u.role.toUpperCase()}] {u.name} 
              <button 
                onClick={() => handleFormatClick(u)}
                style={{ marginLeft: '10px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}
              >
                연락처 포맷팅
              </button>
            </li>
          ))}
        </ul>
        {/* 포맷팅 결과 출력 영역 */}
        {formattedString && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#eef2ff', borderRadius: '4px', border: '1px solid #c7d2fe', color: '#4338ca' }}>
            <strong>출력 결과:</strong> {formattedString}
          </div>
        )}
      </section>

      {/* 2. 관리자 필터링 기능 */}
      <section style={{ padding: '15px', backgroundColor: '#fffbe1', borderRadius: '8px' }}>
        <h3>🛡️ 관리자(Admin) 전용 메뉴</h3>
        <button 
          onClick={handleFilterAdmins} 
          style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '15px' }}
        >
          관리자만 필터링하기
        </button>

        {adminList.length > 0 ? (
          <ul style={{ padding: '15px', backgroundColor: 'white', border: '1px solid #fcd34d', borderRadius: '4px' }}>
            {adminList.map((admin) => (
              <li key={admin.id}>
                <strong>{admin.name}</strong> (사번: {admin.id})
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#888' }}>버튼을 눌러 관리자를 조회하세요.</p>
        )}
      </section>
    </div>
  );
}