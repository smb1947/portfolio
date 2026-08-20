export function DisplayAmpersand({ text }: { text: string }) {
  const segments = text.split("&");

  if (segments.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`}>
          {segment}
          {index < segments.length - 1 ? <span className="playfair-display-ampersand">&amp;</span> : null}
        </span>
      ))}
    </>
  );
}
