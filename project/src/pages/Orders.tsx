import React from "react";
const Orders: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">暂无订单记录</p>
      </div>
    </div>
  );
};
export default Orders;
