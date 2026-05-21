"use client";

import React, { useState } from "react";

// ==========================================
// 1. 기본 인터페이스 (부모)
// ==========================================
interface Animal {
  name: string;
  age: number;
}

// ==========================================
// 2. 인터페이스 확장 (자식) - Animal의 속성을 모두 물려받음
// ==========================================
interface Cat extends Animal {
  breed: string; // 추가 프로퍼티
}

// ==========================================
// 3. 다중 확장 (손주) - Cat과 Animal을 모두 물려받음
// ==========================================
// 참고: Cat가 이미 Animal을 상속받았기 때문에 extends Cat만 써도 되지만,
// 콤마(,)를 통해 여러 인터페이스를 동시에 상속받을 수 있음을 보여주는 예시입니다.
interface Puppy extends Cat, Animal {
  isVaccinated: boolean;
}

export default function InterfaceExtendsPage() {
  // --- 상태 관리 ---

  // 일반 고양이 객체 (Cat 타입: name, age, breed 필수)
  const [myCat, setMyCat] = useState<Cat>({
    name: "라떼",
    age: 3,
    breed: "스코티쉬폴드",
  });

  // 어린 고양이 객체 (Puppy 타입: name, age, breed, isVaccinated 필수)
  const [myPuppy, setMyPuppy] = useState<Puppy>({
    name: "초코",
    age: 1,
    breed: "먼치킨",
    isVaccinated: false,
  });

  // --- 이벤트 핸들러 ---
  const ageUpCat = () => {
    setMyCat({ ...myCat, age: myCat.age + 1 });
  };

  const vaccinatePuppy = () => {
    setMyPuppy({ ...myPuppy, isVaccinated: true });
    alert(`${myPuppy.name}의 예방접종이 완료되었습니다!`);
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>
        TypeScript Interface 확장 (Extends) 실습
      </h1>

      {/* 1. Cat 타입 출력 영역 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f0f8ff",
          borderRadius: "8px",
        }}
      >
        <h3>🐶 일반 반려묘 (Cat 타입)</h3>
        <p>
          <em>Animal(name, age) + Cat(breed)</em>
        </p>
        <ul>
          <li>
            <strong>이름:</strong> {myCat.name}
          </li>
          <li>
            <strong>나이:</strong> {myCat.age}살
          </li>
          <li>
            <strong>묘종:</strong> {myCat.breed}
          </li>
        </ul>
        <button
          onClick={ageUpCat}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {myCat.name} 나이 +1
        </button>
      </div>

      {/* 1. Cat 타입 출력 영역 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f0f8ff",
          borderRadius: "8px",
        }}
      >
        <h3>🐶 일반 반려묘 (Cat 타입)</h3>
        <p>
          <em>Animal(name, age) + Cat(breed)</em>
        </p>
        <ul>
          <li>
            <strong>이름:</strong> {myCat.name}
          </li>
          <li>
            <strong>나이:</strong> {myCat.age}살
          </li>
          <li>
            <strong>묘종:</strong> {myCat.breed}
          </li>
        </ul>
        <button
          onClick={ageUpCat}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {myCat.name} 나이 +1
        </button>
      </div>

      {/* 2. Puppy 타입 출력 영역 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#fff5ee",
          borderRadius: "8px",
        }}
      >
        <h3>🐾 어린 고양이 (Puppy 타입)</h3>
        <p>
          <em>Cat(name, age, breed) + Puppy(isVaccinated)</em>
        </p>
        <ul>
          <li>
            <strong>이름:</strong> {myPuppy.name}
          </li>
          <li>
            <strong>나이:</strong> {myPuppy.age}살
          </li>
          <li>
            <strong>묘종:</strong> {myPuppy.breed}
          </li>
          <li>
            <strong>접종 여부:</strong>{" "}
            <span
              style={{
                color: myPuppy.isVaccinated ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {myPuppy.isVaccinated ? "완료" : "미접종"}
            </span>
          </li>
        </ul>
        <button
          onClick={vaccinatePuppy}
          disabled={myPuppy.isVaccinated}
          style={{
            padding: "8px 16px",
            cursor: myPuppy.isVaccinated ? "not-allowed" : "pointer",
            backgroundColor: myPuppy.isVaccinated ? "#ccc" : "#ff7f50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {myPuppy.isVaccinated ? "접종 완료됨" : "예방접종 맞히기"}
        </button>
      </div>
    </div>
  );
}
