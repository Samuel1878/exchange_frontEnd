// // VerticalStepper.jsx
// import React, { useState, useRef, useEffect } from "react";

// /**
//  * steps: [{ id, title, subtitle?, content? }]
//  * initial = index to start active
//  * onStepChange(index) optional
//  */
// export default function VerticalStepper({
//   steps = [],
//   initial = 0,
//   onStepChange,
// }) {
//   const [active, setActive] = useState(initial);
//   const listRef = useRef(null);

//   useEffect(() => onStepChange?.(active), [active, onStepChange]);

//   // keyboard navigation
//   function onKey(e, i) {
//     if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;
//     e.preventDefault();
//     if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
//     if (e.key === "ArrowDown")
//       setActive((a) => Math.min(steps.length - 1, a + 1));
//     if (e.key === "Home") setActive(0);
//     if (e.key === "End") setActive(steps.length - 1);
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <ol
//         ref={listRef}
//         className="relative border-l border-gray-200 dark:border-gray-700"
//         role="list"
//         aria-label="Progress"
//       >
//         {steps.map((s, i) => {
//           const isActive = i === active;
//           const isDone = i < active;
//           return (
//             <li key={s.id ?? i} className="mb-8 ml-6 last:before:hidden">
//               {/* Indicator */}
//               <button
//                 onClick={() => setActive(i)}
//                 onKeyDown={(e) => onKey(e, i)}
//                 aria-current={isActive ? "step" : undefined}
//                 aria-label={`${s.title} ${isDone ? "completed" : isActive ? "active" : "pending"}`}
//                 className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full overflow-hidden
//                   ${isDone ? "text-gray-950 bg-gray-50" : isActive ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"}`}
//               >
//                 {isDone ? (
//                   // checkmark (SVG)
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-4 h-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={3}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 ) : (
//                   <span className="font-medium">{i + 1}</span>
//                 )}
//               </button>

//               {/* Content */}
//               <div
//                 role="group"
//                 aria-labelledby={`step-title-${i}`}
//                 tabIndex={0}
//                 onKeyDown={(e) => onKey(e, i)}
//                 className={`pl-2 transition-all duration-200 ${isActive ? "scale-100" : "opacity-80"}`}
//               >
//                 <h3
//                   id={`step-title-${i}`}
//                   className="text-lg font-semibold text-gray-900 flex items-center justify-between"
//                 >
//                   <span>{s.title}</span>
//                   <span className="text-sm text-gray-500">{s.subtitle}</span>
//                 </h3>
//                 {s.time && (
//                   <time className="block text-sm text-gray-500 mb-1">
//                     {s.time}
//                   </time>
//                 )}
//                 <p className="text-gray-700">{s.content}</p>

//                 {/* optional action when active */}
//                 {isActive && s.actions && (
//                   <div className="mt-3 flex gap-2">
//                     {s.actions.map((a, idx) => (
//                       <button
//                         key={idx}
//                         onClick={a.onClick}
//                         className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//                       >
//                         {a.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </li>
//           );
//         })}
//       </ol>
//     </div>
//   )
// }
