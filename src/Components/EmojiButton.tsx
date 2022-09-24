import React from 'react';
import emojis from '../Assets/emojis.png';

function EmojiButton() {
  return (
    <div className="p-1">
      <div
        className="sprite block h-[22px] w-[22px] bg-no-repeat "
        style={{
          backgroundPosition: '-132px -22px',
          backgroundSize: '242px 110px',
          transform: 'scale(1)',
          filter: 'grayscale(100%)',
          backgroundImage: `url(${emojis})`,
        }}
      />
    </div>
  );
}

export default EmojiButton;
