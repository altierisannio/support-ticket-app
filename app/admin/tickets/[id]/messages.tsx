'use client';

import { useEffect, useRef } from 'react';

export default function Messages({ messages }: { messages: any[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-xl p-4 ${
            msg.author_type === 'agent'
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-gray-50 border'
          }`}
        >
          <p>{msg.message}</p>
          <p className="text-xs text-gray-500 mt-2">
            {msg.author_type} {msg.author_email ? `· ${msg.author_email}` : ''}
          </p>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
