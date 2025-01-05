import React from "react";
import { useLang } from "../contexts/LangContext";
import { Link } from "react-router-dom";
const Home: React.FC = () => {
  const { t } = useLang();
  return (
    <div className="container mx-auto px-4 fade-in">
      <div className="text-center py-16">
        <div className="mb-12">
          <img src="/logo.png" alt="急事帮" className="mx-auto h-24" />
          <h2 className="text-2xl text-blue-600 mt-4">有急事，找急事帮!</h2>
        </div>
        <div className="flex justify-center gap-4 mb-16">
          <select className="select w-48" defaultValue="">
            <option value="" disabled>{t("home.selectService")}</option>
            <option value="plumbing">{t("serviceTypes.plumbing")}</option>
            <option value="electrical">{t("serviceTypes.electrical")}</option>
            <option value="appliance">{t("serviceTypes.appliance")}</option>
            <option value="furniture">{t("serviceTypes.furniture")}</option>
          </select>
          <input
            type="text"
            placeholder={t("home.areaPlaceholder")}
            className="input w-48"
          />
          <button className="btn btn-primary">
            {t("common.search")}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="card p-8">
            <div className="text-blue-500 text-5xl mb-6">
              <i className="fas fa-bolt"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">快速响应</h3>
            <p className="text-gray-600">专业师傅15分钟内响应</p>
          </div>
          <div className="card p-8">
            <div className="text-green-500 text-5xl mb-6">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">品质保证</h3>
            <p className="text-gray-600">持证上岗，服务有保障</p>
          </div>
          <div className="card p-8">
            <div className="text-purple-500 text-5xl mb-6">
              <i className="fas fa-tag"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">价格透明</h3>
            <p className="text-gray-600">标准定价，拒绝乱收费</p>
          </div>
        </div>
        <div className="mt-20 bg-gray-50 py-16 rounded-lg">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">我是维修师傅</h3>
            <p className="text-gray-600 mb-8">加入我们，展示您的专业技能，获得更多订单机会</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              <div>
                <div className="font-bold mb-2">NO.规则</div>
                <p className="text-gray-600 text-sm">遵守平台规则，诚信服务</p>
              </div>
              <div>
                <div className="font-bold mb-2">高收益保障</div>
                <p className="text-gray-600 text-sm">合理定价，多劳多得</p>
              </div>
              <div>
                <div className="font-bold mb-2">灵活工作时间</div>
                <p className="text-gray-600 text-sm">自由安排，兼职全职皆可</p>
              </div>
            </div>
            <Link 
              to="/register/worker" 
              className="inline-block bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              立即注册为师傅
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
