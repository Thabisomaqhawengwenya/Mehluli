import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TopoBackground } from './components/TopoBackground';
import { Navbar } from './components/Navbar';

// Import extracted assets
import page_1_img_2 from './assets/extracted/page_1_img_2.png';
import page_1_img_3 from './assets/extracted/page_1_img_3.png';
import page_1_img_4 from './assets/extracted/page_1_img_4.png';
import page_2_img_1 from './assets/extracted/page_2_img_1.png';
import page_3_img_1 from './assets/extracted/page_3_img_1.png';
import page_5_img_1 from './assets/extracted/page_5_img_1.png';
import page_5_img_2 from './assets/extracted/page_5_img_2.png';
import page_6_img_1 from './assets/extracted/page_6_img_1.png';
import page_6_img_2 from './assets/extracted/page_6_img_2.png';
import page_8_img_1 from './assets/extracted/page_8_img_1.png';
import page_8_img_2 from './assets/extracted/page_8_img_2.png';
import page_8_img_3 from './assets/extracted/page_8_img_3.png';
import page_8_img_4 from './assets/extracted/page_8_img_4.png';
import page_11_img_1 from './assets/extracted/page_11_img_1.jpg';
import page_14_img_1 from './assets/extracted/page_14_img_1.png';

// Global Layout & Scroll Containers
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background: #ffffff;

  @media (max-width: 768px) {
    scroll-snap-type: none;
    height: auto;
    overflow-y: auto;
  }
`;

const Section = styled.section<{ $bg?: string }>`
  position: relative;
  width: 100%;
  min-height: 100vh;
  scroll-snap-align: start;
  background: ${({ $bg }) => $bg || '#ffffff'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: visible;
  padding: 100px 60px 80px;

  @media (max-width: 768px) {
    min-height: 100svh;
    scroll-snap-align: none;
    padding: 120px 20px 80px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto 0;
  z-index: 10;

  @media (max-width: 768px) {
    margin: 0;
  }
`;


// Helper component for tilted titles
const TiltedTitleContainer = styled.div`
  transform: rotate(-3.5deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  margin: auto 0;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin: 40px 0;
  }
`;

const TiltedHeading = styled.h1<{ $color?: string; $size?: string }>`
  font-family: 'Bebas Neue', sans-serif;
  font-size: ${({ $size }) => $size || '7.5rem'};
  color: ${({ $color }) => $color || '#000000'};
  line-height: 0.9;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 5.5rem;
  }
  @media (max-width: 768px) {
    font-size: 3.8rem;
  }
`;

// Slide 1: Cover Page Elements
const CoverTopName = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: #000000;
  align-self: flex-start;
  margin-left: 15%;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-left: 5%;
  }
`;

const CoverBottomName = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: #000000;
  align-self: flex-end;
  margin-right: 15%;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-right: 5%;
  }
`;

const Tagline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #000000;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.2em;
    margin-bottom: 30px;
  }
`;

const PortraitsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const PortraitCard = styled.div`
  flex: 1;
  max-width: 290px;
  aspect-ratio: 0.8;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 80%;
    max-width: 260px;
  }
`;

const PortraitImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300vh;
  scroll-snap-align: start;

  @media (max-width: 768px) {
    height: auto;
    scroll-snap-align: none;
  }
`;

const AboutStickyWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: visible;
  padding: 100px 60px 140px;

  @media (max-width: 768px) {
    position: relative;
    height: auto;
    padding: 120px 20px 300px;
  }
`;

// Slide 2: About Me Elements
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1.3fr;
  gap: 60px;
  width: 100%;
  max-width: 1100px;
  align-items: center;
  z-index: 10;
  margin: auto 0;

  @media (max-width: 992px) {
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin: 0;
  }
`;

const AboutImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutPortrait = styled.img`
  max-width: 100%;
  max-height: 52vh;
  border-radius: 4px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  object-fit: cover;

  @media (max-width: 768px) {
    max-height: 45vh;
  }
`;

const AboutTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AboutParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333333;
  margin-bottom: 16px;
  text-align: justify;
  font-weight: 400;

  &:last-child {
    margin-bottom: 0;
    font-weight: 500;
    color: #000000;
  }

  @media (max-width: 768px) {
    font-size: 0.88rem;
  }
`;

// Slide 3: Table of Contents Elements
const ContentsCard = styled.div`
  position: relative;
  background: #fdfdfb;
  width: 100%;
  max-width: 950px;
  height: 60vh;
  border-radius: 0 250px 250px 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  /* CSS Grid pattern background */
  background-image: linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;

  @media (max-width: 768px) {
    height: auto;
    border-radius: 0 100px 100px 0;
    padding: 60px 20px;
    flex-direction: column;
    gap: 40px;
  }
`;

const TOCProfileWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 180px;
    height: 270px;
  }
`;

const TOCProfile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// Badges for Table of Contents
const BadgeBase = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: none;
  user-select: none;
  z-index: 12;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    position: static;
    transform: none;
    &:hover {
      transform: none;
    }
  }
`;

const BadgeNum = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #000000;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BadgeText = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.5px;
  text-align: center;
  margin-top: 2px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// 01 & 05 Circle Badges
const CircleBadge = styled(BadgeBase)<{ $top: string; $left?: string; $right?: string }>`
  top: ${({ $top }) => $top};
  ${({ $left }) => $left ? `left: ${$left};` : ''}
  ${({ $right }) => $right ? `right: ${$right};` : ''}
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 1.5px solid #000000;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

// 02 & 04 Ticket-stub Notched Badges (using SVG Overlay)
const NotchedBadge = styled(BadgeBase)<{ $top: string; $left?: string; $right?: string }>`
  top: ${({ $top }) => $top};
  ${({ $left }) => $left ? `left: ${$left};` : ''}
  ${({ $right }) => $right ? `right: ${$right};` : ''}
  width: 120px;
  height: 70px;
  position: absolute;

  @media (max-width: 768px) {
    position: static;
    width: 110px;
    height: 64px;
  }
`;

const NotchedSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`;

const NotchedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 03 Rounded Rect Badge
const RoundedRectBadge = styled(BadgeBase)<{ $top: string; $left?: string; $right?: string }>`
  top: ${({ $top }) => $top};
  ${({ $left }) => $left ? `left: ${$left};` : ''}
  ${({ $right }) => $right ? `right: ${$right};` : ''}
  width: 130px;
  height: 75px;
  border-radius: 12px;
  border: 1.5px solid #000000;

  @media (max-width: 768px) {
    width: 110px;
    height: 65px;
  }
`;

// 06 Tilted Rect Badge
const TiltedRectBadge = styled(BadgeBase)<{ $top: string; $left?: string; $right?: string }>`
  top: ${({ $top }) => $top};
  ${({ $left }) => $left ? `left: ${$left};` : ''}
  ${({ $right }) => $right ? `right: ${$right};` : ''}
  width: 120px;
  height: 75px;
  border: 1.5px solid #000000;
  transform: rotate(8deg);

  &:hover {
    transform: rotate(8deg) scale(1.08);
  }

  @media (max-width: 768px) {
    transform: none;
    width: 110px;
    height: 65px;
    &:hover {
      transform: none;
    }
  }
`;

// Grid/Flex wrapper for mobile badges layout
const MobileBadgesGrid = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    justify-items: center;
    align-items: center;
  }
`;

// Work slides content layouts
const WorkPageGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 1000px;
  height: 75vh;
  z-index: 10;
  margin: auto 0;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 30px;
    margin: 0;
  }
`;

const PosterWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 460px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 340px;
    aspect-ratio: 0.8;
  }
`;

const Poster = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.02);
`;

// Logos layout
const LogosGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
  max-width: 900px;
  z-index: 10;
  margin: auto 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 0;
  }
`;

const LogoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 62vh;

  @media (max-width: 768px) {
    height: auto;
    gap: 20px;
  }
`;

const LogoHeaderImg = styled.img<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  max-width: 90%;
  object-fit: contain;

  @media (max-width: 768px) {
    height: ${({ $height }) => Math.min($height, 60)}px;
  }
`;

const LogoMockupImg = styled.img`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1.25;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

// Text Detail layout for Batsi Fix / BMW
const DetailTextWrapper = styled.div`
  width: 100%;
  max-width: 850px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
  padding: 0 20px;
  margin: auto 0;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const DetailTitle = styled.h2`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.5rem;
  letter-spacing: 0.5px;
  color: #000000;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const DetailScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300vh;
  scroll-snap-align: start;

  @media (max-width: 768px) {
    height: auto;
    scroll-snap-align: none;
  }
`;

const DetailStickyWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: visible;
  padding: 100px 60px 140px;

  @media (max-width: 768px) {
    position: relative;
    height: auto;
    padding: 120px 20px 300px;
  }
`;

const DetailParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  line-height: 1.65;
  color: #222222;
  margin-bottom: 18px;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 0.88rem;
  }
`;

const DetailFooter = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #000000;
  margin-top: 20px;
  display: inline-block;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const MockupContainer = styled.div`
  width: 100%;
  max-width: 1050px;
  height: 78vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  margin: auto 0;

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 1.4;
    margin: 0;
  }
`;

const FullMockupImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export default function App() {
  const [activeSection, setActiveSection] = useState('cover');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [brandScrollProgress, setBrandScrollProgress] = useState(0);
  const [editorialScrollProgress, setEditorialScrollProgress] = useState(0);

  const aboutOuterRef = useRef<HTMLDivElement>(null);
  const brandOuterRef = useRef<HTMLDivElement>(null);
  const editorialOuterRef = useRef<HTMLDivElement>(null);

  // Setup scroll progress listener for scrollytelling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight;
          const isMobile = window.innerWidth <= 768;

          // 1. About Me progress
          if (aboutOuterRef.current) {
            const rect = aboutOuterRef.current.getBoundingClientRect();
            if (!isMobile) {
              const totalScrollableHeight = rect.height - viewportHeight;
              if (totalScrollableHeight > 0) {
                const scrollTop = -rect.top;
                let progress = scrollTop / totalScrollableHeight;
                progress = Math.max(0, Math.min(1, progress));
                setScrollProgress(progress);
              }
            } else {
              const startY = viewportHeight;
              const endY = 300;
              const currentY = rect.top;
              let progress = (startY - currentY) / (startY - endY);
              progress = Math.max(0, Math.min(1, progress));
              setScrollProgress(progress);
            }
          }

          // 2. Batsi Fix progress
          if (brandOuterRef.current) {
            const rect = brandOuterRef.current.getBoundingClientRect();
            if (!isMobile) {
              const totalScrollableHeight = rect.height - viewportHeight;
              if (totalScrollableHeight > 0) {
                const scrollTop = -rect.top;
                let progress = scrollTop / totalScrollableHeight;
                progress = Math.max(0, Math.min(1, progress));
                setBrandScrollProgress(progress);
              }
            } else {
              const startY = viewportHeight;
              const endY = 300;
              const currentY = rect.top;
              let progress = (startY - currentY) / (startY - endY);
              progress = Math.max(0, Math.min(1, progress));
              setBrandScrollProgress(progress);
            }
          }

          // 3. BMW Magazine progress
          if (editorialOuterRef.current) {
            const rect = editorialOuterRef.current.getBoundingClientRect();
            if (!isMobile) {
              const totalScrollableHeight = rect.height - viewportHeight;
              if (totalScrollableHeight > 0) {
                const scrollTop = -rect.top;
                let progress = scrollTop / totalScrollableHeight;
                progress = Math.max(0, Math.min(1, progress));
                setEditorialScrollProgress(progress);
              }
            } else {
              const startY = viewportHeight;
              const endY = 300;
              const currentY = rect.top;
              let progress = (startY - currentY) / (startY - endY);
              progress = Math.max(0, Math.min(1, progress));
              setEditorialScrollProgress(progress);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const getParagraphProgressStyle = (index: number) => {
    // Reveal paragraphs sequentially from progress 0.1 to 0.85
    const start = 0.1 + index * 0.15;
    const end = start + 0.15;

    let opacity = 0;
    let translateY = 20;

    if (scrollProgress >= start) {
      if (scrollProgress >= end) {
        opacity = 1;
        translateY = 0;
      } else {
        const t = (scrollProgress - start) / (end - start);
        opacity = t;
        translateY = 20 - t * 20;
      }
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    };
  };

  const getBrandParagraphStyle = (index: number) => {
    // Reveal paragraphs sequentially from progress 0.1 to 0.85
    const start = 0.1 + index * 0.15;
    const end = start + 0.15;

    let opacity = 0;
    let translateY = 20;

    if (brandScrollProgress >= start) {
      if (brandScrollProgress >= end) {
        opacity = 1;
        translateY = 0;
      } else {
        const t = (brandScrollProgress - start) / (end - start);
        opacity = t;
        translateY = 20 - t * 20;
      }
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    };
  };

  const getEditorialParagraphStyle = (index: number) => {
    // Reveal paragraphs sequentially from progress 0.1 to 0.82
    const start = 0.1 + index * 0.18;
    const end = start + 0.18;

    let opacity = 0;
    let translateY = 20;

    if (editorialScrollProgress >= start) {
      if (editorialScrollProgress >= end) {
        opacity = 1;
        translateY = 0;
      } else {
        const t = (editorialScrollProgress - start) / (end - start);
        opacity = t;
        translateY = 20 - t * 20;
      }
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    };
  };

  // Setup scroll listener / IntersectionObserver to detect active slide
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-45% 0px -45% 0px', // Center-focused spy window (detects section at center 10% of viewport)
      threshold: 0, // trigger immediately upon entering the center strip
    };

    const sectionElements = document.querySelectorAll('.portfolio-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar activeSection={activeSection} />
      <AppContainer ref={scrollContainerRef}>
        
        {/* Slide 1: Cover Page */}
        <Section id="cover" className="portfolio-section">
          <TopoBackground showAllCorners />
          <ContentWrapper>
            <TiltedTitleContainer>
              <CoverTopName>MEHLULI</CoverTopName>
              <TiltedHeading $size="8rem">GRAPHIC DESIGNER</TiltedHeading>
              <CoverBottomName>NCUBE</CoverBottomName>
            </TiltedTitleContainer>
            <Tagline>DESIGNING PROJECTS THAT INSPIRE</Tagline>
            
            <PortraitsRow>
              <PortraitCard>
                <PortraitImage src={page_1_img_2} alt="Mehluli Portrait 1" />
              </PortraitCard>
              <PortraitCard>
                <PortraitImage src={page_1_img_3} alt="Mehluli Portrait 2" />
              </PortraitCard>
              <PortraitCard>
                <PortraitImage src={page_1_img_4} alt="Mehluli Portrait 3" />
              </PortraitCard>
            </PortraitsRow>
          </ContentWrapper>
        </Section>

        {/* Slide 2: About Me */}
        <AboutScrollContainer id="about" ref={aboutOuterRef} className="portfolio-section">
          <AboutStickyWrapper>
            <TopoBackground />
            <AboutGrid>
              <AboutImageWrapper>
                <AboutPortrait src={page_2_img_1} alt="Mehluli Polaroid Suspender Portrait" />
              </AboutImageWrapper>
              <AboutTextContainer>
                <TiltedTitleContainer style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
                  <TiltedHeading $size="4.5rem">ABOUT ME</TiltedHeading>
                </TiltedTitleContainer>
                
                <AboutParagraph style={getParagraphProgressStyle(0)}>
                  I’m Mehluli Ncube, a Product Designer specializing in UI/UX Design, Graphic Design, and Branding at Uncommon.org. I help businesses transform ideas into user-focused digital experiences and compelling brand identities that build trust, attract customers, and drive growth.
                </AboutParagraph>
                <AboutParagraph style={getParagraphProgressStyle(1)}>
                  I believe great design is more than aesthetics it solves problems, improves customer experiences, and creates meaningful connections between brands and people. Whether it's designing intuitive mobile and web interfaces, developing memorable brand identities, or creating impactful marketing materials, my goal is to deliver solutions that help businesses stand out in competitive markets.
                </AboutParagraph>
                <AboutParagraph style={getParagraphProgressStyle(2)}>
                  My approach combines strategic thinking, creativity, and attention to detail. Every project begins with understanding your business goals, your audience, and the challenges you want to solve. From there, I create designs that are modern, functional, and focused on delivering measurable results.
                </AboutParagraph>
                <AboutParagraph style={getParagraphProgressStyle(3)}>
                  If you're a startup looking to build a strong brand, a growing business wanting a better digital experience, or an established company seeking fresh creative direction, I'm ready to help turn your vision into reality.
                </AboutParagraph>
                <AboutParagraph style={getParagraphProgressStyle(4)}>
                  Let's build experiences your customers will remember and a brand they'll trust.
                </AboutParagraph>
              </AboutTextContainer>
            </AboutGrid>
          </AboutStickyWrapper>
        </AboutScrollContainer>

        {/* Slide 3: Table of Contents */}
        <Section id="toc" $bg="#0a090b" className="portfolio-section">
          <TopoBackground dark />
          <ContentWrapper>
            <TiltedTitleContainer style={{ marginBottom: '20px' }}>
              <TiltedHeading $size="4.5rem" $color="#ffffff">TABLE OF CONTENTS</TiltedHeading>
            </TiltedTitleContainer>
            
            <ContentsCard>
              {/* Badges positioned absolutely on desktop */}
              {/* 01 Cover Page */}
              <CircleBadge 
                $top="40px" 
                $left="100px" 
                onClick={() => scrollToSection('cover')}
              >
                <BadgeNum>01</BadgeNum>
                <BadgeText>Cover Page</BadgeText>
              </CircleBadge>

              {/* 02 About */}
              <NotchedBadge 
                $top="180px" 
                $left="60px" 
                onClick={() => scrollToSection('about')}
              >
                <NotchedSvg viewBox="0 0 120 70">
                  <path 
                    d="M 12,0 C 12,8 8,12 0,12 L 0,58 C 8,58 12,62 12,70 L 108,70 C 108,62 112,58 120,58 L 120,12 C 112,12 108,8 108,0 Z" 
                    fill="none" 
                    stroke="#000000" 
                    strokeWidth="1.5" 
                  />
                </NotchedSvg>
                <NotchedContent>
                  <BadgeNum>02</BadgeNum>
                  <BadgeText>About</BadgeText>
                </NotchedContent>
              </NotchedBadge>

              {/* 03 Social Media Poster */}
              <RoundedRectBadge 
                $top="310px" 
                $left="180px" 
                onClick={() => scrollToSection('posters-divider')}
              >
                <BadgeNum>03</BadgeNum>
                <BadgeText>Social Media<br/>Poster</BadgeText>
              </RoundedRectBadge>

              {/* Mehluli Profile cutout in the center */}
              <TOCProfileWrapper>
                <TOCProfile src={page_3_img_1} alt="Mehluli Profile Cutout" />
              </TOCProfileWrapper>

              {/* 04 Logos */}
              <NotchedBadge 
                $top="70px" 
                $right="220px" 
                onClick={() => scrollToSection('logos-divider')}
              >
                <NotchedSvg viewBox="0 0 120 70">
                  <path 
                    d="M 12,0 C 12,8 8,12 0,12 L 0,58 C 8,58 12,62 12,70 L 108,70 C 108,62 112,58 120,58 L 120,12 C 112,12 108,8 108,0 Z" 
                    fill="none" 
                    stroke="#000000" 
                    strokeWidth="1.5" 
                  />
                </NotchedSvg>
                <NotchedContent>
                  <BadgeNum>04</BadgeNum>
                  <BadgeText>Logos</BadgeText>
                </NotchedContent>
              </NotchedBadge>

              {/* 05 Brand Identity */}
              <CircleBadge 
                $top="320px" 
                $right="200px" 
                onClick={() => scrollToSection('brand-divider')}
              >
                <BadgeNum>05</BadgeNum>
                <BadgeText>Brand<br/>Identity</BadgeText>
              </CircleBadge>

              {/* 06 Editorial Design */}
              <TiltedRectBadge 
                $top="200px" 
                $right="60px" 
                onClick={() => scrollToSection('editorial-divider')}
              >
                <BadgeNum>06</BadgeNum>
                <BadgeText>Editorial<br/>Design</BadgeText>
              </TiltedRectBadge>

              {/* Badges grid for mobile (when absolute items are hidden/reflowed) */}
              <MobileBadgesGrid>
                <CircleBadge $top="0" $left="0" onClick={() => scrollToSection('cover')}>
                  <BadgeNum>01</BadgeNum>
                  <BadgeText>Cover Page</BadgeText>
                </CircleBadge>
                <NotchedBadge $top="0" $left="0" onClick={() => scrollToSection('about')}>
                  <NotchedSvg viewBox="0 0 120 70">
                    <path d="M 12,0 C 12,8 8,12 0,12 L 0,58 C 8,58 12,62 12,70 L 108,70 C 108,62 112,58 120,58 L 120,12 C 112,12 108,8 108,0 Z" fill="none" stroke="#000000" strokeWidth="1.5" />
                  </NotchedSvg>
                  <NotchedContent>
                    <BadgeNum>02</BadgeNum>
                    <BadgeText>About</BadgeText>
                  </NotchedContent>
                </NotchedBadge>
                <RoundedRectBadge $top="0" $left="0" onClick={() => scrollToSection('posters-divider')}>
                  <BadgeNum>03</BadgeNum>
                  <BadgeText>Social Media</BadgeText>
                </RoundedRectBadge>
                <NotchedBadge $top="0" $left="0" onClick={() => scrollToSection('logos-divider')}>
                  <NotchedSvg viewBox="0 0 120 70">
                    <path d="M 12,0 C 12,8 8,12 0,12 L 0,58 C 8,58 12,62 12,70 L 108,70 C 108,62 112,58 120,58 L 120,12 C 112,12 108,8 108,0 Z" fill="none" stroke="#000000" strokeWidth="1.5" />
                  </NotchedSvg>
                  <NotchedContent>
                    <BadgeNum>04</BadgeNum>
                    <BadgeText>Logos</BadgeText>
                  </NotchedContent>
                </NotchedBadge>
                <CircleBadge $top="0" $left="0" onClick={() => scrollToSection('brand-divider')}>
                  <BadgeNum>05</BadgeNum>
                  <BadgeText>Brand Identity</BadgeText>
                </CircleBadge>
                <TiltedRectBadge $top="0" $left="0" onClick={() => scrollToSection('editorial-divider')}>
                  <BadgeNum>06</BadgeNum>
                  <BadgeText>Editorial</BadgeText>
                </TiltedRectBadge>
              </MobileBadgesGrid>
            </ContentsCard>
          </ContentWrapper>
        </Section>

        {/* Slide 4: Social Media Posters Divider */}
        <Section id="posters-divider" className="portfolio-section">
          <TopoBackground />
          <TiltedTitleContainer>
            <TiltedHeading $size="8rem">SOCIAL MEDIA POSTERS</TiltedHeading>
          </TiltedTitleContainer>
        </Section>

        {/* Slide 5: Posters Grid 1 */}
        <Section id="posters-1" className="portfolio-section">
          <WorkPageGrid>
            <PosterWrapper>
              <Poster src={page_5_img_1} alt="Nike Air Jordan Just Do It Poster" />
            </PosterWrapper>
            <PosterWrapper>
              <Poster src={page_5_img_2} alt="eKhaya Take a Bite of Happiness Burger Poster" />
            </PosterWrapper>
          </WorkPageGrid>
        </Section>

        {/* Slide 6: Posters Grid 2 */}
        <Section id="posters-2" className="portfolio-section">
          <WorkPageGrid>
            <PosterWrapper>
              <Poster src={page_6_img_1} alt="Fitlife Weekend Bootcamp Outdoor Fitness Poster" />
            </PosterWrapper>
            <PosterWrapper>
              <Poster src={page_6_img_2} alt="Mylik Wilson Freshman of the Year Basketball Poster" />
            </PosterWrapper>
          </WorkPageGrid>
        </Section>

        {/* Slide 7: Logos Divider */}
        <Section id="logos-divider" className="portfolio-section">
          <TopoBackground />
          <TiltedTitleContainer>
            <TiltedHeading $size="8rem">LOGOS</TiltedHeading>
          </TiltedTitleContainer>
        </Section>

        {/* Slide 8: Logos Work */}
        <Section id="logos-work" className="portfolio-section">
          <LogosGrid>
            <LogoColumn>
              <LogoHeaderImg src={page_8_img_3} $height={80} alt="Batsi Fix Logo" />
              <LogoMockupImg src={page_8_img_2} alt="Batsi Fix Round Sign Mockup" />
            </LogoColumn>
            <LogoColumn>
              <LogoHeaderImg src={page_8_img_4} $height={100} alt="Mojito Juice Logo" />
              <LogoMockupImg src={page_8_img_1} alt="Mojito Juice Bottle Mockup" />
            </LogoColumn>
          </LogosGrid>
        </Section>

        {/* Slide 9: Brand Identity Divider */}
        <Section id="brand-divider" className="portfolio-section">
          <TopoBackground />
          <TiltedTitleContainer>
            <TiltedHeading $size="8rem">BRAND IDENTITY</TiltedHeading>
          </TiltedTitleContainer>
        </Section>

        {/* Slide 10: Brand Identity Detail */}
        <DetailScrollContainer id="brand-detail" ref={brandOuterRef} className="portfolio-section">
          <DetailStickyWrapper>
            <TopoBackground />
            <DetailTextWrapper>
              <DetailTitle>BATSI FIX</DetailTitle>
              <DetailParagraph style={getBrandParagraphStyle(0)}>
                Batsi Fix is a modern home services platform created to connect homeowners and businesses with trusted, skilled professionals. The brand provides convenient access to reliable services including plumbing, electrical work, carpentry, welding, cleaning, painting, and general maintenance. The goal was to develop a visual identity that communicates trust, reliability, convenience, and professionalism while remaining approachable and easy to recognize across both print and digital platforms.
              </DetailParagraph>
              <DetailParagraph style={getBrandParagraphStyle(1)}>
                The project began with research and moodboarding to establish Batsi Fix's personality, visual direction, and target audience. From there, I developed a distinctive visual identity that reflects the brand's commitment to making home services easier and more accessible. The design focuses on a clean, modern, and user-friendly aesthetic that builds confidence between customers and service professionals.
              </DetailParagraph>
              <DetailParagraph style={getBrandParagraphStyle(2)}>
                To create a consistent identity, I extended the brand across a range of touchpoints, including business cards, promotional materials, branded workwear, service-related graphics, and digital applications. Each element was designed to work together as a cohesive system, ensuring that Batsi Fix remains consistent, professional, and memorable at every customer interaction.
              </DetailParagraph>
              <DetailParagraph style={getBrandParagraphStyle(3)}>
                This project strengthened my understanding of logo design, brand systems, visual consistency, colour strategy, typography, and brand communication. It also helped me explore how a strong visual identity can communicate trust and make a service-based business feel more professional and accessible.
              </DetailParagraph>
              <DetailFooter style={getBrandParagraphStyle(4)}>#FIXINGHOMES, BUILDING TRUST</DetailFooter>
            </DetailTextWrapper>
          </DetailStickyWrapper>
        </DetailScrollContainer>

        {/* Slide 11: Brand Identity Mockup */}
        <Section id="brand-work" className="portfolio-section">
          <MockupContainer>
            <FullMockupImg src={page_11_img_1} alt="Batsi Fix Branding Design Presentation" />
          </MockupContainer>
        </Section>

        {/* Slide 12: Editorial Design Divider */}
        <Section id="editorial-divider" className="portfolio-section">
          <TopoBackground />
          <TiltedTitleContainer>
            <TiltedHeading $size="8rem">EDITORIAL DESIGN</TiltedHeading>
          </TiltedTitleContainer>
        </Section>

        {/* Slide 13: Editorial Design Detail */}
        <DetailScrollContainer id="editorial-detail" ref={editorialOuterRef} className="portfolio-section">
          <DetailStickyWrapper>
            <TopoBackground />
            <DetailTextWrapper>
              <DetailTitle>BMW M30 MAGAZINE</DetailTitle>
              <DetailParagraph style={getEditorialParagraphStyle(0)}>
                The BMW M30 editorial magazine was designed to celebrate the legacy, performance, and timeless design of the BMW M30 through a premium automotive editorial experience. The objective was to create a sophisticated publication that combines powerful imagery, strong typography, and engaging storytelling to communicate the character and heritage of the iconic vehicle.
              </DetailParagraph>
              <DetailParagraph style={getEditorialParagraphStyle(1)}>
                The layouts were developed using a clean editorial grid, creating a balanced interplay among photography, typography, and negative space. High-quality automotive imagery served as the primary visual element, while bold headlines and contrasting typography were used to create a strong visual hierarchy and guide the reader through each story.
              </DetailParagraph>
              <DetailParagraph style={getEditorialParagraphStyle(2)}>
                The magazine uses a minimal and modern colour approach, with neutral tones complemented by yellow accents to create emphasis and reinforce the performance-driven character of the BMW M30. Each spread was designed to maintain consistency while allowing the photography and editorial content to create visual impact.
              </DetailParagraph>
              <DetailParagraph style={getEditorialParagraphStyle(3)}>
                This project strengthened my understanding of editorial hierarchy, grid systems, typography, image composition, layout design, and visual storytelling. It also allowed me to explore how editorial design can communicate the history, engineering, performance, and personality of an automotive brand through a cohesive print experience.
              </DetailParagraph>
            </DetailTextWrapper>
          </DetailStickyWrapper>
        </DetailScrollContainer>

        {/* Slide 14: Editorial Design Mockup */}
        <Section id="editorial-work" className="portfolio-section">
          <MockupContainer>
            <FullMockupImg src={page_14_img_1} alt="BMW M30 Editorial Magazine Cover Mockup" />
          </MockupContainer>
        </Section>

        {/* Slide 15: Thank You */}
        <Section id="thank-you" className="portfolio-section">
          <TopoBackground showAllCorners />
          <TiltedTitleContainer>
            <TiltedHeading $size="8.5rem">THANK YOU</TiltedHeading>
          </TiltedTitleContainer>
        </Section>

      </AppContainer>
    </>
  );
}
