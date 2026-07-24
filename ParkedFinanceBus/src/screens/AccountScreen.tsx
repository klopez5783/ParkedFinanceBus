interface Props {
  userId: number;
  onLogout: () => void;
}

export default function AccountScreen({ userId, onLogout }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-text text-center">Account</h1>

      <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
        <h2 className="text-subText text-xs uppercase tracking-widest font-semibold">Profile</h2>
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">User ID</span>
          <span className="text-text font-semibold">{userId}</span>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full py-3 rounded-xl border border-divider bg-surfaceLight text-white font-semibold text-lg active:opacity-80"
      >
        Logout
      </button>
    </div>
  );
}
