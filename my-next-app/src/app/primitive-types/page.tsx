"use client"; // 버튼 클릭 등 브라우저 이벤트를 사용하기 위해 추가

import React, { useEffect } from "react";

export default function PrimitiveTypesPage() {
  // 1. 기본 원시 타입
  const name: string = "정성규";
  const age: number = 35;
  const isActive: boolean = true;

  // 2. null 과 undefined
  // 초기값은 null/undefined 이지만, 나중에 문자열이 들어올 수 있음을 명시
  const nickname: string | null = null;
  const address: string | undefined = undefined;

  // 3. any (사용 자제!)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let anything: any = "처음엔 문자열";
  anything = 123; // 숫자로 바꿔도 TS가 에러를 내지 않음 (타입 검사 무력화)

  // 4. unknown (any의 안전한 대안)
  // 임의의 데이터를 반환하는 상황을 가정
  const getUnknownData = (): unknown => "hello typescript";

  useEffect(() => {
    // unknown 타입은 사용하기 전에 반드시 '타입 검사(타입 좁히기)'를 해야 합니다.
    const data: unknown = getUnknownData();

    // data.toUpperCase() // ❌ 이 주석을 풀면 VS Code에서 에러 발생! (data가 문자열인지 아직 모르기 때문)

    if (typeof data === "string") {
      console.log("unknown 테스트:", data.toUpperCase()); // ✅ 문자열임이 확인되어 정상 작동
    }
  }, []);

  // 5. void (반환값이 없는 함수)
  const logMessage = (msg: string): void => {
    console.log("[시스템 메시지]:", msg);
    // return '완료'; // ❌ 이 주석을 풀면 void 타입에 어긋나서 에러 발생!
  };

  // 6. never (절대 끝까지 실행되지 않는 함수 - 주로 에러 던질 때 사용)
  const throwError = (msg: string): never => {
    throw new Error(msg);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>TypeScript 원시 타입 실습</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <h3>화면에 출력된 기본 타입들</h3>
        <p>
          <strong>이름 (string):</strong> {name}
        </p>
        <p>
          <strong>나이 (number):</strong> {age}
        </p>
        <p>
          <strong>활성 상태 (boolean):</strong>{" "}
          {isActive ? "활성화됨" : "비활성화"}
        </p>
        <p>
          <strong>닉네임 (string | null):</strong>{" "}
          {nickname === null ? "설정되지 않음(null)" : nickname}
        </p>
        <p>
          <strong>주소 (string | undefined):</strong>{" "}
          {address === undefined ? "입력되지 않음(undefined)" : address}
        </p>
        <p>
          <strong>Any 타입 변수:</strong> {anything} (현재 숫자형)
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => logMessage("버튼이 클릭되었습니다!")}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Void 함수 실행 (콘솔 확인)
        </button>

        <button
          onClick={() => throwError("의도적으로 발생시킨 에러입니다!")}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
          }}
        >
          Never 함수 실행 (에러 발생)
        </button>
      </div>
    </div>
  );
}
