"use client";

export interface ToastMsg {
  id: number;
  text: string;
}

export default function Toast({ messages }: { messages: ToastMsg[] }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {messages.map((m) => (
        <div
          key={m.id}
          className="px-5 py-2.5 rounded-full text-white text-sm font-medium shadow-lg animate-bounce-in whitespace-nowrap bg-amber-700"
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}
