'use client';

import React, { useState } from 'react';

export default function ReactEventsPage() {
  // --- 상태 관리 ---
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('1');
  const [submitLog, setSubmitLog] = useState('아직 제출되지 않았습니다.');

  // ==========================================
  // 1. 인풋 onChange 이벤트 (입력창)
  // React.ChangeEvent + <HTMLInputElement> (input 태그)
  // ==========================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 콘솔에서도 확인 가능
    console.log('입력 중:', e.target.value); 
  };

  // ==========================================
  // 2. select onChange 이벤트 (드롭다운)
  // React.ChangeEvent + <HTMLSelectElement> (select 태그)
  // ==========================================
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    console.log('선택 변경됨:', e.target.value);
  };

  // ==========================================
  // 3. 버튼 클릭 이벤트
  // React.MouseEvent + <HTMLButtonElement> (button 태그)
  // ==========================================
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 마우스 클릭 이벤트 객체에는 클릭된 화면의 좌표(clientX, Y) 같은 정보도 들어있습니다.
    console.log(`버튼 클릭됨! (좌표: X=${e.clientX}, Y=${e.clientY})`);
  };

  // ==========================================
  // 4. 폼 submit 이벤트
  // React.FormEvent + <HTMLFormElement> (form 태그)
  // ==========================================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ⭐️ 핵심: 브라우저가 새로고침되는 기본 동작을 막아줍니다.
    
    // 폼 제출 처리
    setSubmitLog(`✅ 제출 성공! (입력값: ${inputValue}, 선택값: 옵션 ${selectValue})`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        TypeScript React 이벤트 실습
      </h1>

      {/* 결과 확인 패널 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #c6f6d5' }}>
        <h3>실시간 상태 확인</h3>
        <p><strong>Input:</strong> {inputValue || '(비어있음)'}</p>
        <p><strong>Select:</strong> 옵션 {selectValue}</p>
        <hr style={{ margin: '10px 0', borderColor: '#c6f6d5' }} />
        <p style={{ color: '#059669', fontWeight: 'bold' }}>{submitLog}</p>
      </div>

      {/* 폼 영역 */}
      <form 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>텍스트 입력 (Input)</label>
          <input 
            type="text"
            value={inputValue}
            onChange={handleChange} 
            placeholder="아무 글자나 입력하세요"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>옵션 선택 (Select)</label>
          <select 
            value={selectValue}
            onChange={handleSelect}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="1">옵션 1 (기본)</option>
            <option value="2">옵션 2 (프리미엄)</option>
            <option value="3">옵션 3 (VIP)</option>
          </select>
        </div>

        {/* submit 타입의 버튼을 누르면 form의 onSubmit이 트리거됩니다. */}
        <button 
          type="submit" 
          onClick={handleClick}
          style={{ marginTop: '10px', padding: '12px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
        >
          폼 제출하기 (Submit)
        </button>
      </form>

      <p style={{ marginTop: '15px', fontSize: '13px', color: '#666' }}>
        * F12 개발자 도구를 열어 콘솔(Console) 탭의 출력 결과도 함께 확인하세요.
      </p>
    </div>
  );
}