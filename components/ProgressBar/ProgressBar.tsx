type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({
  current,
  total,
}: ProgressBarProps) {

  const percentage = (current / total) * 100;

  return (

    <div className="w-full mb-10">

      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

        <div
          className="h-full rounded-full bg-green-700 transition-all duration-300"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>

  );

}