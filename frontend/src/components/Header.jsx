import React, { useRef, useEffect, useState } from 'react';
import todo  from '../images/todo.png'

const Header = () => {
  const rootRef = useRef();  

  return (
    <header className="flex items-baseline justify-between">
      <h1 className="text-3xl font-bold uppercase tracking-[10px] text-white lg:text-4xl">Day-ToDo</h1>
      <img src={todo} className="todo-logo" alt="todo logo" />
    </header>
  );
};

export default Header;