import Card from "@/components/card/Card";
import Navbar from "@/components/navbar/Navbar";

async function getRooms() {
  //const res = await fetch("http://localhost:4000/rooms", {
  const res = await fetch("http://backend:4000/rooms", {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Error al cargar habitaciones");
  }

  return res.json();
}

export default async function Page() {
  const rooms = await getRooms();

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 p-10 gap-5">
        {rooms.map((room) => (
          <Card key={room.room_id} room={room} />
        ))}
      </div>
    </>
  );
}
