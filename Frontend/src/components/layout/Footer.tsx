const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-3 text-center text-xs text-gray-500 sm:px-6 lg:px-8">
      <p>
        &copy; {new Date().getFullYear()} Task Toaster. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;