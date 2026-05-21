// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      {/* 대시보드 전용 사이드바 */}
      <aside>
        <ul>
          <li><a href="/dashboard">대시보드</a></li>
          <li><a href="/dashboard/settings">설정</a></li>
        </ul>
      </aside>
      <section>{children}</section>
    </div>
  )
}