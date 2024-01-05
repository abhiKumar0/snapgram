import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queries';
import { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const {mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])
  return (
    <nav className="leftsidebar flex flex-col items-start">
      <div className='flex flex-col gap-11'>
        <Link to="/" className='flex gap-3 items-center'>
            <img
              src="/assets/images/logo.svg"
              alt='logo'
              width={170}
              height={80}
            />
          </Link>
          <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">
                {user.name}
              </p>
              <p className="small-regular text-light-3">
                @{user.username}
              </p>
            </div>
          </Link>
          <ul>
            {sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;
              return (
                <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-50'}`}>
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                    />
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
      </div>
      <Button
        variant="ghost"
        className='shad-buttin_ghost'
        onClick={() => signOut()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className='small-regular lg:base-medium ml-3'>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar