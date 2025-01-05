import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../services/api";
import { Worker } from "../types/user";
const WorkerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  useEffect(() => {
    if (id) {
      fetchWorkerDetail();
    }
  }, [id]);
  const fetchWorkerDetail = async () => {
    try {
      const response = await apiService.getWorkerDetail(id!);
      setWorker(response);
    } catch (error) {
      console.error(error);
    }
  };
  if (!worker) {
    return <div>加载中...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{worker.name}</h1>
      {/* 师傅详细信息 */}
    </div>
  );
};
export default WorkerDetail;
