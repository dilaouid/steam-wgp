import type { Meta, StoryObj } from '@storybook/react';

import { ParallaxBackgroundHome as Comp } from './ParallaxBackgroundHome';

const meta: Meta<typeof Comp> = {
  title: 'Features/Homepage/Organisms',
  component: Comp,
  parameters: {
    layout: 'fullwidth',
  }
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const ParallaxBackground: Story = {};