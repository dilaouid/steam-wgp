import type { Meta, StoryObj } from '@storybook/react';

import { HeroSection } from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Features/Homepage/Molecules/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullwidth'
  }
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const HeroSectionLoggedOut: Story = {
    parameters: {
        zustand: {
            authStore: {
                isAuthenticated: false
            }
        }
    }};

export const HeroSectionLoggedIn: Story = {
    parameters: {
        zustand: {
            authStore: {
                isAuthenticated: true
            }
        }
    }
};