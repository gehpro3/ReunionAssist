// This is the content for app/layout.jsx

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* The `children` prop here will be your `page.jsx` */}
        {children}
      </body>
    </html>
  );
}
