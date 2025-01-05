import React from "react";
const services = [
  { id: "waterproof", name: "防水补漏", icon: "💧" },
  { id: "plumbing", name: "管道疏通", icon: "🚰" },
  { id: "lock", name: "开锁换锁", icon: "��" },
  { id: "electric", name: "水电维修", icon: "⚡" },
  { id: "ac", name: "空调维修", icon: "❄️" },
  { id: "appliance-clean", name: "家电清洗", icon: "🧹" },
  { id: "appliance-repair", name: "家电维修", icon: "��" },
  { id: "furniture", name: "家俱维修", icon: "🪑" },
  { id: "drilling", name: "打孔安装", icon: "🔨" },
  { id: "tile", name: "瓷砖空鼓", icon: "🏗️" },
  { id: "mattress", name: "床垫清洗", icon: "🛏️" },
  { id: "sofa", name: "沙发清洗", icon: "🛋️" },
  { id: "pest", name: "消杀四害", icon: "🐜" },
  { id: "wall", name: "墙面翻新", icon: "🏠" },
  { id: "computer", name: "电脑维修", icon: "💻" },
  { id: "other", name: "其他维修", icon: "🛠️" },
];
const ServiceTypes: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">全部服务</h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="text-2xl mb-1">{service.icon}</span>
            <span className="text-sm text-gray-900 text-center">{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceTypes;
