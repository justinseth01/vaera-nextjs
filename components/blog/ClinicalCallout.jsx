export default function ClinicalCallout({ type = 'takeaway', children }) {
  const isWarning = type === 'warning' || type === 'safety'

  return (
    <div className={`my-8 p-6 rounded-2xl border-l-4 ${
      isWarning
        ? 'bg-amber-50 border-amber-400'
        : 'bg-vaera-ice/30 border-vaera-ice'
    }`}>
      <span className={`block font-mono text-[10px] uppercase tracking-widest mb-2 ${
        isWarning ? 'text-amber-600' : 'text-vaera-light-navy'
      }`}>
        {isWarning ? 'Safety Note' : 'Key Takeaway'}
      </span>
      <div className="font-poppins text-vaera-navy/80">
        {children}
      </div>
    </div>
  )
}
