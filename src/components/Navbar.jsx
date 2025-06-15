import React from 'react';

const MenuLinks = [
  {
    id: 1,
    name: 'Home',
    link: '/'
  },
  {
    id: 2,
    name: 'Reports',
    link: '/#latest-reports'
  }
];

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full px-6 sm:px-20 py-10 flex items-center justify-between z-50 bg-transparent">
      {/* Logo */}
      <a href="/"><h2 className="text-gray-100 font-bold text-xl md:text-3xl tracking-wide">AlertNet</h2></a>
      

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6 text-sm text-gray-100 font-medium">
        {MenuLinks.map((item) => (
          <li key={item.id}>
            <a href={item.link} className="hover:text-gray-500 transition duration-300">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
