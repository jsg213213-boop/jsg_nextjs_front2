'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 원본 인터페이스 정의 (마스터 설계도)
// ==========================================
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

// ==========================================
// 2. 유틸리티 타입 활용
// ==========================================
// Partial: 수정 요청 시 전체 데이터 중 일부만 넘겨도 되도록 모든 속성을 선택적(?)으로 변경
type UpdateUserDto = Partial<User>;

// Pick: 필요한 필드만 쏙쏙 뽑아냄 (공개 프로필용)
type PublicProfile = Pick<User, 'id' | 'name'>;

// Omit: 특정 필드만 쏙 빼버림 (비밀번호 같은 민감 정보 제거 시 필수!)
type SafeUser = Omit<User, 'password'>;

// Record: 정해진 키(Key)와 값(Value)의 타입을 매핑 (역할별 권한 맵)
type RolePermissions = Record<'admin' | 'user' | 'guest', string[]>;

export default function UtilityTypesPage() {
  // --- 상태 관리 ---
  
  // 전체 User 데이터 (DB에서 갓 꺼내온 상태라고 가정)
  const [fullUser, setFullUser] = useState<User>({
    id: 1,
    name: '정성규',
    email: 'jsg0213@naver.com',
    password: 'super-secret-password',
    age: 30,
  });

  // 권한 맵 데이터
  const permissions: RolePermissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read'],
  };

  // --- 변환된 데이터 생성 ---
  // 실무에서는 서버로 데이터를 보내거나, 컴포넌트로 넘길 때 이렇게 타입을 변환합니다.
  
  const publicProfile: PublicProfile = {
    id: fullUser.id,
    name: fullUser.name,
    // email: fullUser.email, // ❌ Pick으로 뽑지 않았기 때문에 에러!
  };

  const safeUser: SafeUser = {
    id: fullUser.id,
    name: fullUser.name,
    email: fullUser.email,
    age: fullUser.age,
    // password: fullUser.password, // ❌ Omit으로 뺐기 때문에 에러!
  };

  // --- 이벤트 핸들러 ---
  const handlePartialUpdate = () => {
    // Partial을 썼기 때문에, 5개 속성을 다 채울 필요 없이 바꾸고 싶은 것만 보낼 수 있습니다.
    const updateData: UpdateUserDto = { 
      age: fullUser.age + 1,
      // nickname: '천재', // ❌ User에 없는 속성을 마음대로 넣을 순 없음!
    };
    
    setFullUser({ ...fullUser, ...updateData });
  };

  const testReadonly = () => {
    // Readonly: 원본 데이터가 절대 수정되지 않도록 잠금장치를 겁니다.
    const config: Readonly<User> = { ...fullUser };
    
    // 👨‍🏫 수강생 실습: 아래 주석을 풀고 에러를 확인하세요!
    // config.name = '홍길동'; 
    
    alert('VS Code에서 직접 주석을 풀고 Readonly 에러를 확인해 보세요!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '700px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript 유틸리티 타입 실습
      </h1>

      {/* 1. Partial 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
        <h3>1. Partial&lt;User&gt; (일부 업데이트)</h3>
        <p>현재 나이: <strong>{fullUser.age}세</strong></p>
        <button onClick={handlePartialUpdate} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
          나이만 업데이트 (Partial 데이터 전송)
        </button>
      </section>

      {/* 2. Pick 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fffbe1', borderRadius: '8px' }}>
        <h3>2. Pick&lt;User, {'id'} | {'name'}&gt;</h3>
        <p>전체 정보 중 공개해도 되는 정보만 선택했습니다.</p>
        <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
          <p>회원번호: {publicProfile.id}</p>
          <p>이름: {publicProfile.name}</p>
          {/* <p>이메일: {publicProfile.email}</p> ❌ 접근 불가 */}
        </div>
      </section>

      {/* 3. Omit 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
        <h3>3. Omit&lt;User, {'password'}&gt;</h3>
        <p>전체 정보 중 민감한 비밀번호만 쏙 제거했습니다.</p>
        <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
          <p>이름: {safeUser.name}</p>
          <p>이메일: {safeUser.email}</p>
          <p>나이: {safeUser.age}</p>
          <p style={{ color: 'red' }}>* 비밀번호 필드 없음</p>
        </div>
      </section>

      {/* 4. Record & Readonly 영역 */}
      <section style={{ padding: '15px', backgroundColor: '#fdf4ff', borderRadius: '8px' }}>
        <h3>4. Record & Readonly</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>Record 권한 맵:</strong>
          <ul>
            <li>Admin: {permissions.admin.join(', ')}</li>
            <li>User: {permissions.user.join(', ')}</li>
          </ul>
        </div>
        <button onClick={testReadonly} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#d946ef', color: 'white', border: 'none', borderRadius: '4px' }}>
          Readonly 불변성 테스트
        </button>
      </section>
    </div>
  );
}