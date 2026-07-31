"use client";

import { useEffect, useState } from "react";

export function CurrentTime() {
  const [timeStr, setTimeStr] = useState<string>("21:59 WIB");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format time in 24-hour WIB (Asia/Jakarta)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat("en-GB", options).format(now);
      setTimeStr(`${formatted} WIB`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="whitespace-nowrap">
      CURRENT TIME: {timeStr}
    </span>
  );
}
