import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '../contexts/LangContext';
import { apiService } from '../services/api';

interface Order {
  id: string;
  userId: string;
  workerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  type: string;
  service: string;
  description: string;
  address: string;
  price: number;
  createdAt: string;
  user: {
    username: string;
    phone: string;
  };
}

const WorkerOrders = () => {
  const { user } = useAuth();
  const { t } = useLang();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'ongoing' | 'completed'>('pending');

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await apiService.getWorkerOrders(activeTab);
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await apiService.acceptOrder(orderId);
      fetchOrders();
    } catch (error) {
      alert('接单失败');
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      await apiService.rejectOrder(orderId);
      fetchOrders();
    } catch (error) {
      alert('拒单失败');
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await apiService.completeOrder(orderId);
      fetchOrders();
    } catch (error) {
      alert('完成订单失败');
    }
  };

  const renderOrderStatus = (status: Order['status']) => {
    const statusMap = {
      pending: { text: '待接单', color: 'text-yellow-600 bg-yellow-100' },
      accepted: { text: '进行中', color: 'text-blue-600 bg-blue-100' },
      rejected: { text: '已拒绝', color: 'text-red-600 bg-red-100' },
      completed: { text: '已完成', color: 'text-green-600 bg-green-100' },
    };

    const { text, color } = statusMap[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">工单管理</h1>
        </div>
      </div>

      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              待接单
            </button>
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`${
                activeTab === 'ongoing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              进行中
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              已完成
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              加载中...
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无订单</p>
          </div>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          订单信息
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          用户信息
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          状态
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          金额
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">操作</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="font-medium text-gray-900">{order.type}</div>
                            <div className="text-gray-500">{order.service}</div>
                            <div className="text-gray-500">{order.address}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div>{order.user.username}</div>
                            <div>{order.user.phone}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {renderOrderStatus(order.status)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ¥{order.price}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {order.status === 'pending' && (
                              <div className="space-x-2">
                                <button
                                  onClick={() => handleAcceptOrder(order.id)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  接单
                                </button>
                                <button
                                  onClick={() => handleRejectOrder(order.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  拒绝
                                </button>
                              </div>
                            )}
                            {order.status === 'accepted' && (
                              <button
                                onClick={() => handleCompleteOrder(order.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                完成
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerOrders;