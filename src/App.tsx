import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          家政服务平台
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">保洁服务</h2>
            <p className="text-gray-600">专业的保洁团队，为您提供全方位的清洁服务</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">维修服务</h2>
            <p className="text-gray-600">专业维修师傅，快速解决您的家居问题</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">搬家服务</h2>
            <p className="text-gray-600">专业搬家团队，让您的搬家更轻松</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
