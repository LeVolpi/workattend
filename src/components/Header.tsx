"use client"

import { useEffect, useState } from 'react'
import type { AccountAction, NavigationItem } from '@/core/types/navigation'

type HeaderProps = {
  navigationItems: NavigationItem[]
  accountActions: AccountAction[]
}

function Header({ navigationItems, accountActions }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-top">
        <a className="brand" href="/" aria-label="WorkAttend home">
          <img
            src="/workattend-logo.svg"
            alt="WorkAttend"
          />
        </a>

        <div className="header-actions" aria-label="Account actions">
          {accountActions.map((action) => (
            <a className={action.variant === 'primary' ? 'started-link' : 'login-link'} href={action.href} key={action.href}>
              {action.label}
            </a>
          ))}
        </div>

        <button
          className={`menu-toggle${isMenuOpen ? ' open' : ''}`}
          type="button"
          aria-controls="main-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`main-nav${isMenuOpen ? ' open' : ''}`} id="main-navigation" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}

        <div className="mobile-account-actions" aria-label="Account actions">
          {accountActions.map((action) => (
            <a
              className={action.variant === 'primary' ? 'started-link' : 'login-link'}
              href={action.href}
              key={action.href}
              onClick={closeMenu}
            >
              {action.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
