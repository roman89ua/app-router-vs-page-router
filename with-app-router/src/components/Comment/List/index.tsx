import { UserCircleIcon } from "@heroicons/react/24/outline";

const comments = [
  { id: "1", user: "Alice", message: "Love this game!" },
  { id: "2", user: "Bob", message: "Ok but not really my genre" },
  { id: "3", user: "Charlie", message: "Can't stop playing it" },
  {
    id: "4",
    user: "Bob",
    message: "I will try to play it more. Maybe I will change my mind.",
  },
];

export function CommentList() {
  return (
    <ul className="border-2 border-sky-300 mt-3 rounded-lg">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="border-b-2 border-b-sky-300 px-3 py-2 first:rounded-t-lg last:border-none last:roundedb-lg odd:bg-sky-100"
        >
          <div className="flex gap-3 pb-1 text-slate-500">
            <UserCircleIcon className="h-6 w-6" />
            {comment.user}
          </div>
          <p className="italic">{comment.message}</p>
        </li>
      ))}
    </ul>
  );
}
