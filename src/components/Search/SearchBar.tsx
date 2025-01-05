import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../contexts/LangContext";
interface SearchBarProps {
  initialValues?: {
    service: string;
    area: string;
  };
}
const SearchBar: React.FC<SearchBarProps> = ({ initialValues }) => {
  const navigate = useNavigate();
  const { t } = useLang();
  const [service, setService] = useState(initialValues?.service || "");
  const [area, setArea] = useState(initialValues?.area || "");
  const serviceTypes = [
    { value: "waterproof", label: t("serviceTypes.waterproof") },
    { value: "plumbing", label: t("serviceTypes.plumbing") },
    { value: "lock", label: t("serviceTypes.lock") },
    { value: "electric", label: t("serviceTypes.electric") },
    { value: "ac", label: t("serviceTypes.ac") },
    { value: "appliance", label: t("serviceTypes.appliance") },
    { value: "furniture", label: t("serviceTypes.furniture") },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (service) params.append("service", service);
    if (area) params.append("area", area);
    navigate(`/workers?${params.toString()}`);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1677ff] transition-colors"
            >
              <option value="">{t("search.selectService")}</option>
              {serviceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">🔧</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder={t("search.areaPlaceholder")}
              className="block w-full pl-10 pr-3 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1677ff] transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">📍</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-[#1677ff] text-white rounded-lg hover:bg-[#4096ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1677ff] transition-colors"
        >
          {t("common.search")}
        </button>
      </div>
    </form>
  );
};
export default SearchBar;


