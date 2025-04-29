import Navbar from "@/components/navbar/Navbar";
import { Roomitem } from "@/components/roomitem/Roomitem";


export default function Page() {

  const rooms = [
    {
      id: 1,
      number: 1,
      type: 'Suite',
      descriptionRoom: 'Suite de lujo en el último piso con jacuzzi.',
      descriptionType: 'Suite de lujo con una cama king size y sala de estar.',
      status: 'available',
      capacity: 4,
      price : 100
    },
  ];

  return (
    <>
      <Navbar />
      <ul className="divide-y divide-gray-100 m-auto px-5">
        {rooms.map((room) => (
          <Roomitem key={room.id} room={room} />
        ))}
      </ul>
    </>
  );
}