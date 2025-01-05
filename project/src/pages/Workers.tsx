import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";
import { Worker } from "../types/user";
import { SearchParams } from "../types/api";
const Workers: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [params, setParams] = useState<SearchParams>({});
  useEffect(() => {
    fetchWorkers();
  }, [params]);
  const fetchWorkers = async () => {
    try {
      const response = await apiService.searchWorkers(params);
      setWorkers(response.workers);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">师傅列表</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map(worker => (
          <div key={worker.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">{worker.name}</h2>
            {/* 其他师傅信息 */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Workers;
