import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import { Card } from 'antd';
import React from 'react';

import './Welcome.css';
import './Welcome-dark.css';

interface InfoCardProps {
  title: string;
  index: number;
  desc: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title}>
    <Card hoverable size="small">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1677ff] text-base font-bold text-white">
          {index}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 mt-0 text-sm font-semibold">{title}</h4>
          <p className="mb-0 line-clamp-2 text-xs text-zinc-500">{desc}</p>
        </div>
      </div>
    </Card>
  </a>
);

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const isDark = initialState?.settings?.navTheme === 'realDark';

  return (
    <PageContainer title="欢迎使用 Ant Design Pro">
      <div
        data-theme={isDark ? 'dark' : 'light'}
        className="flex flex-col gap-6 md:flex-row"
      ></div>
    </PageContainer>
  );
};

export default Welcome;
