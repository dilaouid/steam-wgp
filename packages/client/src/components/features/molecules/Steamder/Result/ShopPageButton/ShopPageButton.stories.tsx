import type { Meta, StoryObj } from '@storybook/react';

import { ShopPageButton as Comp } from './ShopPageButton';

const meta: Meta<typeof Comp> = {
  title: "Features/Steamder/Molecules/Result",
  component: Comp,
  parameters: {
    layout: "fullwidth"
  },
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const ShopPageButton: Story = {};