import React, { useState } from "react";
import { useLang } from "../../contexts/LangContext";
import { Worker } from "../../types/user";
interface ContactModalProps {
  worker: Worker;
  isOpen: boolean;
  onClose: () => void;
}
const ContactModal: React.FC<ContactModalProps> = ({ worker, isOpen, onClose }) => {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(worker.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {t("contact.title")}
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">{t("contact.workerName")}</p>
                    <p className="mt-1 font-medium">{worker.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("contact.phone")}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="font-medium">{worker.phone}</p>
                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        className="ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1677ff] focus:ring-offset-2"
                      >
                        {copied ? t("contact.copied") : t("contact.copy")}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("contact.areas")}</p>
                    <p className="mt-1 font-medium">{worker.areas.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("contact.services")}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {worker.services.map((service: string) => (
                        <span
                          key={service}
                          className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                        >
                          {t(`serviceTypes.${service}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1677ff] focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
            >
              {t("common.close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactModal;

