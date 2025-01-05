import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import { RegisterWorkerData } from "../types/auth";
interface FormErrors {
  phone?: string;
  code?: string;
  password?: string;
  name?: string;
  services?: string;
  description?: string;
}
const RegisterWorker: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterWorkerData>({
    phone: "",
    code: "",
    password: "",
    name: "",
    services: [],
    description: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.registerWorker(formData);
      navigate("/register/success");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (field: keyof RegisterWorkerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">师傅注册</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* 表单内容 */}
      </form>
    </div>
  );
};
export default RegisterWorker;
