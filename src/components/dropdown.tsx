import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FaCaretDown } from 'react-icons/fa';

interface ListItemProps {
  title: string;
  href: string;
}

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-fit justify-center">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            About Us{' '}
            <FaCaretDown
              className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
            <ul className="m-0 grid list-none gap-x-[10px] sm:w-[200px] sm:grid-flow-col sm:grid-rows-3">
              <ListItem title="About Us" href="https://petrol-gamma.vercel.app/" />
              <ListItem title="Process" href="https://petrol-gamma.vercel.app/process" />
              <ListItem title="Contact Us" href="https://petrol-gamma.vercel.app/contact" />
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(({ title, href, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className={classNames(
          'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors'
        )}
        {...props}
        ref={forwardedRef}
        href={href}
      >
        <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">{title}</div>
      </a>
    </NavigationMenu.Link>
  </li>
));

export default NavigationMenuDemo;
