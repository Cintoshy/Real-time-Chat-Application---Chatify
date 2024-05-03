declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';

  // Define the content as a React functional component that takes SvgProps
  const content: React.FC<SvgProps>;

  // Export the content so it can be imported in other files
  export default content;
}
