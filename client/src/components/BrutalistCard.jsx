const cardFrameClassName =
  'relative border-[3px] border-[#111] shadow-[8px_8px_0_#111] max-[720px]:shadow-[7px_7px_0_#111] max-[560px]:shadow-[6px_6px_0_#111]'

const cardBaseClassName =
  'relative flex h-full min-h-0 flex-col bg-gradient-to-b from-[#fffefb] to-[#fbf8f2] p-4 shadow-[8px_8px_0_#111] max-[1100px]:p-5 max-[720px]:w-full max-[720px]:p-5 max-[560px]:p-4 max-[560px]:shadow-[6px_6px_0_#111]'

const compactCardFrameClassName =
  'relative border-[3px] border-[#111] shadow-[6px_6px_0_#111] max-[720px]:shadow-[5px_5px_0_#111] max-[560px]:shadow-[4px_4px_0_#111]'

const compactCardBaseClassName =
  'relative flex h-full min-h-0 flex-col bg-gradient-to-b from-[#fffefb] to-[#fbf8f2] p-3 shadow-[6px_6px_0_#111] max-[1100px]:p-4 max-[720px]:w-full max-[720px]:p-4 max-[560px]:p-3 max-[560px]:shadow-[4px_4px_0_#111]'

const profileCardFrameClassName =
  'relative border-[3px] border-[#111] shadow-[5px_5px_0_#111] max-[720px]:shadow-[4px_4px_0_#111] max-[560px]:shadow-[3px_3px_0_#111]'

const profileCardBaseClassName =
  'relative flex h-full min-h-0 flex-col bg-gradient-to-b from-[#fffefb] to-[#fbf8f2] p-2.5 shadow-[5px_5px_0_#111] max-[1100px]:p-3 max-[720px]:w-full max-[720px]:p-3 max-[560px]:p-2.5 max-[560px]:shadow-[3px_3px_0_#111]'

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export default function BrutalistCard({ className, children, density = 'default', ...props }) {
  const isCompact = density === 'compact' || density === 'profile'

  return (
    <section
      className={joinClassNames(
        density === 'profile'
          ? profileCardFrameClassName
          : isCompact
            ? compactCardFrameClassName
            : cardFrameClassName,
        density === 'profile'
          ? profileCardBaseClassName
          : isCompact
            ? compactCardBaseClassName
            : cardBaseClassName,
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
