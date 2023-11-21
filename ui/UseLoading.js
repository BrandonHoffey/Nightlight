import { useState, useCallback } from "react";

const UseLoading = (callback) => {
  const [loading, setLoading] = useState(false);

  const executeWithLoading = useCallback(
    async (text) => {
      if (text === undefined || text.trim() === "") {
        return;
      }

      setLoading(true);
      try {
        await callback(text);
      } finally {
        setLoading(false);
      }
    },
    [callback]
  );

  return [loading, executeWithLoading];
};

export default UseLoading;
