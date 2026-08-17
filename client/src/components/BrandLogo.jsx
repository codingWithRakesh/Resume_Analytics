const brandMarkClassName =
  'grid h-[48px] w-[48px] place-items-center border-[3px] border-[#111] bg-gradient-to-b from-[#f6e54a] to-[#ffd93b] shadow-[4px_4px_0_#111] text-[1.25rem] font-black tracking-[-0.08em] max-[1100px]:h-[46px] max-[1100px]:w-[46px] max-[1100px]:text-[1.1rem] max-[720px]:h-[44px] max-[720px]:w-[44px] max-[720px]:text-[1rem] max-[560px]:h-[42px] max-[560px]:w-[42px] max-[560px]:shadow-[4px_4px_0_#111]'

const titleClassName =
  'm-0 text-[clamp(1.4rem,2vw,2rem)] font-black tracking-[-0.07em] uppercase text-[#111] max-[1100px]:text-[1.2rem] max-[720px]:text-[1rem] max-[560px]:tracking-[-0.05em]'

const taglineClassName =
  'mt-1 block text-[0.88rem] font-extrabold tracking-[0.02em] uppercase text-[#111] max-[1100px]:text-[0.7rem] max-[560px]:mt-0.5 max-[560px]:text-[0.62rem]'

const headerClassName =
  'mb-2.5 flex items-center gap-2.5 max-[1100px]:mb-3.5 max-[720px]:gap-2 max-[560px]:mb-3'

const compactBrandMarkClassName =
  'grid h-[36px] w-[36px] place-items-center border-[3px] border-[#111] bg-gradient-to-b from-[#f6e54a] to-[#ffd93b] shadow-[3px_3px_0_#111] text-[1rem] font-black tracking-[-0.08em] max-[1100px]:h-[34px] max-[1100px]:w-[34px] max-[1100px]:text-[0.9rem] max-[720px]:h-[32px] max-[720px]:w-[32px] max-[720px]:text-[0.85rem] max-[560px]:h-[30px] max-[560px]:w-[30px] max-[560px]:shadow-[3px_3px_0_#111]'

const compactTitleClassName =
  'm-0 text-[clamp(1.05rem,1.55vw,1.55rem)] font-black tracking-[-0.07em] uppercase text-[#111] max-[1100px]:text-[1rem] max-[720px]:text-[0.88rem] max-[560px]:tracking-[-0.05em]'

const compactTaglineClassName =
  'mt-0.5 block text-[0.65rem] font-extrabold tracking-[0.02em] uppercase text-[#111] max-[1100px]:text-[0.6rem] max-[560px]:mt-0.5 max-[560px]:text-[0.56rem]'

const compactHeaderClassName =
  'mb-2 flex items-center gap-2 max-[1100px]:mb-2.5 max-[720px]:gap-1.5 max-[560px]:mb-2'

const profileBrandMarkClassName =
  'grid h-[31px] w-[31px] place-items-center border-[3px] border-[#111] bg-gradient-to-b from-[#f6e54a] to-[#ffd93b] shadow-[2px_2px_0_#111] text-[0.86rem] font-black tracking-[-0.08em] max-[1100px]:h-[30px] max-[1100px]:w-[30px] max-[1100px]:text-[0.8rem] max-[720px]:h-[28px] max-[720px]:w-[28px] max-[720px]:text-[0.76rem] max-[560px]:h-[28px] max-[560px]:w-[28px] max-[560px]:shadow-[2px_2px_0_#111]'

const profileTitleClassName =
  'm-0 text-[clamp(0.95rem,1.35vw,1.3rem)] font-black tracking-[-0.07em] uppercase text-[#111] max-[1100px]:text-[0.92rem] max-[720px]:text-[0.82rem] max-[560px]:tracking-[-0.05em]'

const profileTaglineClassName =
  'mt-0.5 block text-[0.58rem] font-extrabold tracking-[0.02em] uppercase text-[#111] max-[1100px]:text-[0.54rem] max-[560px]:mt-0.5 max-[560px]:text-[0.5rem]'

const profileHeaderClassName =
  'mb-1.5 flex items-center gap-1.5 max-[1100px]:mb-2 max-[720px]:gap-1.5 max-[560px]:mb-1.5'

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export default function BrandLogo({
  mark = 'AI',
  title = 'AI INTERVIEW',
  tagline = 'PRACTICE. IMPROVE. SUCCEED.',
  className,
  density = 'default',
}) {
  const isCompact = density === 'compact' || density === 'profile'
  const isProfile = density === 'profile'

  return (
    <header
      className={joinClassNames(
        isProfile ? profileHeaderClassName : isCompact ? compactHeaderClassName : headerClassName,
        className,
      )}
    >
      <div
        className={
          isProfile ? profileBrandMarkClassName : isCompact ? compactBrandMarkClassName : brandMarkClassName
        }
        aria-hidden="true"
      >
        {mark}
      </div>
      <div>
        <p className={isProfile ? profileTitleClassName : isCompact ? compactTitleClassName : titleClassName}>
          {title}
        </p>
        <span
          className={isProfile ? profileTaglineClassName : isCompact ? compactTaglineClassName : taglineClassName}
        >
          {tagline}
        </span>
      </div>
    </header>
  )
}
