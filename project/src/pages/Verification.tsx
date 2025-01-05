import React, { useState } from "react";
import { useLang } from "../contexts/LangContext";
import { apiService } from "../services/api";
import { handleApiError } from "../utils/errorHandler";
const Verification: React.FC = () => {
  const { t } = useLang();
  const [form, setForm] = useState({
    realName: "",
    idNumber: "",
    frontImage: null as File | null,
    backImage: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      await apiService.submitVerification(formData);
      // 提交成功后的处理
    } catch (err) {
      handleApiError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">{t("verification.title")}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 text-red-600">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("verification.realName")}
          </label>
          <input
            type="text"
            value={form.realName}
            onChange={(e) => setForm(prev => ({ ...prev, realName: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("verification.idNumber")}
          </label>
          <input
            type="text"
            value={form.idNumber}
            onChange={(e) => setForm(prev => ({ ...prev, idNumber: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("verification.frontImage")}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm(prev => ({ ...prev, frontImage: e.target.files?.[0] || null }))}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#1677ff] hover:file:bg-blue-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("verification.backImage")}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm(prev => ({ ...prev, backImage: e.target.files?.[0] || null }))}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#1677ff] hover:file:bg-blue-100"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1677ff] hover:bg-[#4096ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1677ff] disabled:bg-blue-300"
        >
          {loading ? t("common.submitting") : t("common.submit")}
        </button>
      </form>
    </div>
  );
};
export default Verification;
