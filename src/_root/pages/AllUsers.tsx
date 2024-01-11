import { Loader, UserCard } from '@/components/shared'
import { toast } from '@/components/ui';
import { useGetUsers } from '@/lib/react-query/queries'

const AllUsers = () => {

  const { data: users , isPending: isUserLoading, isError: isErrorUsers } = useGetUsers();

  if (isErrorUsers) {
    toast({ title: "Something went wring."})
  }


  return (
    <div className="flex flex-1">
      <div className="common-container">

        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="assets/icons/people.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>
        {isUserLoading && !users ? (
            <Loader />
          ) : (
          <ul className='user-grid'>
            {users?.documents?.map((user) => (
              <li key={user?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard key={user.$id} user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers