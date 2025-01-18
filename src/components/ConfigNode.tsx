import { memo } from 'react';
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
} from '@xyflow/react';
import { type ConfigNodeStruct } from '../nodes/types';

export const ConfigNode = memo(({ id, data }: NodeProps<ConfigNodeStruct>) => {
  const { updateNodeData } = useReactFlow();

  const handleChange = (field: keyof ConfigNodeStruct['data'], value: any) => {
    updateNodeData(id, { ...data, [field]: value });
  };

  const onMaxLengthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value || '100');
    const clampedValue = Math.min(Math.max(value, 10), 1000);
    e.target.value = clampedValue.toString();
    handleChange('maxLength', clampedValue);
  };

  return (
    <div className="flow-node-base min-w-[250px]">
      <div className="flex items-center justify-between w-full mb-4">
        <span className="font-medium">Configuration</span>
        <div className="custom-drag-handle" />
      </div>
      <div className="w-full space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox rounded text-node-selected"
            checked={data.useConventional ?? true}
            onChange={(e) => handleChange('useConventional', e.target.checked)}
          />
          <span className="text-sm">Use Conventional Commits</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox rounded text-node-selected"
            checked={data.detailed ?? true}
            onChange={(e) => handleChange('detailed', e.target.checked)}
          />
          <span className="text-sm">Generate Detailed Message</span>
        </label>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">Max Length (10 ~ 1000)</label>
          <input
            type="number"
            className="flow-text-box w-full"
            min={10}
            max={1000}
            value={data.maxLength || 100}
            onChange={(e) => handleChange('maxLength', parseInt(e.target.value || '100'))}
            onBlur={onMaxLengthBlur}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">Language</label>
          <select
            className="flow-text-box w-full"
            value={data.language ?? 'en'}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="flow-handle"
      />
    </div>
  );
});