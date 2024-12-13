import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/user/profile');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative">
      {/* Navigation Link */}
      <a
        href="/user/profile"
        className="absolute top-4 right-4 text-lg text-blue-600 hover:text-blue-800"
      >
        Profile
      </a>

      {/* Main content */}
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Welcome to the Home Page!</h1>
      <p className="text-lg text-gray-700 mb-6">This is the main dashboard where you can navigate to different sections.</p>
      <button
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={goToProfile}
      >
        Go to Profile
      </button>
    </div>
  );
}
