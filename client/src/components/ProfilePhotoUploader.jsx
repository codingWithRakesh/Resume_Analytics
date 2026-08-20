import { Pencil, User } from 'lucide-react'
import { useId } from 'react'

export default function ProfilePhotoUploader({
  previewUrl,
  selectedFileName,
  onChange,
  className = '',
  density = 'default',
}) {
  const inputId = useId()
  const isProfile = density === 'profile'

  const handleChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      onChange?.({
        file,
        previewUrl: typeof reader.result === 'string' ? reader.result : '',
      })
    }

    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`relative z-10 flex justify-center ${
        isProfile ? 'mb-4 max-[560px]:mb-3.5' : 'mb-5 max-[560px]:mb-4'
      } ${className}`}
    >
      <div className="relative">
        <div
          className={`grid place-items-center overflow-hidden rounded-full border-[3px] border-[#111] bg-[linear-gradient(135deg,#d7d7d7,#8f8f8f)] shadow-[4px_4px_0_#111] ${
            isProfile ? 'h-[104px] w-[104px] max-[560px]:h-[88px] max-[560px]:w-[88px]' : 'h-[124px] w-[124px] max-[560px]:h-[104px] max-[560px]:w-[104px]'
          } max-[560px]:border-[2px]`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <User
              className={
                isProfile
                  ? 'h-[56px] w-[56px] text-white max-[560px]:h-[48px] max-[560px]:w-[48px]'
                  : 'h-[68px] w-[68px] text-white max-[560px]:h-[58px] max-[560px]:w-[58px]'
              }
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}
        </div>

        <label
          htmlFor={inputId}
          className={`absolute grid cursor-pointer place-items-center rounded-full border-[2px] border-white bg-[#2563eb] text-white shadow-[3px_3px_0_#111] transition-all duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_#111] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_#111] focus-within:outline-none focus-within:ring-4 focus-within:ring-black/20 ${
            isProfile ? 'bottom-[6px] right-[0px] h-8 w-8 max-[560px]:h-[26px] max-[560px]:w-[26px]' : 'bottom-[8px] right-[2px] h-9 w-9 max-[560px]:h-8 max-[560px]:w-8'
          }`}
          aria-label="Choose profile photo"
        >
          <Pencil
            size={isProfile ? 13 : 17}
            strokeWidth={2.4}
            className={isProfile ? 'relative top-[-1px] left-[1px]' : ''}
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
        <p className="sr-only" aria-live="polite">
          {selectedFileName ? `Selected profile photo: ${selectedFileName}` : 'No profile photo selected'}
        </p>
      </div>
    </div>
  )
}
