import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Nearby: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');

  // 模拟数据
  const workers = [
    {
      id: 1,
      name: '张师傅',
      skills: ['水电维修', '管道疏通'],
      rating: 4.9,
      serviceCount: 238,
      area: '朝阳区',
      tags: ['认证技师', '5年经验'],
      phone: '13812345678',
    },
    // 更多师傅数据...
  ];

  // 筛选逻辑
  const filteredWorkers = workers.filter(worker => {
    if (selectedArea !== '全部' && worker.area !== selectedArea) return false;
    if (selectedType !== '全部' && !worker.skills.includes(selectedType)) return false;
    if (searchQuery && !worker.skills.some(skill => skill.includes(searchQuery))) return false;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto pb-16">
      <div className="sticky top-14 bg-white p-4 shadow-sm z-10">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Icon icon="ri:search-line" className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索维修类型或师傅..."
            className="ml-2 bg-transparent flex-1 outline-none"
          />
        </div>
      </div>

      <div className="divide-y">
        {filteredWorkers.map((worker) => (
          <Link
            key={worker.id}
            to={`/worker/${worker.id}`}
            className="block p-4 hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{worker.name}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {worker.area} · {worker.rating}分 · {worker.serviceCount}次服务
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {worker.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 text-sm bg-gray-100 text-gray-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={`tel:${worker.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600"
              >
                <Icon icon="ri:phone-fill" />
              </a>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nearby;