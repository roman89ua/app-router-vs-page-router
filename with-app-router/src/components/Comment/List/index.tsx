import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ModifiedComment, ModifiedComments } from "@/components/Review/types";

export async function CommentList({
  comments = [],
}: {
  comments: ModifiedComments;
}) {
  if (!comments || comments.length < 1) {
    return <p className='italic'>No comments yet.</p>;
  }

  return (
    <ul className='border-2 border-sky-300 mt-3 rounded-lg'>
      {comments.map((comment: ModifiedComment) => (
        <li
          key={comment.id}
          className='border-b-2 border-b-sky-300 px-3 py-2 first:rounded-t-lg last:border-none last:rounded-b-lg odd:bg-sky-100'
        >
          <div className='flex gap-3 pb-1 text-slate-500'>
            <UserCircleIcon className='h-6 w-6' />
            {comment.username}
          </div>
          <p className='italic'>{comment.message}</p>
        </li>
      ))}
    </ul>
  );
}
