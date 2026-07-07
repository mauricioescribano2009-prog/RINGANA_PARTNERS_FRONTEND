type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[430px] px-6 py-12">
        {children}
      </div>
    </main>
  );
}