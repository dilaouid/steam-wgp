import type { Meta, StoryObj } from '@storybook/react';

import { Trophy } from './Trophy';

const meta: Meta<typeof Trophy> = {
  title: 'Features/Atoms/Homepage/Trophy', // Chemin d'accès dans Storybook
  component: Trophy,
  tags: ['autodocs'], // Permet de générer automatiquement la documentation
  parameters: {
    layout: 'centered', // Centrer le composant dans Storybook pour une meilleure présentation
  },
  args: {
    color: 'gold', // Valeur par défaut pour les props

  },
};

export default meta;
type Story = StoryObj<typeof Trophy>;

// Exemple d'une story avec un trophée doré
export const GoldTrophy: Story = {
  args: {
    color: 'gold',
  },
};

// Exemple d'une story avec un trophée argenté
export const SilverTrophy: Story = {
  args: {
    color: 'silver',
  },
};

// Exemple d'une story sans couleur (comportement par défaut)
export const DefaultTrophy: Story = {};
