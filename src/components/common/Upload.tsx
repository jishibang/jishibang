import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Button from './Button';

interface UploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // 单位：MB
  maxCount?: number;
  value?: string[];
  onChange?: (files: string[]) => void;
  error?: string;
  disabled?: boolean;
  tip?: string;
}

const Upload: React.FC<UploadProps> = ({
  label,
  accept = "image/*",
  maxSize = 5,
  maxCount = 1,
  value = [],
  onChange,
  error,
  disabled,
  tip,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    await handleFiles(droppedFiles);
  };

  const handleFiles = async (files: File[]) => {
    if (!files.length) return;

    // 检查文件数量
    if (value.length + files.length > maxCount) {
      alert(`最多只能上传 ${maxCount} 个文件`);
      return;
    }

    // 检查文件类型
    const invalidFiles = files.filter(file => !file.type.match(accept.replace('/*', '')));
    if (invalidFiles.length > 0) {
      alert(`请上传正确的文件类型：${accept}`);
      return;
    }

    // 检查文件大小
    const oversizedFiles = files.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`文件大小不能超过 ${maxSize}MB`);
      return;
    }

    setLoading(true);
    try {
      // TODO: 实现文件上传逻辑
      // 这里模拟上传过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟返回文件URL
      const newUrls = files.map(file => URL.createObjectURL(file));
      onChange?.([...value, ...newUrls]);
    } catch (error) {
      alert('上传失败，请重试');
    } finally {
      setLoading(false);
      // 清空 input 值，确保能重复上传同一个文件
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
  };

  const handleRemove = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange?.(newFiles);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="space-y-2">
        {value.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {value.map((file, index) => (
              <div
                key={file}
                className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={file}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-2 text-white hover:text-red-500 transition-colors"
                    disabled={disabled}
                  >
                    <Icon icon="ri:delete-bin-line" className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {value.length < maxCount && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={maxCount > 1}
              onChange={handleChange}
              className="hidden"
              disabled={disabled || loading}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleClick}
              loading={loading}
              disabled={disabled}
              className={`
                w-full h-32 flex flex-col items-center justify-center 
                border-2 border-dashed rounded-lg transition-colors
                ${dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-500'
                }
              `}
            >
              <Icon icon="ri:upload-cloud-line" className="text-3xl mb-2" />
              <span className="text-sm text-gray-600">
                {dragActive ? '释放鼠标上传' : '点击或拖拽上传'}
              </span>
              {tip && <span className="text-xs text-gray-500 mt-1">{tip}</span>}
            </Button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Upload;