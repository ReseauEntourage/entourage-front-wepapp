import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  #markerLayer img {
    animation: pulse 1s infinite alternate;
    -webkit-animation: pulse 1s infinite alternate;
    transform-origin: center;
    -webkit-transform-origin: center;
  }

  keyframes pulse{
    to {
      transform: scale(0.7);
      -webkit-transform: scale(0.7);
      opacity: 0.85;
    }
  }

  @-webkit-keyframes pulse{
    to {
      transform: scale(0.7);
      -webkit-transform: scale(0.7);
      opacity: 0.85;
    }
  }
`;
