import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'

const wrapperClassName = 'mb-[11px] max-[560px]:mb-2.5'

const labelClassName =
  'mb-[5px] block text-[0.94rem] font-black max-[720px]:text-[0.88rem] max-[560px]:mb-1 max-[560px]:text-[0.82rem]'

const shellBaseClassName =
  'flex min-h-[48px] items-center gap-2.5 border-[3px] border-[#111] bg-white px-[9px] shadow-[3px_3px_0_rgba(17,17,17,0.1)] transition-all duration-150 focus-within:-translate-x-px focus-within:-translate-y-px focus-within:shadow-[5px_5px_0_rgba(17,17,17,0.18)] max-[720px]:min-h-[50px] max-[560px]:min-h-[46px] max-[560px]:border-[2px] max-[560px]:px-[9px]'

const inputBaseClassName =
  'w-full min-w-0 border-0 bg-transparent pr-2 text-[0.94rem] text-[#111] outline-none placeholder:text-[rgba(17,17,17,0.45)] max-[560px]:pr-1 max-[560px]:text-[0.86rem]'

const errorClassName =
  'mt-[6px] text-[0.84rem] font-bold text-[#d01445] max-[560px]:mt-1 max-[560px]:text-[0.78rem]'

const compactWrapperClassName = 'mb-[8px] max-[560px]:mb-2'

const compactLabelClassName =
  'mb-[4px] block text-[0.78rem] font-black max-[720px]:text-[0.74rem] max-[560px]:mb-1 max-[560px]:text-[0.7rem]'

const compactShellBaseClassName =
  'flex min-h-[40px] items-center gap-2 border-[3px] border-[#111] bg-white px-[8px] shadow-[2px_2px_0_rgba(17,17,17,0.1)] transition-all duration-150 focus-within:-translate-x-px focus-within:-translate-y-px focus-within:shadow-[4px_4px_0_rgba(17,17,17,0.16)] max-[720px]:min-h-[42px] max-[560px]:min-h-[40px] max-[560px]:border-[2px] max-[560px]:px-[8px]'

const compactInputBaseClassName =
  'w-full min-w-0 border-0 bg-transparent pr-2 text-[0.78rem] text-[#111] outline-none placeholder:text-[rgba(17,17,17,0.45)] max-[560px]:pr-1 max-[560px]:text-[0.74rem]'

const compactErrorClassName =
  'mt-[5px] text-[0.72rem] font-bold text-[#d01445] max-[560px]:mt-1 max-[560px]:text-[0.68rem]'

const profileWrapperClassName = 'mb-[6px] max-[560px]:mb-1.5'

const profileLabelClassName =
  'mb-[3px] block text-[0.72rem] font-black max-[720px]:text-[0.68rem] max-[560px]:mb-1 max-[560px]:text-[0.65rem]'

const profileShellBaseClassName =
  'flex min-h-[36px] items-center gap-2 border-[3px] border-[#111] bg-white px-[7px] shadow-[2px_2px_0_rgba(17,17,17,0.1)] transition-all duration-150 focus-within:-translate-x-px focus-within:-translate-y-px focus-within:shadow-[4px_4px_0_rgba(17,17,17,0.16)] max-[720px]:min-h-[38px] max-[560px]:min-h-[36px] max-[560px]:border-[2px] max-[560px]:px-[7px]'

const profileInputBaseClassName =
  'w-full min-w-0 border-0 bg-transparent pr-2 text-[0.72rem] text-[#111] outline-none placeholder:text-[rgba(17,17,17,0.45)] max-[560px]:pr-1 max-[560px]:text-[0.68rem]'

const profileErrorClassName =
  'mt-[4px] text-[0.68rem] font-bold text-[#d01445] max-[560px]:mt-1 max-[560px]:text-[0.64rem]'

const toggleButtonClassName =
  'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-transparent text-[#111] transition-all duration-150 hover:bg-black/5 active:translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/20 max-[720px]:h-8 max-[720px]:w-8 max-[560px]:h-[30px] max-[560px]:w-[30px]'

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export default function PasswordField({
  id,
  name,
  label = 'Password',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required,
  disabled,
  autoComplete,
  className,
  inputClassName,
  labelClassName: labelClassNameProp,
  density = 'default',
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isCompact = density === 'compact' || density === 'profile'
  const describedBy = []

  if (error) {
    describedBy.push(`${id}-error`)
  }

  if (helperText) {
    describedBy.push(`${id}-helper`)
  }

  return (
    <div
      className={
        density === 'profile'
          ? profileWrapperClassName
          : isCompact
            ? compactWrapperClassName
            : wrapperClassName
      }
    >
      <label
        htmlFor={id}
        className={joinClassNames(
          density === 'profile'
            ? profileLabelClassName
            : isCompact
              ? compactLabelClassName
              : labelClassName,
          labelClassNameProp,
        )}
      >
        {label}
      </label>
      <div
        className={joinClassNames(
          density === 'profile'
            ? profileShellBaseClassName
            : isCompact
              ? compactShellBaseClassName
              : shellBaseClassName,
          className,
          error ? 'border-[#e11d48]' : 'border-[#111]',
        )}
      >
        <Lock
          className="h-5 w-5 shrink-0 text-[#111] max-[560px]:h-[17px] max-[560px]:w-[17px]"
          aria-hidden="true"
        />
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy.length > 0 ? describedBy.join(' ') : undefined}
          className={joinClassNames(
            density === 'profile'
              ? profileInputBaseClassName
              : isCompact
                ? compactInputBaseClassName
                : inputBaseClassName,
            inputClassName,
          )}
        />
        <button
          type="button"
          className={toggleButtonClassName}
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
        >
          {showPassword ? (
            <EyeOff size={22} aria-hidden="true" />
          ) : (
            <Eye size={22} aria-hidden="true" />
          )}
        </button>
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          className={
            density === 'profile'
              ? profileErrorClassName
              : isCompact
                ? compactErrorClassName
                : errorClassName
          }
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={`${id}-helper`}
          className={
            density === 'profile'
              ? profileErrorClassName
              : isCompact
                ? compactErrorClassName
                : errorClassName
          }
        >
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
