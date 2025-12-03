export default function Code() {
  const gistId = "0121133ae3e160888a69c6265531cb75";

  const iframeContent = `
    <html>
      <head>
        <base target="_parent">
      </head>
      <body style="margin:0">
        <script src="https://gist.github.com/${gistId}.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="h-screen">
      <iframe
        className="w-full h-full"
        srcDoc={iframeContent}
        title="GitHub Gist"
      />
    </div>
  );
}
