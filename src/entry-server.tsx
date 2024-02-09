import {createHandler, StartServer} from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({assets, children, scripts}) => (
      <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <meta property="og:title" content="Sleep, or else..."/>
        <meta property="og:description" content="The ultimate application for making sure you stick to your sleep schedule"/>
        <meta property="og:image" content="https://sleep-or-else.vercel.app/logo.png"/>
        <meta property="og:url" content="https://sleep-or-else.vercel.app/"/>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="icon" href="/favicon.ico"/>
        {assets}
      </head>
      <body>
      <div id="app">{children}</div>
      {scripts}
      </body>
      </html>
    )}
  />
));
