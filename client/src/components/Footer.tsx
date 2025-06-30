import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to place an order or ask about your snacks."
    );
    window.open(`https://wa.me/254725819198?text=${message}`, "_blank");
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Moses Snacks Express
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              We're passionate about delivering fresh, delicious Kenyan snacks
              right to your doorstep. From traditional favorites to modern
              treats, we've got something for everyone.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white p-2"
                onClick={handleWhatsAppClick}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white p-2"
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white p-2"
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white p-0 h-auto font-normal"
                  >
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal"
                  onClick={() => {
                    const categoriesSection =
                      document.getElementById("categories");
                    if (categoriesSection) {
                      categoriesSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Menu
                </Button>
              </li>
              <li>
                <Link to="/about">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white p-0 h-auto font-normal"
                  >
                    About Us
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white p-0 h-auto font-normal"
                  >
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>📞 +254 725 819198</p>
              <p>📧 moses@snacksexpress.co.ke</p>
              <p>📍 Nakuru, Kenya</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Moses Snacks Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
