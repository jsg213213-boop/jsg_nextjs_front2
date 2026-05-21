'use client';

import React, { useState } from 'react';

// ==========================================
// 1. 제네릭 제약 (Generic Constraints) 함수
// ==========================================
// <T extends { id: number }> : "T는 무슨 타입이든 상관없지만, 반드시 숫자형 id 프로퍼티를 가지고 있어야 해!"
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  // 만약 extends 조건이 없었다면, T에 id가 있는지 없는지 TypeScript가 확신할 수 없어서 
  // item.id 부분에서 빨간 줄(에러)을 발생시킵니다.
  return items.find((item) => item.id === id);
}

// ==========================================
// 2. 검색에 사용할 데이터 모델(타입)과 임시 데이터
// ==========================================
interface User {
  id: number;
  name: string;
  role: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

const users: User[] = [
  { id: 1, name: '정성규', role: '수강생' },
  { id: 2, name: '김지연', role: '수강생' },
];

const products: Product[] = [
  { id: 101, title: '기계식 키보드', price: 150000 },
  { id: 102, title: '무선 마우스', price: 80000 },
];

export default function GenericConstraintsPage() {
  // --- 상태 관리 ---
  const [foundUser, setFoundUser] = useState<User | undefined>(undefined);
  const [foundProduct, setFoundProduct] = useState<Product | undefined>(undefined);

  // --- 이벤트 핸들러 ---
  const handleSearchUser = (searchId: number) => {
    // T가 User 타입으로 자동 추론됨 (User는 id가 있으므로 조건 통과 ✅)
    const result = findById(users, searchId);
    setFoundUser(result);
  };

  const handleSearchProduct = (searchId: number) => {
    // T가 Product 타입으로 자동 추론됨 (Product도 id가 있으므로 조건 통과 ✅)
    const result = findById(products, searchId);
    setFoundProduct(result);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript 제네릭 제약 (extends) 실습
      </h1>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>만능 검색 함수: findById()</h3>
        <p>어떤 배열이 들어오든 <code>id</code> 값만 있다면 모두 검색할 수 있습니다.</p>
      </div>

      {/* 1. 유저 검색 영역 */}
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
        <h3>1. 유저 목록에서 검색 (User 타입)</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => handleSearchUser(1)} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
            ID 1번 유저 검색
          </button>
          <button onClick={() => handleSearchUser(99)} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#9ca3af', color: 'white', border: 'none', borderRadius: '4px' }}>
            없는 ID(99번) 검색
          </button>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
          {foundUser ? (
            <p>✅ 찾았습니다: <strong>{foundUser.name}</strong> ({foundUser.role})</p>
          ) : (
            <p style={{ color: '#888' }}>검색 결과가 없습니다.</p>
          )}
        </div>
      </section>

      {/* 2. 상품 검색 영역 */}
      <section style={{ padding: '15px', backgroundColor: '#fffbe1', borderRadius: '8px' }}>
        <h3>2. 상품 목록에서 검색 (Product 타입)</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => handleSearchProduct(102)} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px' }}>
            ID 102번 상품 검색
          </button>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
          {foundProduct ? (
            <p>✅ 찾았습니다: <strong>{foundProduct.title}</strong> ({foundProduct.price.toLocaleString()}원)</p>
          ) : (
            <p style={{ color: '#888' }}>검색 결과가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}