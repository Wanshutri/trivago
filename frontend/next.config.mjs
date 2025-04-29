/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/habitaciones',
        permanent: true, // Cambia a false si es una redirección temporal
      },
    ]
  },
}

export default nextConfig;
