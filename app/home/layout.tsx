export default function Layout({
  children,
  hiragana,
}: {
  children: React.ReactNode;
  hiragana: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {hiragana}
    </div>
  );
}
