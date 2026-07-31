"use client";

import { useEffect, useState } from "react";

export function CurrentTime() {
  const [timeStr, setTimeStr] = useState("--:--");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat("en-GB", options).format(now);
      setTimeStr(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="whitespace-nowrap">{timeStr}</span>;
}
