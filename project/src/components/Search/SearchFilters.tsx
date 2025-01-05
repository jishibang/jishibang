import React from "react";
import { useLang } from "../../contexts/LangContext";
interface SearchFiltersProps {
  filters: {
    experience: string;
    rating: string;
    verified: boolean;
  };
  onChange: (filters: any) => void;
}
const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onChange }) => {
  const { t } = useLang();
  const handleChange = (key: string, value: string | boolean) => {
    onChange({ ...filters, [key]: value });
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {t("search.filters")}
      </h3>
      {/* 从业年限筛选 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("search.experienceFilter")}
        </label>
        <select
          value={filters.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
        >
          <option value="">{t("search.allExperience")}</option>
          <option value="0-2">0-2 {t("common.years")}</option>
          <option value="3-5">3-5 {t("common.years")}</option>
          <option value="5-10">5-10 {t("common.years")}</option>
          <option value="10+">{t("search.moreThanTenYears")}</option>
        </select>
      </div>
      {/* 评分筛选 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("search.ratingFilter")}
        </label>
        <select
          value={filters.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
        >
          <option value="">{t("search.allRatings")}</option>
          <option value="4.5">4.5+ ⭐</option>
          <option value="4.0">4.0+ ⭐</option>
          <option value="3.5">3.5+ ⭐</option>
          <option value="3.0">3.0+ ⭐</option>
        </select>
      </div>
      {/* 认证筛选 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="verified"
          checked={filters.verified}
          onChange={(e) => handleChange("verified", e.target.checked)}
          className="h-4 w-4 text-[#1677ff] focus:ring-[#1677ff] border-gray-300 rounded"
        />
        <label htmlFor="verified" className="ml-2 text-sm text-gray-700">
          {t("search.verifiedOnly")}
        </label>
      </div>
    </div>
  );
};
export default SearchFilters;
