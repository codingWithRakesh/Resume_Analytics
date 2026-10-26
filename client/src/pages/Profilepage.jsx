import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ============================================================================
   ProfilePage.jsx  –  "My Profile" page (React + Tailwind, single file)

   • Renders ONLY the main-content area. Do not render your sidebar here.
     Mount it in your router:  <Route path="/profile" element={<ProfilePage />} />
     (inside the same layout/outlet where your other pages appear)
   • Zero dependencies besides React + Tailwind (icons are inline SVG).
   • Backend later: replace the bodies of `profileApi.*` below. Nothing else changes.
   ========================================================================== */

/* ----------------------------------------------------------------------------
   1. API LAYER  (mock now – swap for real fetch calls later)
   -------------------------------------------------------------------------- */
const API_BASE = "/api/profile"; // <- change when your backend exists
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_PROFILE = {
  fullName: "Nilayesh Adhikari",
  email: "nilayesh.adhikari@example.com",
  gender: "Male",
  mobile: "+91 98765 43210",
  dob: "2000-03-15", // ISO yyyy-mm-dd
  bio: "Passionate about technology and continuous learning. Actively preparing for opportunities to grow my career in software development.",
  avatarUrl: "", // e.g. "/images/nilayesh.jpg" – empty shows the default avatar
};

export const profileApi = {
  /** GET /api/profile */
  async getProfile() {
    // const res = await fetch(API_BASE, { credentials: "include" });
    // if (!res.ok) throw new Error("Could not load profile");
    // return res.json();
    await wait(400);
    return { ...MOCK_PROFILE };
  },

  /** PUT /api/profile  – body: { fullName, email, gender, mobile, dob, bio } */
  async updateProfile(data) {
    // const res = await fetch(API_BASE, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   credentials: "include",
    //   body: JSON.stringify(data),
    // });
    // if (!res.ok) throw new Error("Could not save profile");
    // return res.json();
    await wait(600);
    Object.assign(MOCK_PROFILE, data);
    return { ...MOCK_PROFILE };
  },

  /** POST /api/profile/avatar  – multipart field "avatar" -> { avatarUrl } */
  async updateProfilePicture(file) {
    // const body = new FormData();
    // body.append("avatar", file);
    // const res = await fetch(`${API_BASE}/avatar`, { method: "POST", credentials: "include", body });
    // if (!res.ok) throw new Error("Could not upload picture");
    // return res.json();
    await wait(600);
    const avatarUrl = URL.createObjectURL(file);
    MOCK_PROFILE.avatarUrl = avatarUrl;
    return { avatarUrl };
  },

  /** DELETE /api/profile/avatar */
  async removeProfilePicture() {
    // await fetch(`${API_BASE}/avatar`, { method: "DELETE", credentials: "include" });
    await wait(400);
    MOCK_PROFILE.avatarUrl = "";
    return { avatarUrl: "" };
  },
};

/* ----------------------------------------------------------------------------
   2. HELPERS
   -------------------------------------------------------------------------- */
const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const BIO_MAX = 300;
const AVATAR_MAX_MB = 5;

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const todayISO = () => new Date().toISOString().split("T")[0];

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!values.gender) errors.gender = "Select your gender.";
  const digits = values.mobile.replace(/\D/g, "");
  if (!values.mobile.trim()) errors.mobile = "Enter your mobile number.";
  else if (digits.length < 7 || digits.length > 15 || !/^[+\d\s()-]+$/.test(values.mobile))
    errors.mobile = "Enter a valid mobile number.";
  if (!values.dob) errors.dob = "Select your date of birth.";
  else if (values.dob > todayISO()) errors.dob = "Date of birth can't be in the future.";
  if (values.bio.length > BIO_MAX) errors.bio = `Bio can be up to ${BIO_MAX} characters.`;
  return errors;
}

/* ----------------------------------------------------------------------------
   3. ICONS (inline SVG, no library needed)
   -------------------------------------------------------------------------- */
const ICONS = {
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  mars: (
    <>
      <path d="M16 3h5v5" />
      <path d="m21 3-6.75 6.75" />
      <circle cx="10" cy="14" r="6" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  calendar: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  file: (
    <>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  pencil: (
    <>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
};

function Icon({ name, className = "h-6 w-6", strokeWidth = 2 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ----------------------------------------------------------------------------
   4. SMALL SHARED PIECES
   -------------------------------------------------------------------------- */
const TONES = {
  purple: "bg-[#8F72F7]",
  yellow: "bg-[#FFE74A]",
  green: "bg-[#6DE5A6]",
};

function Avatar({ src, name, className = "", textClass = "text-xl" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#A48CF6] font-extrabold text-black ${className}`}
    >
      {src ? (
        <img src={src} alt={`${name} profile`} className="h-full w-full object-cover" />
      ) : (
        <span className={textClass} aria-label={`${name} initials`}>
          {getInitials(name) || <Icon name="user" className="h-1/2 w-1/2" />}
        </span>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
   5. ProfileAvatarCard  (left lavender card)
   -------------------------------------------------------------------------- */
function ProfileAvatarCard({ name, email, src, disabled, onSelectFile, onRemove }) {
  const fileRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const openPicker = () => {
    setMenuOpen(false);
    fileRef.current?.click();
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) onSelectFile(file);
    e.target.value = ""; // allows picking the same file again
  };

  return (
    <section
      aria-label="Profile picture"
      className="relative flex flex-col items-center border-2 border-black bg-[#B9A7FB] px-6 pb-12 pt-16 shadow-[8px_8px_0_0_#000] sm:pt-[90px]"
    >
      {/* three-dot menu */}
      <div ref={menuRef} className="absolute right-5 top-4">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Picture options"
          className="flex h-8 w-12 items-center justify-center"
        >
          <svg viewBox="0 0 30 8" className="h-2 w-7" aria-hidden="true">
            <circle cx="4" cy="4" r="4" />
            <circle cx="15" cy="4" r="4" />
            <circle cx="26" cy="4" r="4" />
          </svg>
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-9 z-20 w-44 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]"
          >
            <button
              type="button"
              role="menuitem"
              onClick={openPicker}
              disabled={disabled}
              className="block w-full px-4 py-2.5 text-left text-sm font-bold hover:bg-[#FFE74A] disabled:opacity-50"
            >
              Change picture
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onRemove();
              }}
              disabled={disabled || !src}
              className="block w-full border-t-2 border-black px-4 py-2.5 text-left text-sm font-bold hover:bg-[#FFE74A] disabled:opacity-40 disabled:hover:bg-white"
            >
              Remove picture
            </button>
          </div>
        )}
      </div>

      {/* avatar + camera */}
      <div className="relative h-52 w-52 sm:h-[270px] sm:w-[270px]">
        <Avatar
          src={src}
          name={name}
          className="h-full w-full border-[3px] border-[#6D4FF0]"
          textClass="text-7xl sm:text-8xl"
        />
        <button
          type="button"
          onClick={openPicker}
          disabled={disabled}
          aria-label="Upload profile picture"
          className="absolute left-[85.5%] top-[85.5%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#CFC3FC] bg-[#7C5CFF] text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-60 sm:h-[62px] sm:w-[62px]"
        >
          <Icon name="camera" className="h-7 w-7" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      <h2 className="mt-7 break-words text-center text-3xl font-extrabold leading-tight sm:text-[40px]">
        {name}
      </h2>
      <p className="mt-2 break-all text-center text-base text-black/70 sm:text-2xl">{email}</p>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   6. ProfileForm  (right white card with the six fields)
   -------------------------------------------------------------------------- */
function FieldRow({ id, label, icon, tone, error, editing, top = false, trailing, children }) {
  return (
    <div>
      <div
        className={`flex min-h-[77px] border-2 border-black bg-white transition-shadow ${
          editing ? "shadow-[4px_4px_0_0_#000] focus-within:bg-[#F4F0FF]" : ""
        }`}
      >
        <div
          className={`flex w-[68px] shrink-0 items-center justify-center border-r-2 border-black sm:w-[76px] ${TONES[tone]} ${
            top ? "h-[76px] self-start border-b-2" : ""
          }`}
        >
          <Icon name={icon} className="h-8 w-8" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <label htmlFor={id} className="block text-[15px] leading-tight text-black/80">
              {label}
            </label>
            {children}
          </div>
          {trailing}
        </div>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-bold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const INPUT_CLS =
  "block w-full bg-transparent text-lg font-semibold leading-snug text-black outline-none placeholder:font-normal placeholder:text-black/35 read-only:cursor-default sm:text-[22px]";

function ProfileForm({ values, errors, isEditing, onChange }) {
  const dateRef = useRef(null);
  const bioRef = useRef(null);

  // grow the bio textarea with its content
  useLayoutEffect(() => {
    const el = bioRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [values.bio, isEditing]);

  const common = (field) => ({
    id: field,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const openDatePicker = () => {
    if (!isEditing) return;
    try {
      dateRef.current?.showPicker();
    } catch {
      dateRef.current?.focus();
    }
  };

  return (
    <section
      aria-label="Personal information"
      className="flex flex-col gap-3 border-2 border-black bg-white p-4 shadow-[8px_8px_0_0_#000] sm:p-[34px]"
    >
      <FieldRow id="fullName" label="Full Name" icon="user" tone="purple" error={errors.fullName} editing={isEditing}>
        <input
          {...common("fullName")}
          type="text"
          name="name"
          autoComplete="name"
          value={values.fullName}
          readOnly={!isEditing}
          tabIndex={isEditing ? 0 : -1}
          onChange={(e) => onChange("fullName", e.target.value)}
          className={INPUT_CLS}
        />
      </FieldRow>

      <FieldRow id="email" label="Email" icon="mail" tone="yellow" error={errors.email} editing={isEditing}>
        <input
          {...common("email")}
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          readOnly={!isEditing}
          tabIndex={isEditing ? 0 : -1}
          onChange={(e) => onChange("email", e.target.value)}
          className={INPUT_CLS}
        />
      </FieldRow>

      <FieldRow
        id="gender"
        label="Gender"
        icon="mars"
        tone="green"
        error={errors.gender}
        editing={isEditing}
        trailing={<Icon name="chevron" className="h-7 w-7 shrink-0" strokeWidth={2.5} />}
      >
        <select
          {...common("gender")}
          name="gender"
          value={values.gender}
          disabled={!isEditing}
          onChange={(e) => onChange("gender", e.target.value)}
          className={`${INPUT_CLS} cursor-pointer appearance-none disabled:cursor-default disabled:opacity-100 disabled:[-webkit-text-fill-color:#000]`}
        >
          {GENDER_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </FieldRow>

      <FieldRow id="mobile" label="Mobile Number" icon="phone" tone="purple" error={errors.mobile} editing={isEditing}>
        <input
          {...common("mobile")}
          type="tel"
          inputMode="tel"
          name="tel"
          autoComplete="tel"
          value={values.mobile}
          readOnly={!isEditing}
          tabIndex={isEditing ? 0 : -1}
          onChange={(e) => onChange("mobile", e.target.value)}
          className={INPUT_CLS}
        />
      </FieldRow>

      <FieldRow
        id="dob"
        label="Date of Birth"
        icon="calendar"
        tone="yellow"
        error={errors.dob}
        editing={isEditing}
        trailing={
          <button
            type="button"
            onClick={openDatePicker}
            tabIndex={isEditing ? 0 : -1}
            aria-label="Open calendar"
            className={`shrink-0 ${isEditing ? "cursor-pointer" : "cursor-default"}`}
          >
            <Icon name="calendar" className="h-7 w-7" />
          </button>
        }
      >
        <input
          {...common("dob")}
          ref={dateRef}
          type={isEditing ? "date" : "text"}
          name="bday"
          max={todayISO()}
          value={isEditing ? values.dob : formatDate(values.dob)}
          readOnly={!isEditing}
          tabIndex={isEditing ? 0 : -1}
          onChange={(e) => onChange("dob", e.target.value)}
          className={`${INPUT_CLS} [&::-webkit-calendar-picker-indicator]:hidden`}
        />
      </FieldRow>

      <FieldRow id="bio" label="Bio" icon="file" tone="green" error={errors.bio} editing={isEditing} top>
        <textarea
          {...common("bio")}
          ref={bioRef}
          name="bio"
          rows={3}
          maxLength={BIO_MAX}
          value={values.bio}
          readOnly={!isEditing}
          tabIndex={isEditing ? 0 : -1}
          placeholder="Tell us a little about yourself"
          onChange={(e) => onChange("bio", e.target.value)}
          className={`${INPUT_CLS} resize-none overflow-hidden font-normal leading-7 sm:text-xl sm:leading-7`}
        />
        <p className="mt-1 text-right text-xs text-black/60" aria-live="polite">
          {values.bio.length}/{BIO_MAX}
        </p>
      </FieldRow>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   7. ProfileActions  (Edit / Cancel / Save)
   -------------------------------------------------------------------------- */
const BTN =
  "inline-flex items-center justify-center gap-3 border-2 border-black px-7 py-3.5 text-lg font-extrabold text-black shadow-[5px_5px_0_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:pointer-events-none disabled:opacity-60 sm:px-9 sm:text-xl";

function ProfileActions({ isEditing, isSaving, onEdit, onCancel }) {
  return (
    <div className="mt-8 flex flex-wrap justify-end gap-4 sm:mt-9">
      {isEditing ? (
        <>
          <button key="cancel" type="button" onClick={onCancel} disabled={isSaving} className={`${BTN} bg-white`}>
            <Icon name="close" className="h-6 w-6" strokeWidth={2.5} />
            Cancel
          </button>
          <button key="save" type="submit" disabled={isSaving} className={`${BTN} bg-[#6DE5A6]`}>
            {isSaving ? <Spinner /> : <Icon name="check" className="h-6 w-6" strokeWidth={2.5} />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </>
      ) : (
        <button key="edit" type="button" onClick={onEdit} className={`${BTN} bg-[#7C5CFF]`}>
          <Icon name="pencil" className="h-6 w-6" />
          Edit Profile
        </button>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
   8. DECORATIONS (dot grid + stairs from the reference, desktop only)
   -------------------------------------------------------------------------- */
function Decorations() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[340px] top-[98px] hidden h-[75px] w-[120px] bg-[radial-gradient(circle,#000_1.8px,transparent_2.2px)] [background-size:19px_19px] xl:block"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 210 98"
        className="pointer-events-none absolute right-0 top-[88px] hidden h-[98px] w-[210px] xl:block"
      >
        <rect x="93" y="0" width="117" height="98" fill="#7C5CFF" />
        <rect x="70" y="0" width="23" height="87" fill="#000" />
        <rect x="47" y="25" width="23" height="62" fill="#000" />
        <rect x="23" y="50" width="24" height="37" fill="#000" />
        <rect x="0" y="72" width="23" height="15" fill="#000" />
      </svg>
    </>
  );
}

/* ----------------------------------------------------------------------------
   9. ProfilePage  (state + handlers; the only default export)

   The page title, subtitle, bell and user chip come from the existing fixed
   <Navbar />, so they are intentionally NOT rendered here. The top padding
   below only leaves room for that navbar.
   -------------------------------------------------------------------------- */
export default function ProfilePage() {
  const [profile, setProfile] = useState(null); // last saved data
  const [draft, setDraft] = useState(null); // data being edited
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(""); // blob: url of picked image
  const [avatarFile, setAvatarFile] = useState(null); // File to upload on save
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const [toast, setToast] = useState(null); // { type: "success" | "error", message }

  /* fetch profile on mount */
  useEffect(() => {
    let cancelled = false;
    profileApi
      .getProfile()
      .then((data) => !cancelled && setProfile(data))
      .catch((err) => !cancelled && setLoadError(err.message || "Could not load your profile."));
    return () => {
      cancelled = true;
    };
  }, []);

  /* free the blob URL when it is replaced or the page unmounts */
  useEffect(
    () => () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    },
    [avatarPreview]
  );

  /* auto-hide toast */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  if (loadError) {
    return (
      <div className="p-8">
        <p role="alert" className="border-2 border-black bg-red-200 p-4 font-bold shadow-[5px_5px_0_0_#000]">
          {loadError}
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F7F7F7]">
        <p className="inline-flex items-center gap-3 border-2 border-black bg-[#B9A7FB] px-5 py-3 font-extrabold shadow-[5px_5px_0_0_#000]">
          <Spinner /> Loading profile...
        </p>
      </div>
    );
  }

  const values = isEditing ? draft : profile;
  const shownAvatar = avatarPreview || (avatarRemoved ? "" : profile.avatarUrl);

  /* ---------- handlers ---------- */
  const startEdit = () => {
    setDraft({ ...profile });
    setErrors({});
    setIsEditing(true);
  };

  const resetAvatarChanges = () => {
    setAvatarPreview("");
    setAvatarFile(null);
    setAvatarRemoved(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(null);
    setErrors({});
    resetAvatarChanges();
  };

  const handleChange = (field, value) => {
    setDraft((d) => ({ ...d, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const handleSelectAvatar = (file) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setToast({ type: "error", message: "Choose a JPG, PNG or WebP image." });
      return;
    }
    if (file.size > AVATAR_MAX_MB * 1024 * 1024) {
      setToast({ type: "error", message: `Image must be smaller than ${AVATAR_MAX_MB} MB.` });
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarFile(file);
    setAvatarRemoved(false);
    if (!isEditing) startEdit(); // picking a photo opens edit mode so it can be saved
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview("");
    setAvatarFile(null);
    setAvatarRemoved(true);
    if (!isEditing) startEdit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing || isSaving) return;

    const found = validate(draft);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setIsSaving(true);
    try {
      let avatarUrl = profile.avatarUrl;
      if (avatarFile) ({ avatarUrl } = await profileApi.updateProfilePicture(avatarFile));
      else if (avatarRemoved) ({ avatarUrl } = await profileApi.removeProfilePicture());

      const saved = await profileApi.updateProfile({
        ...draft,
        fullName: draft.fullName.trim(),
        email: draft.email.trim(),
        mobile: draft.mobile.trim(),
        bio: draft.bio.trim(),
      });

      setProfile({ ...saved, avatarUrl });
      setIsEditing(false);
      setDraft(null);
      resetAvatarChanges();
      setToast({ type: "success", message: "Profile updated." });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Could not save your profile. Try again." });
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="relative isolate min-h-full overflow-hidden bg-[#F7F7F7] px-4 pb-8 pt-36 font-sans text-black sm:px-8 lg:pt-[175px]">
      <Decorations />

      <form onSubmit={handleSubmit} noValidate className="relative z-10">
        <div className="grid items-stretch gap-8 lg:grid-cols-[5fr_8fr] lg:gap-10">
          <ProfileAvatarCard
            name={profile.fullName}
            email={profile.email}
            src={shownAvatar}
            disabled={isSaving}
            onSelectFile={handleSelectAvatar}
            onRemove={handleRemoveAvatar}
          />
          <ProfileForm values={values} errors={errors} isEditing={isEditing} onChange={handleChange} />
        </div>

        <ProfileActions isEditing={isEditing} isSaving={isSaving} onEdit={startEdit} onCancel={cancelEdit} />
      </form>

      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border-2 border-black px-5 py-3 font-extrabold shadow-[5px_5px_0_0_#000] ${
            toast.type === "success" ? "bg-[#6DE5A6]" : "bg-red-300"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}