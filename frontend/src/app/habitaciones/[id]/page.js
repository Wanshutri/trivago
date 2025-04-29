import Navbar from "@/components/navbar/Navbar";

async function getRoom(id) {
  //const res = await fetch(`http://localhost:4000/rooms/${id}`, {
  const res = await fetch(`http://backend:4000/rooms/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Error al cargar habitaciones");
  }

  return res.json();
}

async function getType(id) {
  //const res = await fetch(`http://localhost:4000/room-types/${id}`, {
  const res = await fetch(`http://backend:4000/room-types/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Error al cargar habitaciones");
  }

  return res.json();
}

export default async function Page({ params }) {
  const { id } = await params;

  const room = await getRoom(id);

  const type = await getType(room.type_id);

  const r = {
    ...room,
    descriptionType: type.type_name,
    typeName: type.type_name,
    capacity: type.capacity,
    price: type.base_price
  }
  console.log(r);
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1>Habitación {id}</h1>
      </div>
    </div>
  );
}
