import Image from 'next/image';
import logo from '@/images/pizza-accountant-logo.svg';

export function Logo() {
  return (
      <Image src={logo} alt='Pizza Accountant' className="h-10 -rotate-90" unoptimized />
  )
}
