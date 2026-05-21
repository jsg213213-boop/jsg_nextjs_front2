"use client";

import React, { useState } from "react";

// ==========================================
// 1. 유니온 타입 (|) - 여러 타입 중 하나
// ==========================================
type ID = string | number;

// ==========================================
// 2. 리터럴 타입 - 특정 '값' 자체를 타입으로 지정
// ==========================================
type Direction = "left" | "right" | "up" | "down";

// ==========================================
// 3. 인터섹션 타입 (&) - 두 개 이상의 타입을 하나로 합침 (모두 만족해야 함)
// ==========================================
type Animal = { name: string };
type Flyable = { fly(): void };
type FlyingAnimal = Animal & Flyable; // name과 fly()를 모두 가져야 함

export default function AdvancedTypesPage() {
  // --- 상태 관리 ---
  const [currentId, setCurrentId] = useState<ID>("jsg0213"); // 초기값: 문자열
  const [actionLog, setActionLog] = useState<string>("");

  // --- 이벤트 핸들러 ---

  // 리터럴 타입 테스트 함수
  const move = (dir: Direction) => {
    setActionLog(`${dir} 방향으로 이동했습니다.`);
  };

  // 인터섹션 타입 객체 생성
  const eagle: FlyingAnimal = {
    name: "독수리",
    fly() {
      alert(`${this.name}가 힘차게 날아오릅니다! 🦅`);
    },
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h1>TypeScript 고급 타입 실습</h1>

      {/* 1. 유니온 타입 영역 */}
      <section
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#eef2ff",
          borderRadius: "8px",
        }}
      >
        <h3>1. 유니온 타입 (string | number)</h3>
        <p>
          현재 ID 값: <strong>{currentId}</strong> (타입: {typeof currentId})
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setCurrentId("user_jsg0213")}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            문자열 ID로 변경
          </button>
          <button
            onClick={() => setCurrentId(42)}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            숫자 ID로 변경
          </button>
        </div>
      </section>

      {/* 2. 리터럴 타입 영역 */}
      <section
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#fffbe1",
          borderRadius: "8px",
        }}
      >
        <h3>2. 리터럴 타입 ({'left'} | {'right'} | {'up'} | {'down'})</h3>
        <p>허용된 특정 문자열 값만 인자로 넘길 수 있습니다.</p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            onClick={() => move("left")}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            ⬅️ Left
          </button>
          <button
            onClick={() => move("right")}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            ➡️ Right
          </button>
          <button
            onClick={() => move("up")}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            ⬆️ Up
          </button>
          <button
            onClick={() => move("down")}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            ⬇️ Down
          </button>
        </div>
        {actionLog && (
          <p style={{ color: "blue", fontWeight: "bold" }}>결과: {actionLog}</p>
        )}
      </section>

      {/* 3. 인터섹션 타입 영역 */}
      <section
        style={{
          padding: "15px",
          backgroundColor: "#f0fdf4",
          borderRadius: "8px",
        }}
      >
        <h3>3. 인터섹션 타입 (Animal & Flyable)</h3>
        <p>
          객체는 <strong>이름(name)</strong>과 <strong>나는 기능(fly)</strong>을
          모두 가져야 합니다.
        </p>
        <button
          onClick={() => eagle.fly()}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {eagle.name} 날리기
        </button>
      </section>
    </div>
  );
}
