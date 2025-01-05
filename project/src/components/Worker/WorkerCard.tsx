﻿import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../contexts/LangContext";
import { Worker } from "../../types/user";
import Rating from "../common/Rating";
interface WorkerCardProps {
  worker: Worker;
}
const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const { t } = useLang();
  return (
    <Link
      to={`/workers/${worker.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={worker.avatar || "/default-avatar.png"}
            alt=""
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {worker.username}
                {worker.idCardVerified && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    ✓ {t("common.verified")}
                  </span>
                )}
              </h3>
              <Rating value={worker.rating || 0} />
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <span className="truncate">
                {t("worker.experience", { years: worker.experience })}
              </span>
              <span className="mx-2">•</span>
              <span className="truncate">{worker.areas.join(", ")}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {worker.services.map((service: string) => (
                <span
                  key={service}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {t(`serviceTypes.${service}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default WorkerCard;

