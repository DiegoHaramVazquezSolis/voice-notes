import { Note } from '@/types';

interface NoteCardProps extends Note {
  onClick: () => void;
}

const NoteCard = ({ title, content, timestamp, onClick }: NoteCardProps) => {
  return (
    <div
      className="bg-slate-100 dark:bg-transparent break-inside-avoid mb-4 rounded-lg shadow-lg p-4 border-2 border-slate-800 cursor-pointer"
      title={title}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-xl font-bold line-clamp-1">
          {title}
        </h2>
        <p className="text-sm line-clamp-2 md:line-clamp-3">
          {content}
        </p>
      </div>
      <div className="flex justify-end">
        <small className="text-xs">
          {new Date(timestamp).toLocaleDateString(undefined, {
            year: "numeric", month: "numeric", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
          })}
        </small>
      </div>
    </div>
  );
};

export {
  NoteCard
};