import React from 'react';

export default function Sprite(props) {
  const imageName = props.name
    .replace(/\s+/g, '-')
    .replace(/[.,':\s]/g, "")
    .replace(/♀/g, "-f")
    .replace(/♂/g, "-m")
    .toLowerCase();
  return (
    <img
      src={`${process.env.PUBLIC_URL}/regular/${imageName}.png`}
      alt={props.name}
      title={props.name} />
  );
}