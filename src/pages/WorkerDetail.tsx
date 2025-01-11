import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

const WorkerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 模拟数据
  const worker = {
    id: 1,
    name: '张师傅',
    skills: ['水电维修', '管道疏通'],
    rating: 4.9,
    serviceCount: 238,
    area: '朝阳区',
    experience: '5年维修经验',
    description: '专注水电维修，持有专业资质证书。价格合理，服务认真负责。',
    price: '上门费50元起',
    workTime: '8:00-21:00',
    phone: '13812345678',
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="p-4 bg-white">
        <h1 className="text-xl font-medium">{worker.name}</h1>
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

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <a
          href={`tel:${worker.phone}`}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg"
        >
          联系师傅
        </a>
      </div>
    </div>
  );
};

export default WorkerDetail;