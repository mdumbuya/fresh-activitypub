interface NavProps {
  loggedIn: boolean;
  username?: string;
}

export default function Nav({ loggedIn, username }: NavProps) {
  console.log("Username passed to Nav:", username);
  const menus = [
    { name: "Home", href: "/" },
  ];

  const loggedInMenus = [
    { name: "Secret", href: "/auth/secret" },
    { name: "Profile", href: username ? `/auth/users/${username}` : "#" },  // Dynamically use the username
    { name: "Logout", href: "/logout" },
  ];

  const nonLoggedInMenus = [
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <div class="bg-white max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="text-2xl ml-1 font-bold">
        Fresh
      </div>

      <ul class="flex gap-6">
        {menus.map((menu) => (
          <li key={menu.name}>
            <a href={menu.href} class="text-gray-500 hover:text-gray-700 py-1 border-gray-500">
              {menu.name}
            </a>
          </li>
        ))}

        {loggedIn ? (
          loggedInMenus.map((menu) => (
            <li key={menu.name}>
              <a href={menu.href} class="text-gray-500 hover:text-gray-700 py-1 border-gray-500">
                {menu.name}
              </a>
            </li>
          ))
        ) : (
          nonLoggedInMenus.map((menu) => (
            <li key={menu.name}>
              <a href={menu.href} class="text-gray-500 hover:text-gray-700 py-1 border-gray-500">
                {menu.name}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}


