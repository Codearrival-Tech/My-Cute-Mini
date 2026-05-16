import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle,
  MessageCircle,
  Upload,
  PhoneCall,
  User,
  Phone,
  Mail,
  Layers,
  Maximize2,
  FileText,
  ImagePlus,
  X,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Globe,
  Sparkles,
} from "lucide-react";
import FadeIn from "../components/FadeIn";

// ─── Design Tokens ─────────────────────────────────────────────────────────
const T = {
  pink: "#E91E8C",
  pinkHover: "#C9177A",
  pinkLight: "#FDF0F7",
  pinkMid: "#F0A8CF",
  pinkDark: "#B5166E",
  rose: "#FDF4F9",
  white: "#FFFFFF",
  gray50: "#F9F9FB",
  gray100: "#F2F2F5",
  gray200: "#E4E4EA",
  gray400: "#9A9AAF",
  gray600: "#5A5A72",
  gray800: "#2A2A3A",
  gray900: "#13131A",
  green: "#22C55E",
  greenDark: "#16A34A",
} as const;

// ─── Zod Schema ─────────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-]{7,15}$/, "Enter a valid phone number"),
  email: z
    .string()
    .optional()
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Enter a valid email address",
    }),
  category: z.string().min(1, "Please select a category"),
  size: z.string().optional(),
  notes: z.string().optional(),
  file: z
    .custom<File>((v) => v instanceof File, {
      message: "Please upload a photo",
    })
    .refine((f) => f instanceof File && f.size <= 10 * 1024 * 1024, {
      message: "File must be under 10 MB",
    }),
});

type FormValues = z.infer<typeof schema>;

// ─── Field wrapper ───────────────────────────────────────────────────────────
interface FieldProps {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ icon, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: T.gray400 }}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <span
          className="absolute left-3.5 pointer-events-none"
          style={{ color: T.pinkMid }}
        >
          {icon}
        </span>
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[11px]"
            style={{ color: "#EF4444" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none border transition-all duration-200 focus:ring-2 focus:ring-pink-300 bg-white";

const inputSty = (hasError: boolean): React.CSSProperties => ({
  borderColor: hasError ? "#EF4444" : T.gray200,
  color: T.gray900,
});

// ─── Trust Pill ─────────────────────────────────────────────────────────────
interface TrustPillProps {
  icon: React.ReactNode;
  text: string;
}

function TrustPill({ icon, text }: TrustPillProps) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
      style={{ background: T.white, borderColor: T.gray100 }}
    >
      <span style={{ color: T.pink }}>{icon}</span>
      <span
        className="text-xs font-medium leading-tight"
        style={{ color: T.gray600 }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Upload Zone ─────────────────────────────────────────────────────────────
interface UploadZoneProps {
  value: File | null | undefined;
  onChange: (file: File | null) => void;
  error?: string;
}

function UploadZone({ value, onChange, error }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File | undefined) => {
    if (f && f.type.startsWith("image/")) onChange(f);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const clear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: T.gray400 }}
      >
        Upload Your Photo *
      </label>

      <motion.div
        onDragOver={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          borderColor: dragging ? T.pink : error ? "#EF4444" : T.pinkMid,
          background: dragging ? T.pinkLight : T.white,
          scale: dragging ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative rounded-2xl border-2 border-dashed p-6 cursor-pointer flex flex-col items-center gap-3 select-none"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFile(e.target.files?.[0])
          }
        />

        <AnimatePresence mode="wait">
          {value ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: T.pinkLight }}
              >
                <ImagePlus size={18} color={T.pink} />
              </div>
              <p
                className="text-sm font-semibold text-center truncate max-w-[200px]"
                style={{ color: T.gray900 }}
              >
                {value.name}
              </p>
              <p className="text-xs" style={{ color: T.gray400 }}>
                {(value.size / 1024).toFixed(0)} KB · Tap to replace
              </p>
              <button
                type="button"
                onClick={clear}
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: T.gray100 }}
              >
                <X size={12} color={T.gray600} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: T.pinkLight }}
              >
                <Upload size={20} color={T.pink} />
              </div>
              <div className="text-center">
                <p
                  className="text-sm font-semibold"
                  style={{ color: T.gray800 }}
                >
                  Drop photo here or{" "}
                  <span style={{ color: T.pink }}>browse</span>
                </p>
                <p className="text-xs mt-1" style={{ color: T.gray400 }}>
                  JPG, PNG, WEBP · Max 10 MB · Clear front-facing photo
                  recommended
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[11px]"
            style={{ color: "#EF4444" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Success Card ────────────────────────────────────────────────────────────
interface SuccessCardProps {
  onWhatsApp: () => void;
}

function SuccessCard({ onWhatsApp }: SuccessCardProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-3xl p-10 text-center border flex flex-col items-center gap-5"
      style={{ background: T.rose, borderColor: T.pinkLight }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${T.pink}, ${T.pinkDark})`,
        }}
      >
        <CheckCircle size={36} color="#fff" strokeWidth={2} />
      </motion.div>

      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: T.gray900,
          }}
        >
          Inquiry Received!
        </h3>
        <p
          className="text-sm leading-relaxed max-w-xs mx-auto"
          style={{ color: T.gray600 }}
        >
          We've got your details. Our team will call you back within{" "}
          <strong style={{ color: T.gray900 }}>24 hours</strong> to confirm your
          order and share a preview.
        </p>
      </div>

      <div
        className="w-full rounded-2xl p-4 border flex flex-col gap-2"
        style={{ background: T.white, borderColor: T.gray100 }}
      >
        {[
          "Preview sent before production starts",
          "Crafted within 7–10 business days",
          "Tracked shipping to your door",
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <CheckCircle size={14} color={T.pink} />
            <span className="text-xs" style={{ color: T.gray600 }}>
              {t}
            </span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onWhatsApp}
        className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white shadow-md"
        style={{ background: T.green }}
      >
        <MessageCircle size={16} />
        Continue on WhatsApp
        <ArrowRight size={15} />
      </motion.button>

      <p className="text-xs" style={{ color: T.gray400 }}>
        Or wait — we'll contact you on the number provided.
      </p>
    </motion.div>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORIES: string[] = [
  "3D Selfie Figurine",
  "Couple Miniature",
  "Family Figurine",
  "Wedding Keepsake",
  "Corporate Gift",
  "Birthday Cake Topper",
];

const SIZES: string[] = [
  "Small (10 cm)",
  "Medium (15 cm)",
  "Large (20 cm)",
  "Custom Size",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OrderForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      category: "",
      size: "",
      notes: "",
      file: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (_data) => {
    setSubmitted(true);
  };

  const whatsapp = () => {
    const { category, name, phone } = watch();
    const msg = encodeURIComponent(
      `Hi! I'd like to order a ${category || "miniature"} from My Cute Mini.\nName: ${name}\nPhone: ${phone}`,
    );
    window.open(`https://wa.me/911800274150?text=${msg}`, "_blank");
  };

  return (
    <section
      id="order"
      className="relative py-24 overflow-hidden"
      style={{ background: T.white }}
    >
      {/* Background accents */}
      <div
        className="absolute top-0 right-0 w-150 h-150 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: T.pink,
          filter: "blur(120px)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-100 h-100 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: T.pink,
          filter: "blur(100px)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <FadeIn className="mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
            style={{ color: T.pink }}
          >
            <Sparkles size={12} /> Place an Order
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: T.gray900,
              }}
            >
              Book Your
              <br />
              <span style={{ color: T.pink }}>Miniature</span>
            </h2>
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: T.gray600 }}
            >
              Upload a photo, fill in your details — we'll call you back to
              confirm before crafting begins. No payment until you approve the
              preview.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left panel */}
          <FadeIn
            direction="right"
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div
              className="rounded-3xl p-6 border flex flex-col gap-3"
              style={{ background: T.rose, borderColor: T.pinkLight }}
            >
              <p
                className="text-sm font-bold mb-1"
                style={{ color: T.gray900 }}
              >
                Why order with us?
              </p>
              {(
                [
                  {
                    icon: <ImagePlus size={15} />,
                    text: "Preview shared before production",
                  },
                  {
                    icon: <ShieldCheck size={15} />,
                    text: "100% satisfaction guarantee",
                  },
                  {
                    icon: <PackageCheck size={15} />,
                    text: "Secure packaging for fragile items",
                  },
                  {
                    icon: <Globe size={15} />,
                    text: "Pan-India & international delivery",
                  },
                  {
                    icon: <PhoneCall size={15} />,
                    text: "Dedicated callback support",
                  },
                ] satisfies { icon: React.ReactNode; text: string }[]
              ).map(({ icon, text }, i) => (
                <TrustPill key={i} icon={icon} text={text} />
              ))}
            </div>

            <div
              className="rounded-3xl p-6 border relative overflow-hidden"
              style={{ background: T.gray900, borderColor: "#2A2A3A" }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                style={{ background: T.pink, filter: "blur(40px)" }}
              />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={13} fill={T.pink} color={T.pink} />
                ))}
                <span
                  className="text-sm font-bold ml-2"
                  style={{ color: "#fff" }}
                >
                  4.9
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#D1D5DB" }}
              >
                "I'm from Malaysia — seen this creative idea on social media and
                their work is simply awesome. Very unique and the delivery was
                worth every penny."
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: T.pinkLight, color: T.pinkDark }}
                >
                  R
                </div>
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#F9FAFB" }}
                  >
                    Ravi K.
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    Verified Customer · Malaysia
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl px-5 py-4 border flex items-start gap-3"
              style={{ background: T.white, borderColor: T.gray200 }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: T.pinkLight }}
              >
                <PackageCheck size={16} color={T.pink} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: T.gray900 }}
                >
                  Ships in 7–10 business days
                </p>
                <p
                  className="text-xs mt-0.5 leading-relaxed"
                  style={{ color: T.gray400 }}
                >
                  After your preview approval. Fully tracked delivery worldwide.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right panel: Form */}
          <FadeIn delay={0.15} direction="left" className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessCard key="success" onWhatsApp={whatsapp} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border overflow-hidden"
                  style={{ background: T.rose, borderColor: T.pinkLight }}
                >
                  {/* Form header */}
                  <div
                    className="px-8 py-5 border-b flex items-center justify-between"
                    style={{ borderColor: T.pinkLight }}
                  >
                    <div>
                      <p
                        className="font-bold text-base"
                        style={{
                          color: T.gray900,
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        Inquiry &amp; Order Form
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: T.gray400 }}
                      >
                        Fields marked * are required
                      </p>
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold border"
                      style={{
                        background: T.pinkLight,
                        color: T.pinkDark,
                        borderColor: T.pinkMid,
                      }}
                    >
                      Free Consultation
                    </div>
                  </div>

                  {/* Form body */}
                  <div className="px-8 py-7 flex flex-col gap-5">
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        icon={<User size={15} />}
                        label="Full Name *"
                        error={errors.name?.message}
                      >
                        <input
                          {...register("name")}
                          placeholder="Your full name"
                          className={inputCls}
                          style={inputSty(!!errors.name)}
                        />
                      </Field>

                      <Field
                        icon={<Phone size={15} />}
                        label="Phone Number *"
                        error={errors.phone?.message}
                      >
                        <input
                          {...register("phone")}
                          placeholder="+91 98765 43210"
                          className={inputCls}
                          style={inputSty(!!errors.phone)}
                        />
                      </Field>
                    </div>

                    {/* Email */}
                    <Field
                      icon={<Mail size={15} />}
                      label="Email Address"
                      error={errors.email?.message}
                    >
                      <input
                        {...register("email")}
                        placeholder="you@example.com"
                        className={inputCls}
                        style={inputSty(!!errors.email)}
                      />
                    </Field>

                    {/* Category + Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        icon={<Layers size={15} />}
                        label="Product Category *"
                        error={errors.category?.message}
                      >
                        <select
                          {...register("category")}
                          className={`${inputCls} appearance-none pr-8`}
                          style={inputSty(!!errors.category)}
                        >
                          <option value="">Select type</option>
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field
                        icon={<Maximize2 size={15} />}
                        label="Figurine Size"
                      >
                        <select
                          {...register("size")}
                          className={`${inputCls} appearance-none pr-8`}
                          style={inputSty(false)}
                        >
                          <option value="">Select size</option>
                          {SIZES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* File upload via Controller */}
                    <Controller
                      name="file"
                      control={control}
                      render={({ field }) => (
                        <UploadZone
                          value={field.value}
                          onChange={(f) => field.onChange(f ?? undefined)}
                          error={errors.file?.message as string | undefined}
                        />
                      )}
                    />

                    {/* Notes */}
                    <Field
                      icon={<FileText size={15} />}
                      label="Special Notes / Requirements"
                    >
                      <textarea
                        {...register("notes")}
                        rows={3}
                        placeholder="Describe pose, outfit, accessories, occasion, or any special requests..."
                        className={`${inputCls} resize-none pt-3`}
                        style={{ ...inputSty(false), paddingLeft: "2.75rem" }}
                      />
                    </Field>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-1">
                      <motion.button
                        whileHover={{
                          scale: 1.015,
                          boxShadow: `0 8px 28px rgba(233,30,140,0.25)`,
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit(onSubmit)}
                        type="button"
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-semibold text-white shadow-md transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${T.pink}, ${T.pinkDark})`,
                        }}
                      >
                        <PhoneCall size={16} />
                        Submit &amp; Request Callback
                        <ArrowRight size={15} />
                      </motion.button>

                      <div className="flex items-center gap-3">
                        <div
                          className="flex-1 h-px"
                          style={{ background: T.pinkMid, opacity: 0.4 }}
                        />
                        <span className="text-xs" style={{ color: T.gray400 }}>
                          or chat directly
                        </span>
                        <div
                          className="flex-1 h-px"
                          style={{ background: T.pinkMid, opacity: 0.4 }}
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={whatsapp}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-semibold text-white"
                        style={{ background: "#25D366" }}
                      >
                        <MessageCircle size={16} />
                        Continue on WhatsApp
                      </motion.button>
                    </div>

                    <p
                      className="text-center text-xs"
                      style={{ color: T.gray400 }}
                    >
                      No payment required now · Preview shared before production
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
