import { useEffect, useRef } from 'react'

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export default function OtpInput({
  value,
  onChange,
  onComplete,
  label = 'OTP',
  helperText = 'Enter the 6-digit code sent to your email',
  error,
  className,
}) {
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const focusInput = (index) => {
    inputRefs.current[index]?.focus()
    inputRefs.current[index]?.select?.()
  }

  const emitChange = (nextValue) => {
    onChange(nextValue)

    if (nextValue.every((digit) => digit !== '')) {
      onComplete?.(nextValue.join(''))
    }
  }

  const applyDigitsFromIndex = (startIndex, digits) => {
    if (!digits.length) {
      return
    }

    const nextValue = [...value]
    let cursor = startIndex

    for (const digit of digits) {
      if (cursor >= nextValue.length) {
        break
      }

      nextValue[cursor] = digit
      cursor += 1
    }

    emitChange(nextValue)

    const nextFocusIndex = Math.min(cursor, nextValue.length - 1)
    focusInput(nextFocusIndex)
  }

  const handleChange = (index, event) => {
    const digits = event.target.value.replace(/\D/g, '')

    if (!digits.length) {
      const nextValue = [...value]
      nextValue[index] = ''
      emitChange(nextValue)
      return
    }

    if (digits.length > 1) {
      applyDigitsFromIndex(index, digits)
      return
    }

    const nextValue = [...value]
    nextValue[index] = digits[0]
    emitChange(nextValue)

    if (index < nextValue.length - 1) {
      focusInput(index + 1)
    }
  }

  const handleKeyDown = (index, event) => {
    const { key } = event

    if (key === 'Backspace') {
      if (value[index]) {
        const nextValue = [...value]
        nextValue[index] = ''
        emitChange(nextValue)
        return
      }

      if (index > 0) {
        event.preventDefault()
        const nextIndex = index - 1
        const nextValue = [...value]
        nextValue[nextIndex] = ''
        emitChange(nextValue)
        focusInput(nextIndex)
      }

      return
    }

    if (key === 'Delete') {
      event.preventDefault()
      const nextValue = [...value]
      nextValue[index] = ''
      emitChange(nextValue)
      return
    }

    if (key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      focusInput(index - 1)
      return
    }

    if (key === 'ArrowRight' && index < value.length - 1) {
      event.preventDefault()
      focusInput(index + 1)
      return
    }

    if (key === 'Home') {
      event.preventDefault()
      focusInput(0)
      return
    }

    if (key === 'End') {
      event.preventDefault()
      focusInput(value.length - 1)
      return
    }

    if (key.length === 1 && !/\d/.test(key)) {
      event.preventDefault()
    }
  }

  const handlePaste = (index, event) => {
    event.preventDefault()
    const pastedDigits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, value.length)

    if (!pastedDigits.length) {
      return
    }

    applyDigitsFromIndex(index, pastedDigits)
  }

  return (
    <div className={joinClassNames('relative z-10', className)}>
      <p className="mb-2 text-[0.8rem] font-black tracking-[-0.04em] text-[#111] max-[560px]:mb-1.5 max-[560px]:text-[0.74rem]">
        {label}
      </p>

      <div
        className="grid grid-cols-6 gap-2 max-[560px]:gap-1.5"
        role="group"
        aria-label={label}
      >
        {value.map((digit, index) => (
          <div key={index} className="min-w-0">
            <label htmlFor={`otp-${index}`} className="sr-only">
              {label} digit {index + 1}
            </label>
            <input
              ref={(node) => {
                inputRefs.current[index] = node
              }}
              id={`otp-${index}`}
              name={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              value={digit}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={(event) => handlePaste(index, event)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'otp-error' : 'otp-helper'}
              className={joinClassNames(
                'flex h-[44px] w-full min-w-0 items-center justify-center border-[3px] border-[#111] bg-white text-center text-[1rem] font-black text-[#111] outline-none transition-all duration-150 placeholder:text-[rgba(17,17,17,0.35)] focus:-translate-x-px focus:-translate-y-px focus:shadow-[4px_4px_0_#111] focus:ring-0 max-[560px]:h-[40px] max-[560px]:border-[2px] max-[560px]:text-[0.9rem]',
                error ? 'border-[#e11d48]' : 'shadow-[3px_3px_0_#111]',
              )}
              aria-label={`${label} digit ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <p
        id="otp-helper"
        className="mt-2 text-[0.74rem] leading-[1.35] text-[#111] max-[560px]:mt-1.5 max-[560px]:text-[0.7rem]"
      >
        {helperText}
      </p>

      {error ? (
        <p
          id="otp-error"
          role="alert"
          className="mt-2 text-[0.74rem] font-bold text-[#d01445] max-[560px]:mt-1.5 max-[560px]:text-[0.7rem]"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}
