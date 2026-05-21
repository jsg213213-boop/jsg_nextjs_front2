'use client';

import React, { useState } from 'react';

// ==========================================
// 1. Props 인터페이스 정의 (컴포넌트의 사용 설명서)
// ==========================================
interface ButtonProps {
  label: string;                 // 필수: 버튼에 표시될 텍스트
  onClick: () => void;           // 필수: 클릭 시 실행될 함수
  disabled?: boolean;            // 선택: 비활성화 여부
  variant?: 'primary' | 'secondary' | 'danger'; // 선택: 버튼 색상 테마 (리터럴 타입)
  size?: 'sm' | 'md' | 'lg';     // 선택: 버튼 크기 (리터럴 타입)
}

// ==========================================
// 2. 자식 컴포넌트 (Button)
// ==========================================
// 구조 분해 할당을 하며 선택적 Props에 '기본값(Default)'을 부여합니다.
function Button({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
}: ButtonProps) {
  
  // 실습을 위해 CSS 클래스 대신 직관적인 인라인 스타일 객체를 생성합니다.
  const sizeStyle = {
    padding: size === 'sm' ? '6px 12px' : size === 'lg' ? '14px 28px' : '10px 20px',
    fontSize: size === 'sm' ? '12px' : size === 'lg' ? '18px' : '14px',
  };

  const variantStyle = {
    backgroundColor: variant === 'primary' ? '#3b82f6' : variant === 'secondary' ? '#6b7280' : '#ef4444',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizeStyle,
        ...variantStyle,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: '0.2s',
      }}
    >
      {label}
    </button>
  );
}

// ==========================================
// 3. 부모 컴포넌트 (메인 페이지)
// ==========================================
export default function ComponentPropsPage() {
  const [log, setLog] = useState<string>('버튼을 클릭해 보세요.');

  const handleSave = () => setLog('✅ 저장되었습니다!');
  const handleDelete = () => setLog('🚨 삭제되었습니다!');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript 컴포넌트 Props 실습
      </h1>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>상태 로그: <span style={{ color: '#0070f3' }}>{log}</span></h3>
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Case 1: 필수 Props만 전달 (나머지는 기본값 primary, md로 동작) */}
        <div>
          <h4>1. 기본 버튼 (필수 Props만 사용)</h4>
          <Button label="기본 저장" onClick={handleSave} />
        </div>

        {/* Case 2: 다양한 선택적 Props 조합 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <h4>2. 크기 및 테마 변경</h4>
          <Button label="취소" onClick={() => setLog('취소됨')} variant="secondary" size="sm" />
          <Button label="위험한 삭제" onClick={handleDelete} variant="danger" size="lg" />
        </div>

        {/* Case 3: 비활성화 상태 */}
        <div>
          <h4>3. 비활성화 버튼 (disabled)</h4>
          <Button 
            label="클릭 불가" 
            onClick={() => setLog('이 메시지는 보이지 않아야 합니다.')} 
            variant="secondary" 
            disabled={true} 
          />
        </div>

      </section>
    </div>
  );
}