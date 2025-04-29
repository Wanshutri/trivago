import Link from 'next/link';

export default function Card({ room }) {
    return (
        <Link
            href={`/habitaciones/${room.room_id}`}
            className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
        >
            <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0 text-center">
                    <img
                        alt=""
                        src="https://www.moshy.es/wp-content/uploads/2024/03/como-hacer-la-cama-de-un-hotel-1024x597.png"
                        className="size-16 rounded-full object-cover sm:size-[72px]"
                    />
                    <h3 className="text-lg font-medium text-pretty text-gray-900">
                        ${room.price}
                    </h3>
                </div>
                <div className="mt-4 sm:mt-0">
                    <h3 className="text-lg font-medium text-pretty text-gray-900">
                        {room.description}
                    </h3>
                    <p className="mt-1 text-sm text-black">{room.descriptionType}</p>
                    <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-800">
                        {room.descriptionRoom}
                    </p>
                </div>
            </div>

            <dl className="mt-6 flex gap-4 lg:gap-6">
                <div className="flex items-center gap-2">
                    <dd className="text-xs text-gray-700">{room.type}</dd>
                </div>
                <div className="flex items-center gap-2">
                    <dd className="text-xs text-gray-700">
                        Capacidad para {room.capacity} personas
                    </dd>
                </div>
            </dl>
        </Link>
    );
}
