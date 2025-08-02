import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
  const [message, setMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => setIsOpen(true);
    socket.onmessage = (event) => setMessage(event.data);
    socket.onclose = () => setIsOpen(false);

    return () => {
      socket.close();
    };
  }, [url]);

  return { message, isOpen };
}