import React from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import { MdClose } from 'react-icons/md';
import { Container, Image } from './styles';

export default function Modal({ children, show, onClose: onCloseProp }) {
  function onClose(e) {
    onCloseProp && onCloseProp(e);
  }

  if (!show) {
    return null;
  }

  const src = [
    { src: children, setting: '500w' },
    { src: children, setting: '779w' },
    { src: children, setting: '1020w' },
    { src: children, setting: '1200w' },
    { src: children, setting: '1426w' },
  ]
    .map(item => `${item.src} ${item.setting}`)
    .join(', ');

  return (
    <Container>
      <button type="submit" onClick={onClose}>
        <MdClose size={20} color="#fff" />
      </button>
      <Image>
        <ReactImageMagnify
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...{
            smallImage: {
              alt: 'Wristwatch by Versace',
              isFluidWidth: true,
              src: children,
              srcSet: src.srcSet,
              sizes:
                '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
            },
            largeImage: {
              src: children,
              width: 2000,
              height: 2000,
            },
            lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
            enlargedImagePosition: 'over',
            fadeDurationInMs: 100,
          }}
        />
        <div />
      </Image>
    </Container>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};
