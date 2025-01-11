import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const WorkerRegister: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idCard: '',
    skills: [] as string[],
    experience: '',
    area: '',
    introduction: '',
  });

  const skills = [
    '水电维修',
    '管道疏通',
    '电器维修',
    '空调维修',
    '家具维修',
    '门窗维修',
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white h-14 flex items-center px-4 fixed top-0 left-0 right-0">
        <Link to="/" className="text-gray-600">
          <Icon icon="ri:arrow-left-s-line" className="text-2xl" />
        </Link>
        <h1 className="flex-1 text-center font-medium">师傅入驻</h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 pt-20 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* 步骤指示器 */}
          <div className="flex items-center justify-between mb-8">
            {['基本信息', '技能信息', '资质认证'].map((text, index) => (
              <div
                key={text}
                className={`flex items-center ${index < 2 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-green-500 text-white' :
                    step === index + 1 ? 'bg-blue-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > index + 1 ? (
                    <Icon icon="ri:check-line" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < 2 ? (step > index + 1 ? 'bg-green-500' : 'bg-gray-200') : 'hidden'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* 表单内容 */}
          <div className="bg-white rounded-lg p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">姓名</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="请输入真实姓名"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">手机号</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="请输入手机号"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">身份证号</label>
                  <input
                    type="text"
                    value={formData.idCard}
                    onChange={e => setFormData(prev => ({ ...prev, idCard: e.target.value }))}
                    placeholder="请输入身份证号"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">技能类型</label>
                  <div className="grid grid-cols-3 gap-2">
                    {skills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            skills: prev.skills.includes(skill)
                              ? prev.skills.filter(s => s !== skill)
                              : [...prev.skills, skill]
                          }));
                        }}
                        className={`p-2 text-sm rounded-lg ${
                          formData.skills.includes(skill)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">工作年限</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="请输入工作年限"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">服务区域</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={e => setFormData(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="请输入服务区域"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">上传身份证照片</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[1.6] border-2 border-dashed rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Icon icon="ri:add-line" className="text-2xl text-gray-400" />
                        <div className="text-sm text-gray-500">身份证正面</div>
                      </div>
                    </div>
                    <div className="aspect-[1.6] border-2 border-dashed rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Icon icon="ri:add-line" className="text-2xl text-gray-400" />
                        <div className="text-sm text-gray-500">身份证反面</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">上传资质证书</label>
                  <div className="aspect-video border-2 border-dashed rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon icon="ri:add-line" className="text-2xl text-gray-400" />
                      <div className="text-sm text-gray-500">点击上传资质证书</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(prev => prev - 1)}
                  className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-lg"
                >
                  上一步
                </button>
              )}
              <button
                onClick={() => {
                  if (step < 3) {
                    setStep(prev => prev + 1);
                  } else {
                    // 提交表单
                    console.log('提交表单', formData);
                  }
                }}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
              >
                {step === 3 ? '提交审核' : '下一步'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkerRegister;