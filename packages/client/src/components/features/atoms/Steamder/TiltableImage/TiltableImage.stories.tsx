import type { Meta, StoryObj } from '@storybook/react';

import { TiltableImage } from './TiltableImage';

const meta: Meta<typeof TiltableImage> = {
  title: 'Features/Steamder/Atoms/TiltableImage',
  component: TiltableImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    alt: "Game cover for 1072420",
    gameId: 1072420,
    hovered: false,
    zoomAppears: false
  }
};

export default meta;
type Story = StoryObj<typeof TiltableImage>;

export const TiltableImageHovered: Story = {
    args: {
        hovered: true
    }
};

export const TiltableImageResultAppears: Story = {
    args: {
        zoomAppears: true
    }
};