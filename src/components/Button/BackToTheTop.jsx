import React from 'react';
import { BiUpArrow } from 'react-icons/bi';

export default function BackToTheTop() {
  return (
    <button className='box-back-btn aqua-bg-opacity is-align-self-center cat-btn pointer'>
      <span className='is-relative'>
        <BiUpArrow
          className='position-absolute-icon has-text-white'
          size={20}
        />
      </span>
    </button>
  );
}
