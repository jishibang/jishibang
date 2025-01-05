import React from "react";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <p className="text-gray-600">投诉电话：18607718001</p>
            <p className="text-gray-600">邮箱：qaoshanlu@jishibang.net</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <p className="text-gray-600">微信公众号：急事帮</p>
            <p className="text-gray-600">小红书：急事帮</p>
            <p className="text-gray-600">抖音号：急事帮</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">更多平台</h3>
            <p className="text-gray-600">Twitter：急事帮</p>
            <p className="text-gray-600">YouTube：急事帮</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-500">
          <p>桂ICP备20230043310号 | © 2024 急事帮 版权所有</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
