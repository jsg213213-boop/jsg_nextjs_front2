'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 공통 API 응답 구조 (제네릭 인터페이스)
// ==========================================
// 어떤 데이터(T)가 오든 status와 message는 항상 포함되는 껍데기(Wrapper) 규격입니다.
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// ==========================================
// 2. 개별 데이터의 타입(설계도) 정의
// ==========================================
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function GenericInterfacesPage() {
  // --- 상태 관리 ---
  // API 요청 전에는 데이터가 없을 수 있으므로 초기값은 null로 두고 타입을 연합(Union)시킵니다.
  const [userData, setUserData] = useState<ApiResponse<User> | null>(null);
  const [postData, setPostData] = useState<ApiResponse<Post> | null>(null);
  const [userListData, setUserListData] = useState<ApiResponse<User[]> | null>(null);

  // --- 가상의 API 호출 핸들러 ---
  const fetchUser = () => {
    // T 자리에 User 타입이 들어감 (data 속성에 User 객체가 들어가야 함)
    const response: ApiResponse<User> = {
      data: { id: 19920213, name: '정성규' },
      status: 200,
      message: '단일 유저 정보 조회 성공',
    };
    setUserData(response);
  };

  const fetchPost = () => {
    // T 자리에 Post 타입이 들어감
    const response: ApiResponse<Post> = {
      data: { id: 101, title: '타입스크립트 제네릭 완벽 가이드', content: '제네릭은 마법의 상자입니다.' },
      status: 200,
      message: '게시글 조회 성공',
    };
    setPostData(response);
  };

  const fetchUserList = () => {
    // T 자리에 User[] (유저 배열) 타입이 들어감
    const response: ApiResponse<User[]> = {
      data: [
        { id: 293, name: '정성규' },
        { id: 282, name: '김보나' },
        { id: 251, name: '이여름' },
      ],
      status: 200,
      message: '유저 목록 조회 성공',
    };
    setUserListData(response);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '700px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript 제네릭 인터페이스 (API 응답) 실습
      </h1>

      {/* 1. 단일 유저 조회 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
        <h3>1. ApiResponse&lt;User&gt; (단일 객체)</h3>
        <button onClick={fetchUser} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '10px' }}>
          유저 데이터 요청
        </button>
        {userData && (
          <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
            <p><strong>상태 코드:</strong> {userData.status} | <strong>메시지:</strong> {userData.message}</p>
            <p><strong>회원명:</strong> {userData.data.name} (ID: {userData.data.id})</p>
          </div>
        )}
      </section>

      {/* 2. 게시글 조회 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fffbe1', borderRadius: '8px' }}>
        <h3>2. ApiResponse&lt;Post&gt; (단일 객체)</h3>
        <button onClick={fetchPost} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '10px' }}>
          게시글 데이터 요청
        </button>
        {postData && (
          <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
            <p><strong>상태 코드:</strong> {postData.status} | <strong>메시지:</strong> {postData.message}</p>
            <p><strong>제목:</strong> {postData.data.title}</p>
            <p><strong>내용:</strong> {postData.data.content}</p>
          </div>
        )}
      </section>

      {/* 3. 유저 배열 조회 */}
      <section style={{ padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
        <h3>3. ApiResponse&lt;User[]&gt; (배열)</h3>
        <button onClick={fetchUserList} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '10px' }}>
          유저 목록 데이터 요청
        </button>
        {userListData && (
          <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
            <p><strong>상태 코드:</strong> {userListData.status} | <strong>메시지:</strong> {userListData.message}</p>
            <ul>
              {userListData.data.map((u) => (
                <li key={u.id}>{u.name} (ID: {u.id})</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}