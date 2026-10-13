export default function PageBackground() {
  return (
    <div className="bg-curves" aria-hidden="true">
      <svg className="wave-1" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path fill="#2563EB" fillOpacity="0.08"
          d="M0,160 C240,260 480,60 720,140 C960,220 1200,80 1440,160 L1440,400 L0,400 Z" />
      </svg>
      <svg className="wave-2" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path fill="#06B6D4" fillOpacity="0.07"
          d="M0,200 C300,100 500,300 800,200 C1050,120 1250,260 1440,180 L1440,400 L0,400 Z" />
      </svg>
      <svg className="wave-3" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path fill="#7C3AED" fillOpacity="0.06"
          d="M0,120 C200,220 520,40 760,120 C1000,200 1240,100 1440,150 L1440,400 L0,400 Z" />
      </svg>
    </div>
  );
}