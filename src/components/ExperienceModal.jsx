import React from 'react'

const ExperienceModal = ({ isOpen, onClose, title, company, date, points = [] }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-11/12 max-w-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {company && <p className="text-sm text-slate-500">{company}</p>}
            {date && <p className="text-xs text-slate-400 mt-1">{date}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-sm text-slate-500 px-2 py-1 rounded hover:bg-slate-100"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 max-h-64 overflow-auto">
          {points.length ? (
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
              {points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No additional details.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExperienceModal
