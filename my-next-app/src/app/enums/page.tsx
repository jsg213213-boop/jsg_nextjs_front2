"use client";

import React from "react";

// 1. 숫자형 Enum (초기값을 안 주면 0부터 자동 증가)
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

// 2. 문자형 Enum (코드의 가독성과 디버깅을 위해 실무에서 선호됨)
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

export default function EnumsPage() {
  // 권한 체크 함수
  const checkAccess = (role: UserRole) => {
    if (role === UserRole.Admin) {
      alert("관리자님, 환영합니다! 모든 시스템 권한이 열려있습니다.");
    } else {
      alert(`${role} 계정은 일부 접근이 제한됩니다.`);
    }
  };

  const showNumericEnum = () => {
    console.log("--- 숫자형 Enum 테스트 ---");
    console.log("Direction.Up의 값:", Direction.Up); // 0
    console.log("Direction[0]의 이름:", Direction[0]); // 'Up' (역방향 조회!)
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>TypeScript Enum 실습</h1>

      {/* 숫자형 Enum 영역 */}
      <section
        style={{
          marginBottom: "30px",
          padding: "15px",
          backgroundColor: "#e7f3ff",
          borderRadius: "10px",
        }}
      >
        <h3>1. 숫자형 Enum (Direction)</h3>
        <p>기본적으로 0, 1, 2, 3 순서로 값이 할당됩니다.</p>
        <button
          onClick={showNumericEnum}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          콘솔에서 역방향 조회 확인하기 (F12)
        </button>
      </section>

      {/* 문자형 Enum 영역 */}
      <section
        style={{
          padding: "15px",
          backgroundColor: "#fff0f0",
          borderRadius: "10px",
        }}
      >
        <h3>2. 문자형 Enum (UserRole)</h3>
        <p>실제 문자열 값을 가지고 있어 디버깅 시 직관적입니다.</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => checkAccess(UserRole.Admin)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor: "#333",
              color: "#fff",
            }}
          >
            관리자로 접속
          </button>
          <button
            onClick={() => checkAccess(UserRole.User)}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            일반 유저로 접속
          </button>
        </div>
      </section>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        * 팁: 문자형 Enum을 사용할 때는 함수 인자에 {'ADMIN'} 같은 생문자열을 직접
        넣으면 에러가 납니다.
      </div>
    </div>
  );
}
