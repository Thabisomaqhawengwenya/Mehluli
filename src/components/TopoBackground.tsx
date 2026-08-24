import styled from 'styled-components';

interface TopoProps {
  dark?: boolean;
  showAllCorners?: boolean; // Page 1 has all four corners, other pages have top-left and bottom-right
}

const BackgroundWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const SvgContainer = styled.svg<{ $position: 'tl' | 'tr' | 'bl' | 'br' }>`
  position: absolute;
  width: 320px;
  height: 320px;
  opacity: 0.85;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  ${({ $position }) => {
    switch ($position) {
      case 'tl':
        return 'top: 0; left: 0;';
      case 'tr':
        return 'top: 0; right: 0;';
      case 'bl':
        return 'bottom: 0; left: 0;';
      case 'br':
        return 'bottom: 0; right: 0;';
    }
  }}
`;

export const TopoBackground: React.FC<TopoProps> = ({ dark = false, showAllCorners = false }) => {
  const strokeColor = dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.045)';

  return (
    <BackgroundWrapper className="topo-background">
      {/* Top Left Corner */}
      <SvgContainer viewBox="0 0 200 200" $position="tl">
        <g fill="none" stroke={strokeColor} strokeWidth="1.2">
          <path d="M-10,30 C30,30 30,-10 30,-10" />
          <path d="M-10,60 C60,60 60,-10 60,-10" />
          <path d="M-10,90 C90,90 90,-10 90,-10" />
          <path d="M-10,120 C120,120 120,-10 120,-10" />
          <path d="M-10,150 C150,150 150,-10 150,-10" />
          <path d="M-10,180 C180,180 180,-10 180,-10" />
          <path d="M-10,210 C210,210 210,-10 210,-10" />
        </g>
      </SvgContainer>

      {/* Bottom Right Corner */}
      <SvgContainer viewBox="0 0 200 200" $position="br">
        <g fill="none" stroke={strokeColor} strokeWidth="1.2">
          <path d="M210,170 C170,170 170,210 170,210" />
          <path d="M210,140 C140,140 140,210 140,210" />
          <path d="M210,110 C110,110 110,210 110,210" />
          <path d="M210,80 C80,80 80,210 80,210" />
          <path d="M210,50 C50,50 50,210 50,210" />
          <path d="M210,20 C20,20 20,210 20,210" />
          <path d="M210,-10 C-10,-10 -10,210 -10,210" />
        </g>
      </SvgContainer>

      {showAllCorners && (
        <>
          {/* Top Right Corner (Page 1) */}
          <SvgContainer viewBox="0 0 200 200" $position="tr">
            <g fill="none" stroke={strokeColor} strokeWidth="1.2">
              <path d="M210,30 C170,30 170,-10 170,-10" />
              <path d="M210,60 C140,60 140,-10 140,-10" />
              <path d="M210,90 C110,90 110,-10 110,-10" />
              <path d="M210,120 C80,120 80,-10 80,-10" />
              <path d="M210,150 C50,150 50,-10 50,-10" />
              <path d="M210,180 C20,180 20,-10 20,-10" />
              <path d="M210,210 C-10,210 -10,-10 -10,-10" />
            </g>
          </SvgContainer>

          {/* Bottom Left Corner (Page 1) */}
          <SvgContainer viewBox="0 0 200 200" $position="bl">
            <g fill="none" stroke={strokeColor} strokeWidth="1.2">
              <path d="M-10,170 C30,170 30,210 30,210" />
              <path d="M-10,140 C60,140 60,210 60,210" />
              <path d="M-10,110 C90,110 90,210 90,210" />
              <path d="M-10,80 C120,80 120,210 120,210" />
              <path d="M-10,50 C150,50 150,210 150,210" />
              <path d="M-10,20 C180,20 180,210 180,210" />
              <path d="M-10,-10 C210,-10 210,210 210,210" />
            </g>
          </SvgContainer>
        </>
      )}
    </BackgroundWrapper>
  );
};
