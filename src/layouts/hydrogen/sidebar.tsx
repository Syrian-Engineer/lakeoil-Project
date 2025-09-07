'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';
import useMenuItems from '@/layouts/hydrogen/menu-items'; // <- use the hook
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { menuItemTranslations } from '@/translations/sideBar/menuItemTranslations';
import Image from 'next/image';

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const menuItems = useMenuItems(); // <- call the hook here

  // for translations
  const lang = useSelector((state:RootState)=>state.language.language);
  const classNamee = translate(menuItemTranslations,lang,"pumps")

  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[200px] border-e-2 border-gray-100 bg-white 2xl:w-52 dark:bg-gray-100/50',
        className
      )}
    >
      <div className="sticky top-2 z-40 bg-gray-0/10 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6 2xl:right-2 dark:bg-gray-100/5">
        <Link
          href="/"
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Image
          src="/Logo.jpeg"
          alt='Website Logo'
          fill
          className='object-contain'
           />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <div className={`mt-4 pb-3 3xl:mt-6 ${classNamee.className}`}>
          {menuItems.map((item, index) => {
            const isActive = pathname === item?.href;

            return (
              <Fragment key={item.name + '-' + index}>
                {item?.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                      isActive
                        ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                        : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                    )}
                  >
                    <div className="flex items-center truncate">
                      {item?.icon && (
                        <span
                          className={cn(
                            'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                            isActive
                              ? 'text-primary'
                              : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                          )}
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="truncate">{item.name}</span>
                    </div>
                  </Link>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8',
                      index !== 0 && 'mt-6 3xl:mt-7'
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            );
          })}
        </div>
      </SimpleBar>
    </aside>
  );
}
