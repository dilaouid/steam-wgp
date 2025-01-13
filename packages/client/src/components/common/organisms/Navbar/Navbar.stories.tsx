import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Common/Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
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
type Story = StoryObj<typeof Navbar>;

export const NavbarLogOut: Story = {
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

export const NavbarLoggedIn: Story = {
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