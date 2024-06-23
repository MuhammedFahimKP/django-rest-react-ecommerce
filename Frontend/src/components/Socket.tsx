import { useState, useEffect } from "react";

const Socket = () => {
  const [messages, setMessages] = useState<string[] | []>([]);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/random-string/");

    ws.onmessage = (event) => {
      const sockData = JSON.parse(event.data);
      setData(sockData);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        {messages.map((item: string) => (
          <li className="flex items-center" key={item}>
            <svg
              className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Socket;
