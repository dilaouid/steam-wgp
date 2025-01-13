import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Common/Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullwidth',
    zustand: {
        authStore: {
            isAuthenticated: false,
            toggleAuth: () => {},
            user: null,
            setUser: () => {}
        }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const FooterLogOut: Story = {
    parameters: {
        zustand: {
            authStore: {
                isAuthenticated: false,
                toggleAuth: () => {},
                user: {},
                setUser: () => {}
            }
        }
    }};

export const FooterLoggedIn: Story = {
    parameters: {
        zustand: {
            authStore: {
                isAuthenticated: true,
                toggleAuth: () => {},
                user: {
                    id: 1
                },
                setUser: () => {}
            }
        }
    }
};