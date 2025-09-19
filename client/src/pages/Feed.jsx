import React, { useEffect, useState } from 'react'
import {assets, dummyPostsData} from '../assets/assets'
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';
const Feed = () => {
  const [feeds,setFeeds] = useState([]);
  const [loading,setLoading] = useState(true);
  const fetchFeeds = async()=>{
    setFeeds(dummyPostsData)
    setLoading(false);
  }

  useEffect(()=>{
    fetchFeeds();
  },[]);
  return !loading ?(
    <div className='h-full overflow-hidden no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* Stories */}

      <div>
          <StoriesBar/>
          <div className='p-4 space-y-6'>
            {feeds.map((post)=>(
              <PostCard key={post._id} post={post}/>
            ))}
          </div>
      </div>

      {/* Right Sidebar */}
      <div className='max-xl:hidden sticky top-0'>
          <div className='max-w-xs bg-white text-xs p-4 roundec-md inline-flex flex-col gap-2 shadow '>
            <h3 className='text-slate-800 font-semibold'>Sponserd</h3>
            <img src={assets.sponsored_img} alt="" className='w-75 h-50 rounded-md'/>
            <p className='text-slate-600'>Email Marketing</p>
            <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae corporis aliquid neque suscipit beatae officiis eaque est debitis deserunt. Repudiandae non quae repellat accusamus reiciendis fugiat voluptatibus quibusdam incidunt explicabo!</p>
          </div>
          <RecentMessages/>
      </div>
    </div>
  ):(<Loading/>)
}

export default Feed
