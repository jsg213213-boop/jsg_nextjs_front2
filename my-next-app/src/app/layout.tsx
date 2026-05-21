// app/layout.tsx
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* 모든 페이지에 공통으로 보이는 네비게이션 */}
        <nav>
          <Link href="/">홈</Link>
          &nbsp;&nbsp;
          <Link href="/about">소개</Link>
          &nbsp;&nbsp;
          {/* 새롭게 추가된 링크 */}
          <Link href="/dashboard">대시보드</Link>
          &nbsp;&nbsp;
          <Link href="/dashboard/settings">설정</Link>
          &nbsp;&nbsp;
          <Link href="/primitive-types">기본 원시 타입 문법</Link>
          &nbsp;&nbsp;
          <Link href="/arrays-tuples">배열과 튜플</Link>
           &nbsp;&nbsp;
          <Link href="/enums">Enum</Link>
          &nbsp;&nbsp;
          <Link href="/advanced-types">고급 타입</Link>
          &nbsp;&nbsp;
          <Link href="/interfaces">Interface</Link>
          &nbsp;&nbsp;
          <Link href="/interface-extends">Interface Extends</Link>
          &nbsp;&nbsp;
          <Link href="/type-aliases">Type Alias</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
