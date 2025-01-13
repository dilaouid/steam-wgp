import type { Meta, StoryObj } from '@storybook/react';

import { PaginationSteamders as Comp } from './Pagination';

const meta: Meta<typeof Comp> = {
  title: 'Features/SteamdersList/Molecules',
  component: Comp,
  parameters: {
    layout: 'fullwidth',
  },
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 100,
    onPageChange: () => {}
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Pagination: Story = {
  args: {
    currentPage: 6
  }
};