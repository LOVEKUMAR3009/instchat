import React from 'react'
import {  BadgeCheck } from 'lucide-react'
import moment from 'moment'
const PostCard = ({post}) => {
  return (
    <div className='bg-white rounded-xl shadow p-4 spac-y-4 w-full max-w-2xl'>
        {/* user info */}
        <div className='inline-flex items-center gap-3 cursor-pointer'>
            <img src={post.user.profile_picture} alt="" className='size-10 roundec-full shadow' />
            <div>
                <div className='flex items-center space-x-1'>
                    <span>{post.user.full_name}</span>
                    <BadgeCheck className='size-4 text-blue-500'/>
                </div>
                <div className='text-gray-500 text-sm'>
                    @{post.user.username} . {moment(post.createdAt).fromNow()}
                </div>
            </div>
        </div>

        {/* content */}

        {post.content && <div className='text-gray-800 text-sm whitespace-pre-line ' dangerouslySetInnerHTML={{__html:post.content}}/>}
    </div>
  )
}

export default PostCard
