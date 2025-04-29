import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function Roomitem({ room }) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4 align-middle">
        <img
          alt=""
          src="https://www.moshy.es/wp-content/uploads/2024/03/como-hacer-la-cama-de-un-hotel-1024x597.png"
          className="size-12 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">
            {room.type}
          </p>
          <p className="mt-0 truncate text-xs/5 text-gray-500">
            Habitación número {room.number}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            Capacidad de {room.capacity} personas
          </p>
        </div>
        <p className="text-sm/6 text-gray-900 m-auto bg-green-100 p-2 rounded-xl">
          {room.descriptionType}
        </p>
        <p className="ms-5 text-sm/6 text-gray-900 m-auto bg-green-100 p-2 rounded-xl">
          {room.descriptionRoom}
        </p>
      </div>
      <div className="m-auto min-w-0 flex">
        <div>
          <p className="mt-0 truncate text-black-100 text-xl">
            Precio: ${room.price}
          </p>
          <p className="mt-1 truncate text-ls/3 text-gray-500">
            Estado: {room.status}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              Gestionar reserva
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <Link
                  href={`/habitaciones/${room.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Ver Habitación
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href={`/habitaciones/${room.id}/eliminar`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Eliminar reserva
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </li>
  );
}
