import { useEffect, useMemo, useState } from "react";
import { PartitionData } from "../types";
import getPartitionData from "../api/getPartitionData";

export interface PartitionDataType {
  isLoading: boolean;
  error: Error | null;
  data: PartitionData[] | null;
}

export default function usePartitionData() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PartitionData[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getPartitionData()
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const partitionData = useMemo(
    () => ({ isLoading, error, data }),
    [isLoading, error, data]
  );

  return partitionData;
}
