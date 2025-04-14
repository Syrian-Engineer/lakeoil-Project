'use client';

import AvatarCard from '@/ui/avatar-card';
import { PiEyeFill } from 'react-icons/pi';
import { formatNumber } from '@/utils/format-number';
import CommentsIcon from '@/components/icons/comments';
import ThumbsUpIcon from '@/components/icons/thumbs-up';
import InstagramIcon from '@/components/icons/instagram';
import { createColumnHelper } from '@tanstack/react-table';
import LinkedInSquareIcon from '@/components/icons/linkedin-square';
import FacebookSquareIcon from '@/components/icons/facebook-square';
import { PostSummaryDataType } from '@/app/_data/social-media-dashboard-data';
import { Flex } from 'rizzui';

const columnHelper = createColumnHelper<PostSummaryDataType>();

export const defaultColumns = [
  columnHelper.accessor('image', {
    size: 300,
    header: 'Post Content',
    cell: ({ row: { original } }) => (
      <AvatarCard
        src={original.image}
        name={original.title}
        nameClassName="line-clamp-1"
        description={<span className="text-primary">{original.link}</span>}
        avatarProps={{
          rounded: 'sm',
          name: original.title,
          className: '!bg-transparent border border-muted overflow-hidden',
        }}
      />
    ),
  }),
  columnHelper.accessor('availabilityDate', {
    size: 160,
    header: 'Availability Date',
  }),
  columnHelper.accessor('views', {
    size: 120,
    header: 'Views',
    cell: (info) => (
      <Flex align="center" gap="1">
        <PiEyeFill className="size-4 text-green" />
        {formatNumber(info.getValue())}
      </Flex>
    ),
  }),
  columnHelper.accessor('likes', {
    size: 120,
    header: 'Likes',
    cell: (info) => (
      <Flex align="center" gap="1">
        <ThumbsUpIcon className="size-4" />
        {formatNumber(info.getValue())}
      </Flex>
    ),
  }),
  columnHelper.accessor('comments', {
    size: 120,
    header: 'Comments',
    cell: (info) => (
      <Flex align="center" gap="1">
        <CommentsIcon className="size-4 text-primary" />
        {info.getValue()}
      </Flex>
    ),
  }),
  columnHelper.accessor('platforms', {
    size: 120,
    header: 'Platforms',
    cell: () => (
      <Flex align="center" gap="2">
        <FacebookSquareIcon className="size-4" />
        <InstagramIcon className="size-4" />
        <LinkedInSquareIcon className="size-4" />
      </Flex>
    ),
  }),
];
