import React, { useState, useEffect, useRef } from 'react';
import styles from './Burger.module.css';
import RightNav from './RightNav';

const Burger = () => {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null); // Ref para o botão do hambúrguer
  const navRef = useRef(null); // Ref para o menu RightNav

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && navRef.current && !navRef.current.contains(event.target) && burgerRef.current && !burgerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div
        className={`${styles.burger} ${open ? styles.open : ''}`}
        onClick={() => setOpen(!open)}
        ref={burgerRef}
      >
        <div />
        <div />
        <div />
      </div>
      <RightNav open={open} ref={navRef} /> {/* Passamos a ref para o RightNav */}
    </>
  );
};

export default Burger;