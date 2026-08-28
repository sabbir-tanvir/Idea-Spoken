import React from 'react';
import NoticeList from '@/components/notice-board/NoticeList';
import { getNotices } from '@/lib/api/notices';

export default async function NoticeBoardPage() {
  const notices = await getNotices();

  return (
    <NoticeList notices={notices} />
  );
}
