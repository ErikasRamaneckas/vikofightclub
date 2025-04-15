export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Logged in</h1>
      <div>{children}</div>
    </>
  );
}
