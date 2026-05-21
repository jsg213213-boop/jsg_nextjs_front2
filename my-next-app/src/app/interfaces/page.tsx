"use client";

import React, { useState } from "react";

// ==========================================
// 1. Interface 정의: 객체의 청사진(구조)
// ==========================================
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // ? = 선택적 프로퍼티 (데이터가 없어도 에러 안 남)
  readonly createdAt: Date; // readonly = 객체 생성 시점에만 값 할당 가능 (이후 수정 불가)
}

export default function InterfacesPage() {
  // 2. 초기 User 객체 생성
  const initialUser: User = {
    id: 1,
    name: "정성규",
    email: "jsg0213@naver.com",
    // age는 선택적이므로 생략해도 TypeScript가 허용합니다.
    createdAt: new Date(),
  };

  // React 상태로 관리
  const [user, setUser] = useState<User>(initialUser);

  // --- 이벤트 핸들러 ---

  // 나이 추가/수정 함수 (age 프로퍼티 활용)
  const addAge = () => {
    setUser({
      ...user,
      age: 33, // 선택적 프로퍼티였던 age에 값을 채워넣음
    });
  };

  // 일반 프로퍼티(name) 변경 함수
  const changeName = () => {
    setUser({
      ...user,
      name: "정성규",
    });
  };

  // ❌ 에러 유도용 함수 (주석을 풀고 확인해야 함)
  const tryChangeCreatedAt = () => {
    // 수강생 실습용: 아래 주석을 해제해 보세요!
    // user.createdAt = new Date();

    alert("VS Code에서 직접 주석을 풀고 readonly 에러를 확인해 보세요!");
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>
        TypeScript Interface 실습
      </h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <h3>현재 유저 정보 (User Interface)</h3>
        <ul style={{ lineHeight: "1.8", fontSize: "16px" }}>
          <li>
            <strong>ID:</strong> {user.id}
          </li>
          <li>
            <strong>이름:</strong> {user.name}
          </li>
          <li>
            <strong>이메일:</strong> {user.email}
          </li>
          <li>
            <strong>나이 (age?):</strong>{" "}
            {user.age ? (
              `${user.age}세`
            ) : (
              <span style={{ color: "#999" }}>35 (선택적 속성)</span>
            )}
          </li>
          <li>
            <strong>가입일시 (readonly):</strong>{" "}
            {user.createdAt.toLocaleTimeString()}
          </li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={addAge}
          style={{
            padding: "10px 16px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          나이(age) 정보 추가하기
        </button>

        <button
          onClick={changeName}
          style={{
            padding: "10px 16px",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          이름(name) 변경하기
        </button>

        <button
          onClick={tryChangeCreatedAt}
          style={{
            padding: "10px 16px",
            cursor: "pointer",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          가입일시(readonly) 강제 변경 시도
        </button>
      </div>
    </div>
  );
}
