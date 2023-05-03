import axios from "axios";
import { PartitionData } from "../types";

export default async function getPartitionData() {
  const response = await axios.get<PartitionData[]>(`data.json`);
  return response.data;
}
