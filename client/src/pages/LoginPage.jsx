import BrandLogo from '../components/BrandLogo.jsx'
import BrutalistCard from '../components/BrutalistCard.jsx'
import HeroPanel from '../components/HeroPanel.jsx'
import LoginForm from '../components/LoginForm.jsx'

const pageClassName =
  'relative min-h-screen overflow-x-hidden px-[10px] py-1 text-[#111] max-[1100px]:px-3 max-[1100px]:py-3 max-[720px]:px-3 max-[720px]:py-3 max-[560px]:px-[10px] max-[560px]:py-[10px]'

const shellClassName =
  'relative z-10 mx-auto flex w-full max-w-[960px] min-h-[calc(100vh-12px)] flex-col justify-center max-[1100px]:max-w-[820px] max-[1100px]:min-h-0'

export default function LoginPage() {
  return (
    <div className={pageClassName}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[95px] w-[95px] bg-gradient-to-b from-[#b290ff] to-[#8f6fff] shadow-[-8px_8px_0_#111] [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%,0_30%,15%_30%,15%_15%,30%_15%)] max-[720px]:h-[82px] max-[720px]:w-[82px] max-[560px]:h-[64px] max-[560px]:w-[64px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[100px] w-[100px] bg-[#111] [clip-path:polygon(0_0,100%_0,100%_38%,76%_38%,76%_62%,52%_62%,52%_86%,28%_86%,28%_100%,0_100%)] max-[720px]:h-[82px] max-[720px]:w-[82px] max-[560px]:h-[64px] max-[560px]:w-[64px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[28px] top-[150px] h-[44px] w-[44px] border-[4px] border-[#111] bg-[#ff7f93] shadow-[6px_6px_0_#111] max-[1100px]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-[210px] h-[58px] w-[58px] rounded-full border-[4px] border-[#111] bg-gradient-to-b from-[#ffe45c] to-[#ffd93b] shadow-[6px_6px_0_rgba(17,17,17,0.35)] max-[720px]:bottom-2 max-[720px]:left-[40%] max-[720px]:h-[44px] max-[720px]:w-[44px] max-[560px]:left-[42%] max-[560px]:h-[36px] max-[560px]:w-[36px]"
      />

      <main className={shellClassName}>
        <BrandLogo />

        <section
          className="grid grid-cols-[minmax(0,1fr)_460px] gap-4 max-[1100px]:grid-cols-1 max-[1100px]:gap-[18px] max-[720px]:gap-[14px] max-[720px]:mt-[9rem] max-[560px]:gap-3"
          aria-label="Login area"
        >
          <HeroPanel />

          <BrutalistCard aria-labelledby="login-title">
            <LoginForm />
          </BrutalistCard>
        </section>
      </main>
    </div>
  )
}
