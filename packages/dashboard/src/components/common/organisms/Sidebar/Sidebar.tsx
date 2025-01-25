import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import * as Collapsible from '@radix-ui/react-collapsible'

import { Home, GamepadIcon, Users, Star, ExternalLink, LogOut, Menu } from 'lucide-react'
import SteamWGPLogo from '@assets/images/logo.png'

import { cn } from '@core/utils'

import { NavLink } from '@ui/atoms/NavLink'
import { NavGroup } from '@ui/molecules/NavGroup'
import { SidebarToggle } from '@ui/molecules/SidebarToggle'

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/games', icon: GamepadIcon, label: 'Jeux' },
    { to: '/players', icon: Users, label: 'Joueurs' },
    { to: '/steamders', icon: Star, label: 'Steamders' },
  ]

  const secondaryItems = [
    { to: 'https://steamwgp.fr', icon: ExternalLink, label: 'Voir le site', external: true },
    { to: '/logout', icon: LogOut, label: 'Déconnexion' }
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-40 rounded-md p-2 bg-white shadow-md lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <Collapsible.Root
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 transform transition-all duration-300',
          'bg-white border-r dark:bg-gray-900 dark:border-gray-800',
          'lg:translate-x-0',
          {
            'translate-x-0': mobileOpen,
            '-translate-x-full': !mobileOpen,
            'w-20': collapsed
          }
        )}
      >
        <div className="flex h-full flex-col gap-4">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-4 dark:border-gray-800">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={SteamWGPLogo}
                alt="SteamWGP Logo" 
                className={cn("h-8 w-8", { "w-full": !collapsed })} 
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-4 px-3">
            <NavGroup collapsed={collapsed}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  {...item}
                  isActive={location.pathname === item.to || location.pathname.startsWith(item.to) && item.to !== '/'}
                  collapsed={collapsed}
                />
              ))}
            </NavGroup>

            <NavGroup title="Actions" collapsed={collapsed}>
              {secondaryItems.map((item) => (
                <NavLink
                  key={item.to}
                  {...item}
                  collapsed={collapsed}
                />
              ))}
            </NavGroup>
          </nav>
        </div>

        {/* Desktop Toggle */}
        <SidebarToggle 
          collapsed={collapsed} 
          onToggle={() => setCollapsed(!collapsed)} 
        />
      </Collapsible.Root>
    </>
  )
}