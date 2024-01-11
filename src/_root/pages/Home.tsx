import { Loader, PostCard, UserCard } from '@/components/shared';
import { toast } from '@/components/ui';
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query/queries';
import { Models } from 'appwrite';

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

  const { data: users, isPending: isUserLoading, isError: isErrorUsers} = useGetUsers();

  if (isErrorUsers || isErrorPosts) {
    toast({ title: "Something went wring."})
  }

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className='home-creators'>
        <h3 className='h3-bold text-light-1'>Top Creator</h3>
        {isUserLoading && !users ? (
          <Loader />
        ) : (
          <ul className='flex flex-col gap-2'>
            {users?.documents.map((user) => (
              <UserCard key={user.$id} user={user} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home;