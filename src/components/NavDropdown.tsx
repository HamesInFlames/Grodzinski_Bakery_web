import { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  name: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  basePath: string;
  items: DropdownItem[];
  isActive: boolean;
  onNavigate?: () => void;
}

const CLOSE_DELAY = 150;

export default function NavDropdown({
  label,
  basePath,
  items,
  isActive,
  onNavigate,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setIsOpen(false), CLOSE_DELAY);
  }, [clearCloseTimer]);

  const handleMouseEnter = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    scheduleClose();
  };

  // Open on focus so keyboard users get the same disclosure as hover.
  const handleFocus = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const handleBlur = () => {
    scheduleClose();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        requestAnimationFrame(() => {
          const first = containerRef.current?.querySelector<HTMLAnchorElement>(
            '[role="menuitem"]',
          );
          first?.focus();
        });
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    const menuItems = containerRef.current?.querySelectorAll<HTMLAnchorElement>(
      '[role="menuitem"]',
    );
    if (!menuItems) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        menuItems[(index + 1) % menuItems.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        menuItems[(index - 1 + menuItems.length) % menuItems.length]?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        containerRef.current
          ?.querySelector<HTMLButtonElement>('.nav-dropdown__trigger')
          ?.focus();
        break;
    }
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  return (
    <div
      ref={containerRef}
      className={`nav-dropdown ${isOpen ? 'nav-dropdown--open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <NavLink
        to={basePath}
        end
        className={({ isActive: linkActive }) =>
          `navbar__link nav-dropdown__trigger ${linkActive || isActive ? 'navbar__link--active' : ''}`
        }
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(false);
          onNavigate?.();
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        {label}
        <ChevronDown
          size={14}
          className={`nav-dropdown__chevron ${isOpen ? 'nav-dropdown__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </NavLink>

      {isOpen && (
        <div className="nav-dropdown__panel" role="menu" aria-label={label}>
          <NavLink
            to={basePath}
            end
            role="menuitem"
            className="nav-dropdown__item nav-dropdown__item--all"
            onClick={() => {
              setIsOpen(false);
              onNavigate?.();
            }}
            onKeyDown={(e) => handleItemKeyDown(e, 0)}
          >
            All {label}
          </NavLink>
          {items.map((item, i) => (
            <NavLink
              key={item.href}
              to={item.href}
              role="menuitem"
              className="nav-dropdown__item"
              onClick={() => {
                setIsOpen(false);
                onNavigate?.();
              }}
              onKeyDown={(e) => handleItemKeyDown(e, i + 1)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

// Accordion variant for mobile drawer
export function MobileNavAccordion({
  label,
  basePath,
  items,
  isActive,
  onNavigate,
}: NavDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="mobile-accordion">
      <div className="mobile-accordion__header">
        <NavLink
          to={basePath}
          end
          className={({ isActive: linkActive }) =>
            `mobile-menu__link ${linkActive || isActive ? 'mobile-menu__link--active' : ''}`
          }
          onClick={() => onNavigate?.()}
        >
          {label}
        </NavLink>
        <button
          type="button"
          className="mobile-accordion__toggle"
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
          aria-label={`Show ${label} sub-pages`}
        >
          <ChevronDown
            size={16}
            className={`mobile-accordion__chevron ${isExpanded ? 'mobile-accordion__chevron--open' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>
      {isExpanded && (
        <ul className="mobile-accordion__links">
          {items.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className="mobile-accordion__link"
                onClick={() => onNavigate?.()}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
