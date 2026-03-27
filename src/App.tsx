import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Award,
  ChevronDown,
  MapPin,
  Menu,
  Package,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// Silver plate collage: 4 quadrants as CSS object-position crops
const SILVER_PLATE_CROPS = [
  { objectPosition: "0% 0%" }, // top-left
  { objectPosition: "100% 0%" }, // top-right
  { objectPosition: "0% 100%" }, // bottom-left
  { objectPosition: "100% 100%" }, // bottom-right
];

const WHATSAPP_NUMBER = "918167388358";

const PRODUCT_TYPES = [
  "Paper Plates",
  "Paper Cups & Glasses",
  "Kraft Containers",
  "All Products",
];

const ENQUIRY_REASONS = [
  "Just Browsing",
  "Business Need",
  "Personal Need",
  "Hotel / Restaurant / Kitchen",
];

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Enquiry Modal ─────────────────────────────────────────────────────────────
function EnquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [product, setProduct] = useState("");
  const [reason, setReason] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<{
    product?: string;
    reason?: string;
    location?: string;
  }>({});

  const handleClose = () => {
    setProduct("");
    setReason("");
    setLocation("");
    setErrors({});
    onClose();
  };

  const handleSend = () => {
    const newErrors: { product?: string; reason?: string; location?: string } =
      {};
    if (!product) newErrors.product = "Please select a product type.";
    if (!reason) newErrors.reason = "Please select a reason.";
    if (!location.trim()) newErrors.location = "Please enter your location.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const message = `Hi Greenpack! I'm interested in your ${product}.

Reason: ${reason}
Location: ${location.trim()}

Please share more details and pricing.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className="max-w-md w-full rounded-2xl border-0 p-0 overflow-hidden"
        style={{ background: "oklch(0.18 0.10 155)" }}
        data-ocid="enquiry.dialog"
      >
        <DialogHeader
          className="px-6 pt-6 pb-4"
          style={{ borderBottom: "1px solid oklch(0.30 0.09 155)" }}
        >
          <DialogTitle className="text-white font-display text-xl flex items-center gap-2">
            <WhatsAppIcon />
            <span>Quick Enquiry</span>
          </DialogTitle>
          <p className="text-white/50 text-sm mt-1">
            Tell us what you need — we'll craft a message for you.
          </p>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-6">
          {/* Product Type */}
          <div className="flex flex-col gap-2">
            <Label className="text-white/80 font-semibold text-sm">
              Product Type
            </Label>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_TYPES.map((p) => (
                <button
                  key={p}
                  type="button"
                  data-ocid="enquiry.product.toggle"
                  onClick={() => {
                    setProduct(p);
                    setErrors((e) => ({ ...e, product: undefined }));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    product === p
                      ? "text-white border-transparent"
                      : "text-white/60 border-white/20 hover:border-white/40 hover:text-white/80"
                  }`}
                  style={
                    product === p
                      ? {
                          background: "oklch(0.72 0.18 150)",
                          borderColor: "oklch(0.72 0.18 150)",
                        }
                      : {}
                  }
                >
                  {p}
                </button>
              ))}
            </div>
            {errors.product && (
              <p
                className="text-red-400 text-xs"
                data-ocid="enquiry.product.error_state"
              >
                {errors.product}
              </p>
            )}
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-2">
            <Label className="text-white/80 font-semibold text-sm">
              Reason for Enquiry
            </Label>
            <div className="flex flex-wrap gap-2">
              {ENQUIRY_REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  data-ocid="enquiry.reason.toggle"
                  onClick={() => {
                    setReason(r);
                    setErrors((e) => ({ ...e, reason: undefined }));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    reason === r
                      ? "text-white border-transparent"
                      : "text-white/60 border-white/20 hover:border-white/40 hover:text-white/80"
                  }`}
                  style={
                    reason === r
                      ? {
                          background: "oklch(0.83 0.10 175)",
                          borderColor: "oklch(0.83 0.10 175)",
                        }
                      : {}
                  }
                >
                  {r}
                </button>
              ))}
            </div>
            {errors.reason && (
              <p
                className="text-red-400 text-xs"
                data-ocid="enquiry.reason.error_state"
              >
                {errors.reason}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="enquiry-location"
              className="text-white/80 font-semibold text-sm"
            >
              Your Location
            </Label>
            <Input
              id="enquiry-location"
              data-ocid="enquiry.location.input"
              placeholder="e.g. Siliguri, Guwahati..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setErrors((prev) => ({ ...prev, location: undefined }));
              }}
              className="border-white/20 text-white placeholder:text-white/30 focus-visible:ring-green-400"
              style={{ background: "oklch(0.24 0.09 155)" }}
            />
            {errors.location && (
              <p
                className="text-red-400 text-xs"
                data-ocid="enquiry.location.error_state"
              >
                {errors.location}
              </p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div
          className="px-6 pb-6 flex gap-3 justify-end"
          style={{
            borderTop: "1px solid oklch(0.30 0.09 155)",
            paddingTop: "1rem",
          }}
        >
          <Button
            variant="ghost"
            onClick={handleClose}
            data-ocid="enquiry.cancel_button"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            data-ocid="enquiry.submit_button"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold"
          >
            <WhatsAppIcon />
            Send Enquiry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  image,
  imageStyle,
  video,
  title,
  description,
  badges,
  index,
}: {
  image?: string;
  imageStyle?: React.CSSProperties;
  video?: string;
  title: string;
  description: string;
  badges?: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border border-white/10"
    >
      <div className="aspect-[6/5] overflow-hidden">
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            style={imageStyle}
          />
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-display font-bold text-xl text-foreground leading-snug">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {description}
        </p>
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {badges.map((b) => (
              <Badge
                key={b}
                variant="secondary"
                className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
              >
                {b}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({
  id,
  title,
  subtitle,
  children,
  dark,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-20 px-4 ${dark ? "" : "bg-background"}`}
      style={dark ? { background: "oklch(0.22 0.10 155)" } : undefined}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-primary/40" />
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              {subtitle}
            </span>
            <span className="w-8 h-px bg-primary/40" />
          </div>
          <h2 className="font-display font-bold text-4xl text-foreground">
            {title}
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto mt-4"
            style={{
              background:
                "linear-gradient(to right, oklch(0.82 0.15 150), oklch(0.85 0.09 205))",
            }}
          />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">{children}</div>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const openEnquiry = () => setEnquiryOpen(true);

  // Pick a random quadrant of the stuff collage for silver plates
  const silverCrop = useMemo(
    () =>
      SILVER_PLATE_CROPS[Math.floor(Math.random() * SILVER_PLATE_CROPS.length)],
    [],
  );

  const navLinks = [
    { label: "Plates", href: "#plates" },
    { label: "Cups & Glasses", href: "#cups" },
    { label: "Containers", href: "#containers" },
    { label: "Why Us", href: "#features" },
    { label: "Cities", href: "#cities" },
  ];

  const features = [
    {
      icon: Award,
      title: "Low Minimum Order",
      description:
        "Start small without commitment. We welcome small orders — no need for large bulk quantities to get started with Greenpack products.",
    },
    {
      icon: Sparkles,
      title: "Best in Quality",
      description:
        "Our products are crafted from premium ITC white paper, ensuring food-safe, sturdy, and consistent quality in every single piece.",
    },
    {
      icon: Sparkles,
      title: "Brand Launch for Kraft Containers",
      description:
        "Launching your food brand? Our custom-branded kraft containers give you a professional identity from day one — minimum order, maximum impact.",
    },
  ];

  const cities = [
    "Siliguri",
    "Jalpaiguri",
    "Cooch Behar",
    "Malda",
    "Uttar Dinajpur",
    "Alipurduar",
    "Guwahati",
  ];

  return (
    <div className="min-h-screen bg-background">
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />

      {/* ── Sticky Nav ── */}
      <header className="sticky top-0 z-50 bg-primary shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl text-primary-foreground tracking-tight">
              Greenpack
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground font-medium transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="nav.whatsapp_button"
              onClick={openEnquiry}
              className="hidden md:flex items-center gap-2 bg-black hover:bg-neutral-900 text-white rounded-full px-5 py-2 font-semibold text-sm transition-colors"
            >
              <span className="text-green-500">
                <WhatsAppIcon />
              </span>
              WhatsApp
            </button>
            <button
              type="button"
              className="md:hidden text-primary-foreground p-1"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-primary-foreground/20 px-4 pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-primary-foreground/80 hover:text-primary-foreground font-medium border-b border-primary-foreground/10 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              data-ocid="nav.mobile_whatsapp_button"
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiry();
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 text-white rounded-full py-3 font-semibold text-sm transition-colors"
            >
              <span className="text-green-500">
                <WhatsAppIcon />
              </span>
              WhatsApp
            </button>
          </motion.div>
        )}
      </header>

      {/* ── Hero: Solid Color + Static Cups Image ── */}
      <section
        id="hero"
        className="relative min-h-[88vh] flex items-center overflow-hidden"
        style={{ background: "oklch(0.16 0.09 155)" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background: "oklch(0.65 0.12 175)",
            transform: "translate(-30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background: "oklch(0.85 0.09 205)",
            transform: "translate(25%, 30%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center py-20">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span
                className="w-10 h-px"
                style={{ background: "oklch(0.85 0.09 210)" }}
              />
              <span
                className="font-semibold text-sm uppercase tracking-widest"
                style={{ color: "oklch(0.87 0.08 210)" }}
              >
                Premium Kraft Packaging
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-display font-bold text-5xl md:text-6xl text-white leading-tight"
            >
              Greenpack
              <br />
              <span style={{ color: "oklch(0.85 0.09 210)" }}>
                Paper Products
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="text-white/70 text-xl font-light leading-relaxed"
            >
              Quality You Can Trust.
              <br />
              Orders You Can Afford.
            </motion.p>

            {/* Scroll-down cue */}
            <motion.a
              href="#plates"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-2 self-start"
              aria-label="Scroll to products"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown
                  className="w-9 h-9"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                />
              </motion.div>
            </motion.a>
          </div>

          {/* Right: Static cups image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-25"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.83 0.10 175) 0%, transparent 70%)",
              }}
            />
            <div className="relative w-full max-w-lg">
              <img
                src="/assets/uploads/image_6ecf73a4-019d214e-44ee-713d-b806-84bc66bf4272-1.png"
                alt="Greenpack paper products"
                className="w-full drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 24px 48px oklch(0.1 0.08 155 / 0.7))",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-20 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-px bg-white/40" />
              <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">
                Why Choose Greenpack
              </span>
              <span className="w-8 h-px bg-white/40" />
            </div>
            <h2 className="font-display font-bold text-4xl text-white">
              Built for Your Business
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto mt-4"
              style={{ background: "oklch(0.82 0.15 150)" }}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="rounded-2xl p-8 flex flex-col gap-4 text-center"
                style={{ background: "oklch(0.28 0.10 155 / 0.60)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
                  style={{ background: "oklch(0.82 0.15 150 / 0.2)" }}
                >
                  <f.icon
                    className="w-7 h-7"
                    style={{ color: "oklch(0.85 0.09 210)" }}
                  />
                </div>
                <h3 className="font-display font-bold text-xl text-white">
                  {f.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Callout Banner ── */}
      <div
        className="border-y border-white/20 py-8 px-4"
        style={{ background: "oklch(0.20 0.09 155)" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-display font-bold text-2xl text-foreground">
              Bulk orders? Custom branding?
            </p>
            <p className="text-muted-foreground mt-1">
              We supply to hotels, restaurants, catering businesses, and event
              organizers across North Bengal & Assam.
            </p>
          </div>
          <button
            type="button"
            data-ocid="callout.whatsapp_button"
            onClick={openEnquiry}
            className="shrink-0 flex items-center gap-2 bg-black hover:bg-neutral-900 text-white rounded-full px-7 py-3 font-semibold transition-colors"
          >
            <span className="text-green-500">
              <WhatsAppIcon />
            </span>
            WhatsApp Us
          </button>
        </div>
      </div>

      {/* ── Paper Plates ── */}
      <Section id="plates" title="Paper Plates" subtitle="Elegant & Sturdy">
        <ProductCard
          index={0}
          image="/assets/uploads/stuff_image-019d20c5-f3ba-719c-9fc7-ebfeb0970447-2.png"
          imageStyle={{
            objectFit: "cover",
            objectPosition: silverCrop.objectPosition,
            transform: "scale(2.05)",
          }}
          title="Silver Finish Plates"
          description="Shimmery silver finish 8-inch paper plates — sturdy enough for generous snack servings. Load them with bhel puri, chole chaat with dahi, crispy bhujia with chips, or gulab jamun. The silver coating keeps moisture out and presentation sharp."
          badges={["8 Inch", "Snack Ready", "Food-Safe"]}
        />
        <ProductCard
          index={1}
          image="/assets/generated/plates-sunmica-food.dim_600x500.jpg"
          title="Sunmica Print Plates"
          description="Wood-grain print plates in handy 5–8 inch sizes — ideal for street-food setups and casual snack counters. Whether it's a plate of momos, chowmein, or papdi chaat, these hold it all with style."
          badges={["5–8 Inch Sizes", "Street Food Friendly", "Aesthetic"]}
        />
      </Section>

      {/* ── Cups & Glasses ── */}
      <Section
        id="cups"
        title="Paper Cups & Glasses"
        subtitle="For Every Sip"
        dark
      >
        <ProductCard
          index={0}
          image="/assets/generated/cups-white-food.dim_600x500.jpg"
          title="Plain White Cups"
          description="Clean, crisp white paper cups suitable for hot and cold beverages. Perfect for offices, cafeterias, and large-scale events. Heat-insulated with a smooth finish."
          badges={["Hot & Cold", "Heat-Insulated", "Recyclable"]}
        />
        <ProductCard
          index={1}
          image="/assets/generated/cups-striped-coffee.dim_600x500.jpg"
          title="Simple Stripes Print"
          description="Stylish striped paper cups showcasing a rich Indian decaf coffee served with a secure lid — perfect for cafes, pop-ups, and on-the-go beverage stalls. Available in terracotta and natural tone stripes."
          badges={["Stripe Print", "Café Style", "Custom Sizes"]}
        />
      </Section>

      {/* ── Kraft Containers ── */}
      <Section
        id="containers"
        title="Kraft Cylindrical Containers"
        subtitle="ITC White Paper Kraft"
      >
        <ProductCard
          index={0}
          video="/assets/uploads/whitepapercontainervdo-019d20b0-73c4-7583-a806-a8e73043aac5-1.mp4"
          title="Custom Branded"
          description="Premium ITC white paper kraft containers with your brand's logo and design. Launch your food brand with confidence — full-wrap print available. Contact us for artwork guidelines."
          badges={["Brand Launch Ready", "Full-Wrap Print", "Low MOQ"]}
        />
      </Section>

      {/* ── Serving Cities ── */}
      <section id="cities" className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin
                className="w-5 h-5"
                style={{ color: "oklch(0.85 0.09 210)" }}
              />
              <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">
                Delivery Coverage
              </span>
              <MapPin
                className="w-5 h-5"
                style={{ color: "oklch(0.85 0.09 210)" }}
              />
            </div>
            <h2 className="font-display font-bold text-4xl text-white mb-3">
              We Serve Across North Bengal & Assam
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto mt-4 mb-6"
              style={{ background: "oklch(0.82 0.15 150)" }}
            />
            <p className="text-white/70 max-w-xl mx-auto">
              Fast and reliable delivery to businesses and individuals across
              the entire North Bengal region and Guwahati.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
                style={{ background: "oklch(0.28 0.10 155 / 0.60)" }}
              >
                <Package
                  className="w-4 h-4"
                  style={{ color: "oklch(0.85 0.09 210)" }}
                />
                {city}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{ background: "oklch(0.12 0.07 155)" }}
        className="text-white/70 py-12 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-display font-bold text-2xl text-white">
                  Greenpack
                </span>
              </div>
              <p className="text-white/50 max-w-xs leading-relaxed">
                Premium paper products — plates, cups, and containers. Serving
                North Bengal & Guwahati.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-white mb-1">Quick Links</p>
              {[
                ["Paper Plates", "#plates"],
                ["Cups & Glasses", "#cups"],
                ["Kraft Containers", "#containers"],
                ["Why Us", "#features"],
                ["Serving Cities", "#cities"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  {label}
                </a>
              ))}
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Enquiries</p>
              <button
                type="button"
                data-ocid="footer.whatsapp_button"
                onClick={openEnquiry}
                className="flex items-center gap-2 bg-black hover:bg-neutral-900 text-white rounded-full px-6 py-2.5 font-semibold text-sm transition-colors"
              >
                <span className="text-green-500">
                  <WhatsAppIcon />
                </span>
                WhatsApp Us
              </button>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-white/30">
            <p>
              &copy; {new Date().getFullYear()} Greenpack Paper Products. All
              rights reserved.
            </p>
            <p>
              Built with{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          type="button"
          data-ocid="floating.whatsapp_button"
          onClick={openEnquiry}
          className="flex items-center gap-2 bg-black hover:bg-neutral-900 text-white rounded-full px-5 py-3 shadow-xl font-semibold text-sm transition-colors"
        >
          <span className="text-green-500">
            <WhatsAppIcon />
          </span>
          WhatsApp
        </button>
      </motion.div>
    </div>
  );
}
