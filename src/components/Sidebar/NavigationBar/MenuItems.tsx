import Link from 'next/link'
import { Fragment, useState } from 'react'

type Props = {
  items: any[]
}

export function MenuItems ({ items }: Props): React.ReactElement {
  const [isOn, setIsOn] = useState(false)
  const expandMenu = () => {
    setIsOn(!isOn)
  }

  return (
    <div
      className='absolute right-0 top-0 text-left w-full h-full'
      onClick={expandMenu}
    >
      <div
        className={`z-10 origin-top-right right-0 top-8 absolute mt-2 w-full rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
          isOn
            ? 'transform opacity-100 scale-100'
            : 'transform opacity-0 scale-0'
        }`}
      >
        <div
          className='py-1'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          {items.map((e, index) => (
            <Fragment key={index}>
              <Link href={e.link}>
                <a
                  className='block | text-sm text-gray-700 font-bold | z-10 px-4 py-2 | hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                  onClick={expandMenu}
                >
                  &gt; &nbsp; {e.title}
                </a>
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
