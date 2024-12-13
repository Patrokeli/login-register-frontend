export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Page!</h1>
      <p className="text-xl mb-8">You can either log in or register to get started.</p>
      
      <div className="flex space-x-4">
        <a
          href="/login"
          className="bg-white text-blue-500 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-white text-blue-500 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
        >
          Register
        </a>
      </div>
    </div>
  );
}
