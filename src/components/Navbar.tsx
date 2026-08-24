import { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav<{ $scrolled: boolean; $isDarkSection: boolean }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1000px;
  height: 60px;
  border-radius: 30px;
  background: ${({ $isDarkSection }) =>
    $isDarkSection ? 'rgba(20, 20, 20, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
  border: 1px solid ${({ $isDarkSection }) =>
    $isDarkSection ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, ${({ $isDarkSection }) => ($isDarkSection ? '0.3' : '0.05')});
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 15px;
    height: 50px;
    top: 10px;
  }
`;

const Logo = styled.a<{ $isDarkSection: boolean }>`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  letter-spacing: 1px;
  color: ${({ $isDarkSection }) => ($isDarkSection ? '#ffffff' : '#000000')};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;

  &:hover {
    color: #555555;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const NavLink = styled.a<{ $active: boolean; $isDarkSection: boolean }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  color: ${({ $active, $isDarkSection }) =>
    $active
      ? ($isDarkSection ? '#ffffff' : '#000000')
      : ($isDarkSection ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)')};
  position: relative;
  padding: 4px 0;
  transition: color 0.3s;

  &:hover {
    color: ${({ $isDarkSection }) => ($isDarkSection ? '#ffffff' : '#000000')};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    background: ${({ $isDarkSection }) => ($isDarkSection ? '#ffffff' : '#000000')};
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 2px 0;
    &:nth-child(4), &:nth-child(5) {
      display: none; /* Hide some links on mobile to fit the menu bar */
    }
  }
`;

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sections that have a dark background (Slide 3 is dark)
  const isDarkSection = activeSection === 'toc';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NavContainer $scrolled={scrolled} $isDarkSection={isDarkSection}>
      <Logo onClick={() => scrollToSection('cover')} $isDarkSection={isDarkSection}>
        MEHLULI NCUBE
      </Logo>
      <NavLinks>
        <NavLink
          onClick={() => scrollToSection('about')}
          $active={activeSection === 'about'}
          $isDarkSection={isDarkSection}
        >
          About
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('toc')}
          $active={activeSection === 'toc'}
          $isDarkSection={isDarkSection}
        >
          Contents
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('posters-divider')}
          $active={activeSection.includes('poster')}
          $isDarkSection={isDarkSection}
        >
          Posters
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('logos-divider')}
          $active={activeSection.includes('logo')}
          $isDarkSection={isDarkSection}
        >
          Logos
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('brand-divider')}
          $active={activeSection.includes('brand')}
          $isDarkSection={isDarkSection}
        >
          Identity
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('editorial-divider')}
          $active={activeSection.includes('editorial')}
          $isDarkSection={isDarkSection}
        >
          Editorial
        </NavLink>
      </NavLinks>
    </NavContainer>
  );
};
